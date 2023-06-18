package httpadpt

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"strconv"

	"real-time-forum/internal/domain/entities"
)

func (handler *HttpAdapter) LoginHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Println("login handler worked")
	response, _ := ioutil.ReadAll(r.Body)

	var cr entities.UserCredentials
	err := json.Unmarshal(response, &cr)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		fmt.Println(err)
		return
	}

	resp := make(map[string]string)

	userId, sessionId, token, err := handler.authService.Login(cr)
	if err != nil {
		switch err.Error() {
		case "sql: no rows in result set":
			resp["message"] = "Email not found"

		case "crypto/bcrypt: hashedPassword is not the hash of the given password":
			resp["message"] = "Wrong password"

		default:
			resp["message"] = "Internal login error"
		}

	} else {
		resp["message"] = "Successfully logged in"
		resp["token"] = token
		resp["session_id"] = strconv.Itoa(sessionId)
		resp["user_id"] = strconv.Itoa(userId)
	}

	jsonResp, err := json.Marshal(resp)
	if err != nil {
		log.Fatalf("Error happened in JSON marshal. Err: %s", err)
	}
	w.Write(jsonResp)
	fmt.Println("login handler ends")
	return
}
