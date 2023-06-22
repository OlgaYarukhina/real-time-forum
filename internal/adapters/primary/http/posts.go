package httpadpt

import (
	"encoding/json"
	"io/ioutil"
	"log"
	"net/http"
	"real-time-forum/internal/domain/entities"
)

func (handler *HttpAdapter) ViewPostsHandler(w http.ResponseWriter, r *http.Request, userId int) {
	posts := handler.postsService.LoadPosts()

	jsonResp, err := json.Marshal(posts)
	if err != nil {
		log.Fatalf("Err: %s", err)
	}
	w.Write(jsonResp)
	return
}

func (handler *HttpAdapter) ViewPostHandler(w http.ResponseWriter, r *http.Request, userId int) {

	response, _ := ioutil.ReadAll(r.Body)

	var postId entities.Post
	err := json.Unmarshal(response, &postId)
	if err != nil {
		log.Fatalf("Err: %s", err)
		return
	}

	
	post := handler.postsService.LoadPostWithComments(postId)

	jsonResp, err := json.Marshal(post)
	if err != nil {
		log.Fatalf("Err: %s", err)
	}
	w.Write(jsonResp)
	return
}
