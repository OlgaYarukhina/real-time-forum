// handle for concrete url X
// use concrete middleware from pkg/middleware
// use service from internal/domain/services to do logic
package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"real-time-forum/internal/core/entities"
	"real-time-forum/internal/core/services"
	"strconv"
	//"strconv"
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
	// hashedPass, err := utils.HashPassword(r.FormValue("newPassword"))
	// if err != nil {
	// 	//add error to json errors
	// }

	if r.Method == "POST" {

	}

	//two same objects, but different tasks - think about it
	type User struct {
		Nickname  string `json:"nickname"`
		Age       string `json:"age"`
		Gender    string `json:"gender"`
		FirstName string `json:"first_name"`
		LastName  string `json:"last_name"`
		Email     string `json:"email"`
		Password  string `json:"pass"`
	}
	var user User
	err := json.NewDecoder(r.Body).Decode(&user)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	fmt.Printf("New user handled: %+v\n", user)

	age, err := strconv.Atoi(user.Age)
	if err != nil {
		//add error to json errors
	}

	newUser := entities.User{
		Nickname:     user.Nickname,
		Age:          age,
		Gender:       user.Gender,
		FirstName:    user.FirstName,
		LastName:     user.LastName,
		Email:        user.Email,
		PasswordHash: []byte(user.Password),
	}

	//register should return user id?
	err = handler.authService.Register(newUser)
	if err != nil {
		//send response with server error code 5**
	}

	type Response struct {
		UserId int `json:"message"`
	}
	response := Response{UserId: 3}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)

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
