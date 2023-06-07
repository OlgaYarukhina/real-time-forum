package entities

import "time"

type Session struct {
	Id       int       `json:"session_id"`
	Token    string    `json:"token"`
	UserID   int       `json:"user_id"`
	ExpireAt time.Time `json:"expire_at"`
}
