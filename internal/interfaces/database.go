package interfaces

import "real-time-forum/internal/core/entities"

type Repository interface {
	GetUserCredentials(login string) (entities.UserCredentials, error)
	CreateUser(user entities.User) error
	//
	SaveMessage(message entities.Message) error
}
