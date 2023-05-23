package services

import (
	"fmt"
	"real-time-forum/internal/domain/entities"
	"real-time-forum/internal/domain/interfaces"
	//	"real-time-forum/pkg/utils"
)

type AuthService struct {
	repo      interfaces.Repository
	hasher    interfaces.Hasher
	sessioner interfaces.Sessioner
}

func NewAuthService(repo interfaces.Repository,
	hasher interfaces.Hasher, sessioner interfaces.Sessioner) *AuthService {
	fmt.Println("AuthService created and ready to use")
	return &AuthService{
		repo:      repo,
		hasher:    hasher,
		sessioner: sessioner,
	}
}

func (service AuthService) Login(currentUser entities.User) (string, error) {
	fmt.Println("auth service login job")

	password, errEmail := service.repo.GetHashedPassword(currentUser.Email) // check email and get password

	if errEmail != nil {
		fmt.Println(errEmail)
		return "", errEmail // wrong email
	}

	errPass := service.hasher.CheckPasswordHash(currentUser.PasswordHash, password)

	if errPass != nil {
		return "", errPass // wrong pass
	}

	fmt.Println("Password correct")
	token, err := service.sessioner.NewToken()
	if err != nil {
		fmt.Println(err)
		return "", err // cannot create session token
	}
	err = service.repo.SaveSession(token)
	if err != nil {
		fmt.Println(err)
		return "", err // cannot save session token
	}
	return token, nil
}

func (service AuthService) Logout(token string) error {
	return nil
}

// put it where you want

func (service AuthService) Register(user entities.User) error {
	hash, err := service.hasher.HashPassword(user.PasswordHash)
	if err != nil {
		return err
	}
	user.PasswordHash = hash

	err = service.repo.SaveUser(user)
	if err != nil {
		return err
	}

	fmt.Println("auth service register ends job")
	return nil
}

func (service AuthService) IsValidSession(token string) bool {
	return true
}
