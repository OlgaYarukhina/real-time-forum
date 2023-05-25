package httpadpt

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"real-time-forum/internal/domain/entities"
)

func (handler *HttpAdapter) CreatePostHandler(w http.ResponseWriter, r *http.Request) {

	response, _ := ioutil.ReadAll(r.Body)

	var post entities.Post
	err := json.Unmarshal(response, &post)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		fmt.Println(err)
		return
	}
	

	// resp := make(map[string]string)
	// 	err = handler.postService.CreatePost(post)
	// 	if err != nil {
	// 	}
		

	return
}
