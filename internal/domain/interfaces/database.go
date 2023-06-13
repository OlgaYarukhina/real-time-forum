package interfaces

import "real-time-forum/internal/domain/entities"

//split to different interfaces?
type Repository interface {
	//user repo
	SaveUser(user entities.User) error
	GetHashedPassword(login string) (int, string, error)
	GetAllUsers() ([]*entities.User, error)

	//session repo
	SaveSession(token entities.Session) (int, error)
	RemoveSession(sessionId int) error
	RemoveExpiredSessions() error
	GetSession(userId int) (entities.Session, error)

	//chat repo
	SaveMsg() error
	GetPrevMsgs() error
	GetUnreadByUserIds(users []entities.User) ([]entities.UserChatInfo, error)

	//posts repo
	GetPosts() ([]entities.Post, error)
	GetPost(postId entities.Post) (*entities.Post, error)
	SavePost(post entities.Post) error
	GetComments(postId entities.Post) ([]*entities.Comment, error)
	SaveComment(comment entities.Comment) error
}
