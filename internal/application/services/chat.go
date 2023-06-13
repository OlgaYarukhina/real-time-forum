package services

import (
	"fmt"
	"log"
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

func (service ChatService) GetUsers(activeUserIds []int) []entities.UserChatInfo {
	fmt.Println("chat service works on getting users")
	allUsers, err:= service.repo.GetAllUsers()
	if err != nil {
		log.Fatalf("Could not get list of users. Err: %s", err)
	}
	service.repo.GetUnreadByUserIds(allUsers)
	return nil
}

func (service ChatService) SendMsg() error {
	return nil
}

func (service ChatService) LoadChatHistory() error {
	return nil
}


