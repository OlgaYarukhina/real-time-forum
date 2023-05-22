package services

import (
	"fmt"
	"real-time-forum/internal/core/entities"
	"real-time-forum/internal/interfaces"

	"golang.org/x/crypto/bcrypt"
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

func (service AuthService) Login(currentUser entities.User) error {
	fmt.Println("auth service login job")
	//fmt.Println(currentUser.PasswordHash)

	password, err := service.repo.GetUserCredentials(currentUser.Email)  // check email and get password
	fmt.Println(password)

	if err != nil {
		fmt.Println(err)
		return err       // wrong email
	} else {
		switch CheckPasswordHash(currentUser.PasswordHash, password) {
		case true:
			// create token
			fmt.Println("All good")
			return nil

		case false: 
		fmt.Println("Something bad")
		return err  // wrong password
		}
	}

	fmt.Println("auth service login ends job")
	return nil
}


// put it where you want
func CheckPasswordHash(password, hash string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	return err == nil
}


func (service AuthService) Register(user entities.User) error {

	err := service.repo.CreateUser(user)
	if err != nil {
		return err
	}

	fmt.Println("auth service register ends job")
	return nil
}

func (service AuthService) CheckSession() {

}
