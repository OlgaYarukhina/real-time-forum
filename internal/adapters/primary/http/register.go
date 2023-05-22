package httpadpt

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"real-time-forum/internal/domain/entities"
)

func (handler *HttpAdapter) RegisterHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Println("register handler worked")

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

		case "UNIQUE constraint failed: users.nickname":
			resp["message"] = "Nickname already exist"
		}
	} else {
		resp["message"] = "New user was created"
	}

	jsonResp, err := json.Marshal(resp)
	if err != nil {
		log.Fatalf("Error happened in JSON marshal. Err: %s", err)
	}
	w.Write(jsonResp)
	return
}
