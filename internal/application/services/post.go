package services

import (
	"real-time-forum/internal/domain/interfaces"
)

type PostService struct {
	repo      interfaces.Repository
}

func NewPostService(repo interfaces.Repository) *PostService {
	return &PostService{
		repo:      repo,
	}
}


// func (service PostsService) CreatePost(post entities.Post) error {

// 	err := service.repo.SavePost(post)
// 	if err != nil {
// 		return err
// 	}

// 	return nil
// }