package interfaces

import "real-time-forum/internal/domain/entities"

//split to different interfaces?
type Repository interface {
	//user repo
	SaveUser(user entities.User) error
	GetHashedPassword(login string) (string, error)

	//session repo
	SaveSession(token string) error
	RemoveSession() error
	GetSession() error

	//chat repo
	SaveMsg() error
	GetPrevMsgs() error

	//posts repo
	GetPosts() ([]entities.Post, error) 
	GetPost(postId entities.Post) (*entities.Post, error) 
	SavePost(post entities.Post) error
	GetComments(postId entities.Post) ([]entities.Comment, error) 
	SaveComment() error
}
