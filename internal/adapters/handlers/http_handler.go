// handle for concrete url X
// use concrete middleware from pkg/middleware
// use service from internal/domain/services to do logic
package handlers

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"real-time-forum/internal/core/entities"
	"real-time-forum/internal/core/services"
)

const (
	apiUrl = "http://localhost:8080/answr"
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

	response, _ := ioutil.ReadAll(r.Body)

	var user entities.User
	err := json.Unmarshal(response, &user)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		fmt.Println(err)
		return
	}
	fmt.Printf("New user handled: %+v\n", user)

	resp := make(map[string]string)

	err = handler.authService.Register(user)
	if err != nil {
		switch err.Error() {
		case "UNIQUE constraint failed: users.email":

			resp["message"] = "Email already exist"
			jsonResp, err := json.Marshal(resp)
			if err != nil {
				log.Fatalf("Error happened in JSON marshal. Err: %s", err)
			}
			w.Write(jsonResp)
			return

		case "UNIQUE constraint failed: users.nickname":
			resp["message"] = "Nickname already exist"
			jsonResp, err := json.Marshal(resp)
			if err != nil {
				log.Fatalf("Error happened in JSON marshal. Err: %s", err)
			}
			w.Write(jsonResp)
			return 

		}
	}

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

// type Response struct {
// 	UserId int `json:"message"`
// }
// response := Response{UserId: 3}
// w.Header().Set("Content-Type", "application/json")
// json.NewEncoder(w).Encode(response)

//two same objects, but different tasks - think about it
// type User struct {
// 	Email     string `json:"email"`
// 	Nickname  string `json:"nickname"`
// 	Age       string `json:"age"`
// 	Gender    string `json:"gender"`
// 	FirstName string `json:"first_name"`
// 	LastName  string `json:"last_name"`
// 	Password  string `json:"pass"`
// }

// age, err := strconv.Atoi(user.Age)
// if err != nil {
// 	//add error to json errors
// }

// newUser := entities.User{
// 	Email:        user.Email,
// 	Nickname:     user.Nickname,
// 	Age:          user.Age,
// 	Gender:       user.Gender,
// 	FirstName:    user.FirstName,
// 	LastName:     user.LastName,
// 	PasswordHash: []byte(user.Password),
// }
