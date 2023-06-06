package httpadpt

import (
	"net/http"
)

func (handler *HttpAdapter) LogoutHandler(w http.ResponseWriter, r *http.Request) {
	// TODO : call db token clearing
	return
}
