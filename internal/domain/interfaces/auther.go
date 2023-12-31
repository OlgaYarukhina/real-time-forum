package interfaces

import "real-time-forum/internal/domain/entities"

type Auther interface {
	Register(user entities.User) error
	Login(cred entities.UserCredentials) (int, int, string, error)
	Logout(sessionId int) error
	IsValidSession(sessionId int, token string) (int, error)
}
