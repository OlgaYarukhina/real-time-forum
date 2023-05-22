package interfaces

import "real-time-forum/internal/core/entities"

type Repository interface {
	GetUserCredentials(email string) (string, error)
	CreateUser(user entities.User) error
	//
	SaveMessage(message entities.Message) error
}
