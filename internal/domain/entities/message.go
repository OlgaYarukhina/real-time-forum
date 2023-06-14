package entities

type Message struct {
	ID           int    `json:"user_id"`
	SenderID     int    `json:"user_id"`
	ReceiverID   int    `json:"user_id"`
	Body         string `json:"body"`
}
