package interfaces

import "real-time-forum/internal/domain/entities"

//split to different interfaces?
type Repository interface {
	//user repo
	SaveUser(user entities.User) error
	GetUserCredentials(login string) (entities.UserCredentials, error)

	//session repo
	SaveSession() error
	RemoveSession() error
	GetSession() error

	//chat repo
	SaveMsg() error
	GetPrevMsgs() error

	//posts repo
	GetPosts() error
	GetPost() error
	SavePost() error
	GetComments() error
	SaveComment() error
}
