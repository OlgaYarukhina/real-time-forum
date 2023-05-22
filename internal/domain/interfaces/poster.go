package interfaces

type Poster interface {
	LoadPosts() error
	CreatePost() error
	LoadPostWithComments() error
	CreateComment() error
}
