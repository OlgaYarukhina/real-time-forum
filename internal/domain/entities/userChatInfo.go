package entities

type UserChatInfo struct {
	Nickname string `json:"nickname"`
	IsActive bool   `json:"isactive"`
	IsUnread bool   `json:"isunread"`
}
