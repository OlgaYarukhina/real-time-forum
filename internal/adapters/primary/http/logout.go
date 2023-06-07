package httpadpt

import (
	"net/http"
)

func (handler *HttpAdapter) LogoutHandler(w http.ResponseWriter, r *http.Request, userId int) {
	// TODO : make function remove specific
	err := handler.authService.Logout(userId)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
	return
}
