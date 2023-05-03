// handle for concrete url X
// use concrete middleware from pkg/middleware
// use service from internal/domain/services to do logic
package handlers

import (
	"fmt"
	"net/http"
	"real-time-forum/internal/core/entities"
	"real-time-forum/internal/core/services"
	"real-time-forum/pkg/utils"
	"strconv"
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
	hashedPass, err := utils.HashPassword(r.FormValue("newPassword"))
	if err != nil {
		//add error to json errors
	}
	age, err := strconv.Atoi(r.FormValue("age"))
	if err != nil {
		//add error to json errors
	}
	//if any errors on top send response with errors and code 4** (400 - bad request or 422 - unprocessable entity)

	newUser := entities.User{
		Nickname:     r.FormValue("newNickname"),
		Age:          age,
		Gender:       r.FormValue("gender"),
		FirstName:    r.FormValue("firstName"),
		LastName:     r.FormValue("lastName"),
		Email:        r.FormValue("newEmail"),
		PasswordHash: []byte(hashedPass),
	}

	err = handler.authService.Register(newUser)
	if err != nil {
		//send response with server error code 5**
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
