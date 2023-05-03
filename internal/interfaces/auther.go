package interfaces

import "real-time-forum/internal/core/entities"

type Auther interface {
	Register(user entities.User) error
	Login(credentials entities.UserCredentials) (string, error)
	CheckSession()
}
