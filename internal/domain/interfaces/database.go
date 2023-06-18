package interfaces

import "real-time-forum/internal/domain/entities"

//split to different interfaces?
type Repository interface {
	//user repo
	SaveUser(user entities.User) error
	GetHashedPassword(login string) (int, string, error)
	GetAllUsers(currentUserID int) ([]*entities.UserChatInfo, error)
	GetUserIdByNickname(nick string) (int, error)

	//session repo
	SaveSession(token entities.Session) (int, error)
	RemoveSession(sessionId int) error
	RemoveExpiredSessions() error
	GetSession(userId int) (entities.Session, error)

	//chat repo
	SaveMsg(message entities.Message) error
	GetHistory(currentUser, user int) ([]*entities.Message, error)
	CheckIsUnread(currentUser, user int) (bool, bool)

	//posts repo
	GetPosts() ([]entities.Post, error)
	GetPost(postId entities.Post) (*entities.Post, error)
	SavePost(post entities.Post) error
	GetComments(postId entities.Post) ([]*entities.Comment, error)
	SaveComment(comment entities.Comment) error
}
