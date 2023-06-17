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

func (service ChatService) GetUsers(activeUserIds []int, currentUser int) ([]*entities.UserChatInfo, error) {
	fmt.Println("chat service works on getting users")

	allUsers, err := service.repo.GetAllUsers(currentUser) // users with checked message status
	if err != nil {
		log.Fatalf("Could not get list of users. Err: %s", err)
	}

	// add isActive status
	for _, user := range allUsers {
		user.IsActive = false
		for _, isActiveUserId := range activeUserIds {
			if user.UserID == isActiveUserId {
				user.IsActive = true
				break
			}
		}
	}

	return allUsers, err
}

func (service ChatService) SaveMsg(newMessage entities.Message) error {
	err := service.repo.SaveMsg(newMessage)
	if err != nil {
		return err
	}
	return nil
}

func (service ChatService) LoadChatHistory(currentUser, user int) []entities.Message {
	messages, err := service.repo.GetHistory(currentUser, user)
	if err != nil {
		log.Fatalf("Could not get chat history. Err: %s", err)
	}
	return messages
}
