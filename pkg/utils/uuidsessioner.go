package utils

import (

	uuid "github.com/gofrs/uuid"
)

type UuidSessioner struct{}

func NewUuidSessioner() *UuidSessioner {
	return &UuidSessioner{}
}

func (us UuidSessioner) NewToken() (string, error) {
	uuid, err := uuid.NewV4()
	if err != nil {
		return "", err
	}
	return uuid.String(), nil
}
