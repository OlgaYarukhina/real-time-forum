package services

import (
	"fmt"
	"log"
	"real-time-forum/internal/domain/entities"
	"real-time-forum/internal/domain/interfaces"
	"sort"
	"strings"
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

func (service ChatService) GetUsers(activeUserIds []int, currentUser int) (map[string]interface{}, error) {
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

	// sort users for displaing in chat list in right order

	allUsersSorted := make(map[string]interface{})
	usersWithMessages := make([]entities.UserChatInfo, 0)
	usersWithoutMessages := make([]entities.UserChatInfo, 0)

	for _, user := range allUsers {
		if user.IsMessage == true {
			usersWithMessages = append(usersWithMessages, *user)
		} else {
			usersWithoutMessages = append(usersWithoutMessages, *user)
		}
	}

	sort.Slice(usersWithMessages, func(i, j int) (less bool) {
		return usersWithMessages[i].LastMessage.Sub(usersWithMessages[j].LastMessage) > 0
	})

	sort.Slice(usersWithoutMessages, func(i, j int) (less bool) {
		return strings.ToLower(usersWithoutMessages[i].Nickname) < strings.ToLower(usersWithoutMessages[j].Nickname)
	})

	allUsersSorted["withmsg"] = usersWithMessages
	allUsersSorted["withoutmsg"] = usersWithoutMessages

	return allUsersSorted, err
}

func (service ChatService) SaveMsg(newMessage entities.Message) error {
	err := service.repo.SaveMsg(newMessage)
	if err != nil {
		return err
	}
	return nil
}

func (service ChatService) LoadChatHistory(currentUser, user int) []*entities.Message {
	messages, err := service.repo.GetHistory(currentUser, user)
	if err != nil {
		log.Fatalf("Could not get chat history. Err: %s", err)
	}
	return messages
}

func (service ChatService) GetUserIdByNickname(nick string) (int, error) {
	id, err := service.repo.GetUserIdByNickname(nick)
	if err != nil {
		log.Fatalf("Could not get nickname. Err: %s", err)
	}
	return id, nil
}

func (service ChatService) GetUserNicknameByID(userID int) (string, error) {
	return service.repo.GetUserNicknameByID(userID)
}
