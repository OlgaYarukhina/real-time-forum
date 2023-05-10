// handle for concrete url X
// use concrete middleware from pkg/middleware
// use service from internal/domain/services to do logic
package handlers

import (
	"fmt"
	"log"
	"net/http"
	"real-time-forum/internal/application/services"
	"real-time-forum/internal/domain/entities"
	"strconv"

	"github.com/gorilla/websocket"
)

type HTTPHandler struct {
	authService        services.AuthService
	messengerService   services.MessengerService
	userManagerService services.UserManagerService
	//services
}

func NewHTTPHandler(authService services.AuthService,
	messenger services.MessengerService, userManager services.UserManagerService) *HTTPHandler {
	return &HTTPHandler{
		authService:        authService,
		messengerService:   messenger,
		userManagerService: userManager,
		//services
	}
}

func (handler *HTTPHandler) LoginHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Println("login handler worked")
	credentials := entities.UserCredentials{
		Email:    "egor@gmail.com",
		PassHash: []byte("a1s2d3f4g5"),
	}
	_, err := handler.authService.Login(credentials)
	if err != nil {

	}
	fmt.Println("login handler ends")
	return
}

func (handler *HTTPHandler) RegisterHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Println("register handler worked")
	// hashedPass, err := utils.HashPassword(r.FormValue("newPassword"))
	// if err != nil {
	// 	//add error to json errors
	// }
	age, err := strconv.Atoi(r.FormValue("age"))
	if err != nil {
		//add error to json errors
	}

	newUser := entities.User{
		Nickname:     r.FormValue("newNickname"),
		Age:          age,
		Gender:       r.FormValue("gender"),
		FirstName:    r.FormValue("firstName"),
		LastName:     r.FormValue("lastName"),
		Email:        r.FormValue("newEmail"),
		PasswordHash: []byte(r.FormValue("newPassword")),
	}

	err = handler.authService.Register(newUser)
	if err != nil {
		//send response with server error code 5**
	}
	fmt.Println("register handler ended")
	return
}

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
}

//let socket = new WebSocket("ws://localhost:8080/ws")
//socket.onmessage = (event) => {console.log("received in incognito : "+event.data)}
//socket.send("CHAO CUO")

func (handler *HTTPHandler) ServeWS(w http.ResponseWriter, r *http.Request) {
	fmt.Println("ServeWS function")
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println(err)
		return
	}
	for {
		messageType, p, err := conn.ReadMessage()
		fmt.Println("server read : " + string(p))
		if err != nil {
			log.Println(err)
			return
		}
		if err := conn.WriteMessage(messageType, p); err != nil {
			log.Println(err)
			return
		}
	}
	//defer conn.Close() ?
}

func (handler *HTTPHandler) TestHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Println("handler worked")
	handler.messengerService.SendMessage(entities.Message{Body: "my msg"})
	w.Write([]byte("just text"))
	return
}
func (handler *HTTPHandler) TestMiddleware(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		fmt.Println("middleware worked")
		next(w, r)
	}
}
