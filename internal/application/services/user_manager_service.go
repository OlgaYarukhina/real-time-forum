package services

import (
	"fmt"
	"real-time-forum/internal/domain/interfaces"
)

type UserManagerService struct {
	repo interfaces.Repository
}

func NewUserManagerService(repo interfaces.Repository) *UserManagerService {
	fmt.Println("UserManagerService created and ready to use")
	return &UserManagerService{
		repo: repo,
	}
}

func (service UserManagerService) SubscribeOnlineUsersUpdates() {

}
