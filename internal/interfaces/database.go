package interfaces

import "real-time-forum/internal/core/entities"

type Repository interface {
	SaveMessage(message entities.Message) error
}
