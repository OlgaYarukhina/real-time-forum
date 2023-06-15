package interfaces

import "real-time-forum/internal/domain/entities"

type Chater interface {
	SendMsg() error
	LoadChatHistory(currentUser, user int) []entities.Message
	GetUsers(activeUserIds []int, currentUser int) ([]*entities.UserChatInfo, error)
}
