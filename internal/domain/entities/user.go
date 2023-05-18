package entities

import "time"

type User struct {
	UserID       int       `json:"user_id"`
	Nickname     string    `json:"nickname"`
	Age          int       `json:"age,string"`
	Gender       string    `json:"gender"`
	FirstName    string    `json:"first_name"`
	LastName     string    `json:"last_name"`
	Email        string    `json:"email"`
	PasswordHash string    `json:"pass"`
	CreatedAt    time.Time `json:"created_at"`
}
