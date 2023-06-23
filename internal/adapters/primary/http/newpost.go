package httpadpt

import (
	"encoding/json"
	"io/ioutil"
	"log"
	"net/http"
	"real-time-forum/internal/domain/entities"
)

func (handler *HttpAdapter) CreatePostHandler(w http.ResponseWriter, r *http.Request, userId int) {

	response, _ := ioutil.ReadAll(r.Body)

	var post entities.Post
	err := json.Unmarshal(response, &post)
	post.UserID = userId
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		log.Fatalf("Err: %s", err)
		return
	}

	resp := make(map[string]string)

	err = handler.postsService.CreatePost(post)
	if err != nil {
		resp["message"] = "Post was not created"
	} else {
		resp["message"] = "Post was created"
	}

	jsonResp, err := json.Marshal(resp)
	if err != nil {
		log.Fatalf("Error happened in JSON marshal. Err: %s", err)
	}

	w.Write(jsonResp)
	return
}
