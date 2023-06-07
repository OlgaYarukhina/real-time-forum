package interfaces

import "real-time-forum/internal/domain/entities"

type Auther interface {
	Register(user entities.User) error
	Login(credentials entities.UserCredentials) (int, string, error)
	Logout(sessionId int) error
	IsValidSession(sessionId int, token string) (int, error)
}
