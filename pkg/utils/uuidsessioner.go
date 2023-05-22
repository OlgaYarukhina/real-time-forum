package utils

import (
	"fmt"

	uuid "github.com/gofrs/uuid"
)

type UuidSessioner struct{}

func NewUuidSessioner() *UuidSessioner {
	return &UuidSessioner{}
}

func (us UuidSessioner) NewToken() (string, error) {
	uuid, err := uuid.NewV4()
	if err != nil {
		fmt.Println("Error generating UUID:", err)
		return "", err
	}

	fmt.Println("Generated UUID:", uuid.String())
	return uuid.String(), nil
}
