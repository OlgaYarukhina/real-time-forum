package wsadpt

import (
	"encoding/json"
	"errors"
	"io/ioutil"
	"log"
	"net/http"
	"sync"

	"real-time-forum/internal/domain/entities"
	"real-time-forum/internal/domain/interfaces"

	"github.com/gorilla/websocket"
)

var (
	/**
	websocketUpgrader is used to upgrade incomming HTTP requests into a persitent websocket connection
	*/
	websocketUpgrader = websocket.Upgrader{
		CheckOrigin:     checkOrigin,
		ReadBufferSize:  1024,
		WriteBufferSize: 1024,
	}
)

var (
	ErrEventNotSupported = errors.New("this event type is not supported")
)

// checkOrigin will check origin and return true if its allowed
func checkOrigin(r *http.Request) bool {

	// Grab the request origin
	origin := r.Header.Get("Origin")

	switch origin {
	// Update this to HTTPS
	case "http://localhost:8080":
		return true
	default:
		return false
	}
}

type Manager struct {
	sync.RWMutex

	Clients     ClientList
	handlers    map[string]EventHandler
	chatService interfaces.Chater
}

func New(chater interfaces.Chater) *Manager {
	m := &Manager{
		Clients:     make(ClientList),
		handlers:    make(map[string]EventHandler),
		chatService: chater,
	}
	m.setupEventHandlers()
	return m
}

// setupEventHandlers configures and adds all handlers
func (m *Manager) setupEventHandlers() {
	m.handlers[EventSendMessage] = SendMessageHandler
	m.handlers[EventChangeRoom] = ChatRoomHandler
}

// routeEvent is used to make sure the correct event goes into the correct handler
func (m *Manager) routeEvent(event Event, c *Client) error {
	// Check if Handler is present in Map
	if handler, ok := m.handlers[event.Type]; ok {
		// Execute the handler and return any err
		if err := handler(event, c); err != nil {
			return err
		}
		return nil
	} else {
		return ErrEventNotSupported
	}
}

func (m *Manager) ServeWS(w http.ResponseWriter, r *http.Request, userId int) {
	conn, err := websocketUpgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println(err)
		return
	}

	client := NewClient(conn, m, "", userId)
	m.addClient(client)

	go client.readMessages()
	go client.writeMessages()
}

func (m *Manager) GetUsers(w http.ResponseWriter, r *http.Request, userId int) {

	//get unique user ids from manager client list
	//TODO : is here not unique ids?

	isActiveUsersId := []int{}

	for isActiveUser, _ := range m.Clients {
		isActiveUsersId = append(isActiveUsersId, isActiveUser.userId)
	}

	users, err := m.chatService.GetUsers(isActiveUsersId, userId)
	if err != nil {
		log.Fatalf("Could not get status of chats users. Err: %s", err)
	}

	jsonResp, err := json.Marshal(users)
	if err != nil {
		log.Fatalf("Error happened in JSON marshal chat list. Err: %s", err)
	}
	w.Write(jsonResp)

	//fmt.Println(len(m.Clients))
	return
}

// TODO :NOTE : send msg will use inside of ws logic,
// or to be able to use it like API, move to httpadpt
// func (m *Manager) SendMsg(w http.ResponseWriter, r *http.Request, userId int) {
// 	response, _ := ioutil.ReadAll(r.Body)
// 	var message entities.Message
// 	message.SenderID = userId
// 	err := json.Unmarshal(response, &message)
// 	if err != nil {
// 		http.Error(w, err.Error(), http.StatusBadRequest)
// 		fmt.Println(err)
// 		return
// 	}
// 	resp := make(map[string]string)
// 	err = m.chatService.SaveMsg(message)
// 	if err != nil {
// 		resp["message"] = "Please, try again"
// 	}
// 	jsonResp, err := json.Marshal(resp)
// 	if err != nil {
// 		log.Fatalf("Err: %s", err)
// 	}
// 	w.Write(jsonResp)
// 	return
// }

