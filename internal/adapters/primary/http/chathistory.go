package httpadpt

import (

	"net/http"
	
)

func (handler *HttpAdapter) LoadChatHistoryHandler(w http.ResponseWriter, r *http.Request) {
	// response, _ := ioutil.ReadAll(r.Body)

	// var userId entities.User
	// err := json.Unmarshal(response, &userId)
	// if err != nil {
	// 	log.Fatalf("Err: %s", err)
	// 	return
	// }

	
	// chatHistory := handler.chatService.LoadChatHistory(userId)

	// jsonResp, err := json.Marshal(chatHistory)
	// if err != nil {
	// 	log.Fatalf("Err: %s", err)
	// }
	// w.Write(jsonResp)
	return
}
