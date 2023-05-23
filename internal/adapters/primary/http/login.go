package httpadpt

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"

	"real-time-forum/internal/domain/entities"
)

func (handler *HttpAdapter) LoginHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Println("login handler worked")
	response, _ := ioutil.ReadAll(r.Body)

	var user entities.User
	err := json.Unmarshal(response, &user)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		fmt.Println(err)
		return
	}

	resp := make(map[string]string)

	_, err = handler.authService.Login(user)
	if err != nil {
		switch err.Error() {
		case "sql: no rows in result set":
			resp["message"] = "Email not found"

		case "crypto/bcrypt: hashedSecret too short to be a bcrypted password":
			resp["message"] = "Wrong password"
		}
	} else {
		resp["message"] = "All good"
	}

	jsonResp, err := json.Marshal(resp)
	if err != nil {
		log.Fatalf("Error happened in JSON marshal. Err: %s", err)
	}
	w.Write(jsonResp)
	fmt.Println("login handler ends")
	return
}
