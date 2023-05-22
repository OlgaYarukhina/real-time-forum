package interfaces

type Chater interface {
	SendMsg() error
	LoadChatHistory() error
}
