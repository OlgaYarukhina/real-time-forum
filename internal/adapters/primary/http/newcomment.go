package httpadpt

import (
	"encoding/json"
	"io/ioutil"
	"log"
	"net/http"
	"real-time-forum/internal/domain/entities"
)

func (handler *HttpAdapter) CreateCommentHandler(w http.ResponseWriter, r *http.Request, userId int) {
	response, _ := ioutil.ReadAll(r.Body)

	var comment entities.Comment
	err := json.Unmarshal(response, &comment)
	comment.UserID = userId
	if err != nil {
		log.Fatalf("Err: %s", err)
		return
	}

	resp := make(map[string]string)

	err = handler.postsService.CreateComment(comment)
	if err != nil {
		resp["message"] = "Comment was not created"
	} else {
		resp["message"] = "Comment was created"
	}

	jsonResp, err := json.Marshal(resp)
	if err != nil {
		log.Fatalf("Err: %s", err)
	}

	w.Write(jsonResp)
	return
}
