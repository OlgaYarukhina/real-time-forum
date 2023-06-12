package interfaces

import "real-time-forum/internal/domain/entities"

type Poster interface {
	LoadPosts() []entities.Post
	CreatePost(post entities.Post) error
	CreateComment(comment entities.Comment) error
	LoadPostWithComments(postId entities.Post) map[string]interface{}
}
