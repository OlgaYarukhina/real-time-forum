package interfaces

import "real-time-forum/internal/domain/entities"

type Chater interface {
	SendMsg() error
	LoadChatHistory() error
	GetUsers(activeUserIds []int) ([]entities.UserChatInfo, error)
}
