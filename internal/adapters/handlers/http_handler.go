//handle for concrete url X
//use concrete middleware from pkg/middleware
//use service from internal/domain/services to do logic
package handlers

import (
	"fmt"
	"net/http"
	"real-time-forum/internal/core/entities"
	"real-time-forum/internal/core/services"
)

type HTTPHandler struct {
	authService      services.AuthService
	messengerService services.MessengerService
	//services
}

func NewHTTPHandler(authService services.AuthService, messenger services.MessengerService) *HTTPHandler {
	return &HTTPHandler{
		authService:      authService,
		messengerService: messenger,
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
	user := entities.User{
		Email: "egor@gmail.com",
		//...
	}
	err := handler.authService.Register(user)
	if err != nil {

	}
	fmt.Println("register handler ended")
	return
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
