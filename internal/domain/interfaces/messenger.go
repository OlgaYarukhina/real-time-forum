package interfaces

import "real-time-forum/internal/domain/entities"

type Messenger interface {
	SendMessage(message entities.Message) error
}
