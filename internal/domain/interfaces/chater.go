package interfaces

import "real-time-forum/internal/domain/entities"

type Chater interface {
	SaveMsg(newMessage entities.Message) error
	LoadChatHistory(currentUser, user int) []*entities.Message
	GetUsers(activeUserIds []int, currentUser int) (map[string]interface{}, error)
	GetUserIdByNickname(nick string) (int, error)
	GetUserNicknameByID(userID int) (string, error)
}
