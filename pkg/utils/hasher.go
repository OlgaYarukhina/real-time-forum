package utils

import (
	"golang.org/x/crypto/bcrypt"
)

type Hasher struct{}

func NewHasher() *Hasher {
	return &Hasher{}
}

func (ph Hasher) HashString(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), 14)
	return string(bytes), err
}

func (ph Hasher) CheckHash(password, hash string) error {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	if err != nil {
		return err
	}
	return nil
}