// TODO: THINK! - move to http handler, cuz it have no any logic correlated with web sockets
// add chat service to http handler as well?
func (m *Manager) LoadChatHistoryHandler(w http.ResponseWriter, r *http.Request, userId int) {

	response, _ := ioutil.ReadAll(r.Body)

	type Data struct {
		UserID          int    `json:"user_id"`
		HistoryPage     int    `json:"history_page"`
		FirstHistoryMsg string `json:"first_history_msg"`
	}

	var data Data

	err := json.Unmarshal(response, &data)
	if err != nil {
		//log.Fatalf("Error: %s", err)
		return
	}

	// TODO : think, should it return error as well, in case of unsuccessful database request?
	chatHistory := m.chatService.LoadChatHistory(userId, data.UserID)
	length := len(chatHistory)
	for i := 0; i < length/2; i++ {
		// Swap elements from both ends
		chatHistory[i], chatHistory[length-i-1] = chatHistory[length-i-1], chatHistory[i]
	}
	// TODO : receive "start message" and cut history from it,
	// cuz all after it already displayed in chat
	index := -1
	for i, msg := range chatHistory {
		if msg.Body == data.FirstHistoryMsg {
			index = i
			break
		}
	}
	if index >= 0 {
		chatHistory = chatHistory[index:]
	}

	totalMessages := len(chatHistory)
	startIndex := data.HistoryPage * 10
	endIndex := (data.HistoryPage + 1) * 10
	if endIndex > totalMessages {
		endIndex = totalMessages
	}
	if startIndex >= totalMessages {
		chatHistory = []*entities.Message{}
	}
	chatHistory = chatHistory[startIndex:endIndex]
	length = len(chatHistory)
	for i := 0; i < length/2; i++ {
		// Swap elements from both ends
		chatHistory[i], chatHistory[length-i-1] = chatHistory[length-i-1], chatHistory[i]
	}

	jsonResp, err := json.Marshal(chatHistory)
	if err != nil {
		//log.Fatalf("Err: %s", err)
	}
	w.Write(jsonResp)
	return
}

func (m *Manager) addClient(client *Client) {

	m.Lock()
	defer m.Unlock()

	m.Clients[client] = true

	// TODO : verify that this is first user connection (user have no active clients yet)
	// and send notification for other users only in that case

	nick, err := m.chatService.GetUserNicknameByID(client.userId)
	if err != nil {
		//log
	}

	var outgoingEvent Event
	payloadData := ClientChangesEvent{
		Status:   "online",
		UserID:   client.userId,
		Nickname: nick,
	}

	payloadBytes, err := json.Marshal(payloadData)
	if err != nil {
		//log.Fatalf("Error: %s", err)
		return
	}

	outgoingEvent.Payload = payloadBytes
	outgoingEvent.Type = EventClientChanges

	for c := range m.Clients {
		//TODO : fix next line, cuz object comparing
		if client != c {
			log.Println("sending")
			c.egress <- outgoingEvent
		}
	}
}

// removeClient will remove the client and clean up
func (m *Manager) removeClient(client *Client) {
	// TODO : send msg user offline
	var outgoingEvent Event
	payloadData := ClientChangesEvent{
		Status: "offline",
		UserID: client.userId,
	}

	payloadBytes, err := json.Marshal(payloadData)
	if err != nil {
		//log.Fatalf("Error: %s", err)
	}

	outgoingEvent.Payload = payloadBytes
	outgoingEvent.Type = EventClientChanges

	for c := range m.Clients {
		//TODO : fix next line, cuz object comparing?
		if client != c {
			c.egress <- outgoingEvent
		}
	}

	m.Lock()
	defer m.Unlock()

	// Check if Client exists, then delete it
	if _, ok := m.Clients[client]; ok {
		// close connection
		client.connection.Close()
		// remove
		delete(m.Clients, client)
	}
}
