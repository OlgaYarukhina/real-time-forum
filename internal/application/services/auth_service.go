package services

import (
	"fmt"
	"real-time-forum/internal/domain/entities"
	"real-time-forum/internal/domain/interfaces"
	//	"real-time-forum/pkg/utils"
)

type AuthService struct {
	repo   interfaces.Repository
	hasher interfaces.Hasher
}

func NewAuthService(repo interfaces.Repository, hasher interfaces.Hasher) *AuthService {
	fmt.Println("AuthService created and ready to use")
	return &AuthService{
		repo:   repo,
		hasher: hasher,
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
	hash, err := service.hasher.HashPassword(user.PasswordHash)
	if err != nil {
		return err
	}
	user.PasswordHash = hash
	//try create new user
	err = service.repo.CreateUser(user)
	if err != nil {
		return err
	}

	fmt.Println("auth service register ends job")
	return nil
}

func (service AuthService) CheckSession() {

}
