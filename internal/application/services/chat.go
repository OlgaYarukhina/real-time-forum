package services

import (
	"errors"
	"fmt"
	"real-time-forum/internal/domain/entities"
	"real-time-forum/internal/domain/interfaces"
)

type ChatService struct {
	repo interfaces.Repository
}

func NewChatService(repo interfaces.Repository) *ChatService {
	fmt.Println("ChatService created and ready to use")

	return &ChatService{
		repo: repo,
	}
}

func (service ChatService) GetUsers(activeUserIds []int) ([]entities.UserChatInfo, error) {
	fmt.Println("chat service works on getting users")
	service.repo.GetAllUserIds()
	service.repo.GetUnreadByUserIds([]int{})
	return nil, errors.New("")
}

func (service ChatService) SendMsg() error {
	return nil
}

func (service ChatService) LoadChatHistory() error {
	return nil
}
