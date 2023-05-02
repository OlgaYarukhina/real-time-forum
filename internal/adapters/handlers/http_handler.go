//handle for concrete url X
//use concrete middleware from pkg/middleware
//use service from internal/domain/services to do logic
package handlers

import (
	"fmt"
	"net/http"
	"real-time-forum/internal/core/entities"
	"real-time-forum/internal/core/services"
)

type HTTPHandler struct {
	i services.MessengerService
	//services
}

func NewHTTPHandler(messenger services.MessengerService) *HTTPHandler {
	return &HTTPHandler{
		i: messenger,
		//services
	}
}

func (handler *HTTPHandler) TestHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Println("handler worked")
	handler.i.SendMessage(entities.Message{Body: "my msg"})
	w.Write([]byte("just text"))
	return
}
func (handler *HTTPHandler) TestMiddleware(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		fmt.Println("middleware worked")
		next(w, r)
	}
}
