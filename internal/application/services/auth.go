package services

import (
	"errors"
	"real-time-forum/internal/domain/entities"
	"real-time-forum/internal/domain/interfaces"
	"time"
)

type AuthService struct {
	repo      interfaces.Repository
	hasher    interfaces.Hasher
	sessioner interfaces.Sessioner
}

func NewAuthService(repo interfaces.Repository, hasher interfaces.Hasher, sessioner interfaces.Sessioner) *AuthService {
	return &AuthService{
		repo:      repo,
		hasher:    hasher,
		sessioner: sessioner,
	}
}

func (service AuthService) Login(cred entities.UserCredentials) (int, int, string, error) {

	id, password, err := service.repo.GetHashedPassword(cred.Email) // check email and get password
	if err != nil {
		return -1, -1, "", err // wrong email
	}

	err = service.hasher.CheckHash(cred.Pass, password)
	if err != nil {
		return -1, -1, "", err // wrong pass
	}

	token, err := service.sessioner.NewToken()
	if err != nil {
		return -1, -1, "", err // cannot create session token
	}

	tokenHash, err := service.hasher.HashString(token)
	if err != nil {
		return -1, -1, "", err // cannot hash session token
	}

	sessionId, err := service.repo.SaveSession(entities.Session{
		Token:    tokenHash,
		UserID:   id,
		ExpireAt: time.Now().Add(45 * time.Minute),
	})
	if err != nil {
		return -1, -1, "", err // cannot save session token
	}

	return id, sessionId, token, nil
}

func (service AuthService) Logout(userId int) error {
	return service.repo.RemoveSession(userId)
}

func (service AuthService) Register(user entities.User) error {
	// TODO : add server side form validation
	hash, err := service.hasher.HashString(user.PasswordHash)
	if err != nil {
		return err
	}
	user.PasswordHash = hash

	err = service.repo.SaveUser(user)
	if err != nil {
		return err
	}

	return nil
}

func (service AuthService) IsValidSession(sessionId int, token string) (int, error) {
	session, err := service.repo.GetSession(sessionId)
	if err != nil {
		return -1, err // wrong token
	}

	if session.ExpireAt.Before(time.Now()) {
		err = errors.New("Expired token")
		return -1, err // expired
	}

	err = service.hasher.CheckHash(token, session.Token)
	if err != nil {
		return -1, err //not same token
	}

	return session.UserID, nil
}
