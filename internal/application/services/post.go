package services

import (
	"log"
	"real-time-forum/internal/domain/entities"
	"real-time-forum/internal/domain/interfaces"
)

type PostsService struct {
	repo      interfaces.Repository
}

func NewPostService(repo interfaces.Repository) *PostsService {
	return &PostsService{
		repo:      repo,
	}
}


func (service PostsService) CreatePost(post entities.Post) error {

	err := service.repo.SavePost(post)
	if err != nil {
		return err
	}

	return nil
}

func (service PostsService) LoadPosts() []entities.Post {

	posts, err := service.repo.GetPosts()
	if err != nil {
		log.Fatalf("Could not get posts. Err: %s", err)
		return posts // need correcting
	}

	return posts
}

func (service PostsService) LoadPostWithComments(postId entities.Post) *entities.Post {

	post, err := service.repo.GetPost(postId)
	if err != nil {
		log.Fatalf("Could not get post. Err: %s", err)
		return post // need correcting
	}

	return post
}
