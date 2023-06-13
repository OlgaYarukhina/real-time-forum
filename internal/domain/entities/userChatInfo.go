package entities

type UserChatInfo struct {
	Nickname string `json:"nickname"`
	IsUnread bool   `json:"isunread"`
}
