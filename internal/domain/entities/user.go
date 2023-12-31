package entities

import "time"

type User struct {
	UserID       int       `json:"user_id"`
	Email        string    `json:"email"`
	Nickname     string    `json:"nickname"`
	Age          int       `json:"age,string"`
	Gender       string    `json:"gender"`
	FirstName    string    `json:"first_name"`
	LastName     string    `json:"last_name"`
	PasswordHash string    `json:"pass"`
	CreatedAt    time.Time `json:"created_at"`
}
