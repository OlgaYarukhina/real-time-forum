package wsadpt

import (
	//"context"
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"net/http"
	"real-time-forum/internal/domain/interfaces"
	"sync"

	//"time"

	"github.com/gorilla/websocket"
)

var (
	/**
	websocketUpgrader is used to upgrade incomming HTTP requests into a persitent websocket connection
	*/
	websocketUpgrader = websocket.Upgrader{
		// Apply the Origin Checker
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
		//case "https://localhost:8080":
		return true
	default:
		return false
	}
}

// Manager is used to hold references to all Clients Registered, and Broadcasting etc
type Manager struct {
	Clients ClientList

	// Using a syncMutex here to be able to lcok state before editing clients
	// Could also use Channels to block
	sync.RWMutex
	// handlers are functions that are used to handle Events
	handlers map[string]EventHandler
	// otps is a map of allowed OTP to accept connections from
	// otps RetentionMap

	chatService interfaces.Chater
}

// NewManager is used to initalize all the values inside the manager
func New(chater interfaces.Chater) *Manager {
	m := &Manager{
		Clients:  make(ClientList),
		handlers: make(map[string]EventHandler),
		// Create a new retentionMap that removes Otps older than 5 seconds
		//otps: NewRetentionMap(ctx, 5*time.Second),
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

// loginHandler is used to verify an user authentication and return a one time password
// func (m *Manager) LoginHandler(w http.ResponseWriter, r *http.Request) {

// 	type userLoginRequest struct {
// 		Username string `json:"username"`
// 		Password string `json:"password"`
// 	}

// 	var req userLoginRequest
// 	err := json.NewDecoder(r.Body).Decode(&req)
// 	if err != nil {
// 		http.Error(w, err.Error(), http.StatusBadRequest)
// 		return
// 	}

// 	// Authenticate user / Verify Access token, what ever auth method you use
// 	if req.Username == "percy" && req.Password == "123" {
// 		// format to return otp in to the frontend
// 		type response struct {
// 			OTP string `json:"otp"`
// 		}

// 		// add a new OTP
// 		otp := m.otps.NewOTP()

// 		resp := response{
// 			OTP: otp.Key,
// 		}

// 		data, err := json.Marshal(resp)
// 		if err != nil {
// 			log.Println(err)
// 			return
// 		}
// 		// Return a response to the Authenticated user with the OTP
// 		w.WriteHeader(http.StatusOK)
// 		w.Write(data)
// 		return
// 	}

// 	// Failure to auth
// 	w.WriteHeader(http.StatusUnauthorized)
// }

// serveWS is a HTTP Handler that the has the Manager that allows connections
func (m *Manager) ServeWS(w http.ResponseWriter, r *http.Request, userId int) {
	log.Println("New connection start")
	// Begin by upgrading the HTTP request
	conn, err := websocketUpgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println(err)
		return
	}

	client := NewClient(conn, m, " ", userId)
	// Add the newly created client to the manager
	m.addClient(client)

	go client.readMessages()
	go client.writeMessages()

	// TODO : return current active users
}

func (m *Manager) GetUsers(w http.ResponseWriter, r *http.Request, userId int) {
	fmt.Println("get users starting")
	_, err := m.chatService.GetUsers([]int{})
	if err != nil {

	}
	//get unique user ids from manager client list
	//call service
	//create json response with data from service
	//handle all errors
	fmt.Println(len(m.Clients))
	return
}

// addClient will add clients to our clientList
func (m *Manager) addClient(client *Client) {
	fmt.Println("add client in process")
	// TODO : send msg new user online

	// Lock so we can manipulate
	m.Lock()
	defer m.Unlock()

	// Add Client
	m.Clients[client] = true

	// TODO : verify that this is first user connection (user have no active clients yet)
	var outgoingEvent Event
	payloadData := ClientChangesEvent{
		Status: "online",
		UserID: client.userId,
	}
	// Convert payloadData to JSON
	payloadBytes, err := json.Marshal(payloadData)
	if err != nil {
		fmt.Println("error with marshal")
		// Handle error
		return
	}

	outgoingEvent.Payload = payloadBytes
	outgoingEvent.Type = EventClientChanges

	// Broadcast to all other Clients
	for c := range m.Clients {
		//fix next line, cuz object comparing
		if client != c {
			fmt.Println("sending")
			c.egress <- outgoingEvent
		}
	}
}

// removeClient will remove the client and clean up
func (m *Manager) removeClient(client *Client) {
	// TODO : send msg user offline

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
