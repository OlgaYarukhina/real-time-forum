package interfaces

import "real-time-forum/internal/domain/entities"

type Repository interface {
	GetUserCredentials(login string) (entities.UserCredentials, error)
	CreateUser(user entities.User) error
	//
	SaveMessage(message entities.Message) error
}