package entities

import "time"


type UserChatInfo struct {
	UserID              int       `json:"user_id"`
	Nickname            string    `json:"nickname"`
	IsMessage           bool      `json:"ismessage"`
	IsActive            bool      `json:"isactive"`
	IsUnread            bool      `json:"isunread"`
	LastMessage         time.Time `json:"created_at"`
}
