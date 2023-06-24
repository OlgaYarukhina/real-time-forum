// handle for concrete url X
// use concrete middleware from pkg/middleware
// use service from internal/domain/services to do logic
package httpadpt

import (
	"log"
	"net/http"
	"real-time-forum/internal/domain/interfaces"
	"strconv"
)

type HttpAdapter struct {
	authService  interfaces.Auther
	postsService interfaces.Poster
}

func New(authService interfaces.Auther, postsService interfaces.Poster) *HttpAdapter {
	return &HttpAdapter{
		authService:  authService,
		postsService: postsService,
	}
}

func (handler *HttpAdapter) SessionCheck(next func(http.ResponseWriter, *http.Request, int)) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		sessionToken := r.Header.Get("X-Session-Token")
		sessionId, err := strconv.Atoi(r.Header.Get("X-Session-Id"))
		if sessionToken == "" {
			sessionToken = r.URL.Query().Get("sessionToken")
			sessionId, err = strconv.Atoi(r.URL.Query().Get("sessionId"))
		}
		if err != nil {
			w.WriteHeader((http.StatusInternalServerError))
			return
		}
		if userId, err := handler.authService.IsValidSession(sessionId, sessionToken); err == nil {
			log.Println("session is valid")
			next(w, r, userId)
		} else {
			w.WriteHeader(http.StatusUnauthorized)
			return
		}
	}
}
