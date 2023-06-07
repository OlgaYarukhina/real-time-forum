package httpadpt

import (
	"encoding/json"
	"log"
	"net/http"
)

func (handler *HttpAdapter) ViewPostsHandler(w http.ResponseWriter, r *http.Request, userId int) {
	posts := handler.postsService.LoadPosts()

	jsonResp, err := json.Marshal(posts)
	if err != nil {
		log.Fatalf("Error happened in JSON marshal. Err: %s", err)
	}
	w.Write(jsonResp)
	return
}
