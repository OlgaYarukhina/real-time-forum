package entities

import "time"

type Message struct {
	ID           int       `json:"message_id"`
	SenderID     int       `json:"sender_id"`
	ReceiverID   int       `json:"receiver_id"`
	Sender       string    `json:"sender"`
	Receiver     string    `json:"receiver"`
	Body         string    `json:"body"`
	SendTime     time.Time `json:"created_at"`
}
