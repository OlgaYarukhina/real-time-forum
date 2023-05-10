package interfaces

import "real-time-forum/internal/domain/entities"

type Auther interface {
	Register(user entities.User) error
	Login(credentials entities.UserCredentials) (string, error)
	CheckSession()
}
