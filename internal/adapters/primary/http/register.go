package httpadpt

import (
	"encoding/json"
	"io/ioutil"
	"log"
	"net/http"
	"real-time-forum/internal/domain/entities"
)

func (handler *HttpAdapter) RegisterHandler(w http.ResponseWriter, r *http.Request) {
	response, _ := ioutil.ReadAll(r.Body)

	var user entities.User
	err := json.Unmarshal(response, &user)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		log.Fatalf("Err: %s", err)
		return
	}

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
