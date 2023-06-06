// handle for concrete url X
// use concrete middleware from pkg/middleware
// use service from internal/domain/services to do logic
package httpadpt

import (
	"real-time-forum/internal/domain/interfaces"
)

type HttpAdapter struct {
	authService  interfaces.Auther
	postsService interfaces.Poster
}

func New(authService interfaces.Auther, postsService interfaces.Poster) *HttpAdapter {
	return &HttpAdapter{
		authService:  authService,
		postsService: postsService,
		//messengerService:   messenger,
		//userManagerService: userManager,
		//services
	}
}

// TODO : add 'middleware' function for access management

// func (handler *HTTPHandler) TestHandler(w http.ResponseWriter, r *http.Request) {
// 	fmt.Println("handler worked")
// 	handler.messengerService.SendMessage(entities.Message{Body: "my msg"})
// 	w.Write([]byte("just text"))
// 	return
// }
// func (handler *HTTPHandler) TestMiddleware(next http.HandlerFunc) http.HandlerFunc {
// 	return func(w http.ResponseWriter, r *http.Request) {
// 		fmt.Println("middleware worked")
// 		next(w, r)
// 	}
// }
