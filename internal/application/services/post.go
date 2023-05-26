package services

import (
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