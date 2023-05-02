package interfaces

import "real-time-forum/internal/core/entities"

type Messenger interface {
	SendMessage(message entities.Message) error
}
