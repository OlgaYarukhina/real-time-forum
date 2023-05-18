package services

import (
	"fmt"
	"real-time-forum/internal/domain/entities"
	"real-time-forum/internal/domain/interfaces"
	//	"real-time-forum/pkg/utils"
)

type AuthService struct {
	repo interfaces.Repository
}

func NewAuthService(repo interfaces.Repository) *AuthService {
	fmt.Println("AuthService created and ready to use")
	return &AuthService{
		repo: repo,
	}
}

func (service AuthService) Login(credentials entities.UserCredentials) (string, error) {
	fmt.Println("auth service login job")
	savedCredentials, _ := service.repo.GetUserCredentials(credentials.Email /*or nickname*/)
	//check for error and equality
	savedCredentials.Email = ""
	fmt.Println("auth service login ends job")
	return "session token?", nil
}

func (service AuthService) Register(user entities.User) error {

	//try create new user
	err := service.repo.CreateUser(user)
	if err != nil {
		return err
	}

	fmt.Println("auth service register ends job")
	return nil
}

func (service AuthService) CheckSession() {

}
