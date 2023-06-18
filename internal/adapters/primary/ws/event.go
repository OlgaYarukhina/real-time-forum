package wsadpt

import (
	"encoding/json"
	"fmt"
	"real-time-forum/internal/domain/entities"
	"strconv"
	"strings"
	"time"
)

type Event struct {
	Type    string          `json:"type"`
	Payload json.RawMessage `json:"payload"`
}

type EventHandler func(event Event, c *Client) error

const (
	EventSendMessage   = "send_message"
	EventNewMessage    = "new_message"
	EventChangeRoom    = "change_room"
	EventClientChanges = "client_changes"
)

type ClientChangesEvent struct {
	Status string `json:"status"`
	UserID int    `json:"userId"`
}

type SendMessageEvent struct {
	Message string `json:"message"`
	From    int    `json:"from"`
}

type NewMessageEvent struct {
	SendMessageEvent
	Sent time.Time `json:"sent"`
}

type ChangeRoomEvent struct {
	Name string `json:"name"`
}

// SendMessageHandler will send out a message to all other participants in the chat
func SendMessageHandler(event Event, c *Client) error {
	var chatevent SendMessageEvent
	if err := json.Unmarshal(event.Payload, &chatevent); err != nil {
		return fmt.Errorf("bad payload in request: %v", err)
	}

	var broadMessage NewMessageEvent

	broadMessage.Sent = time.Now()
	broadMessage.Message = chatevent.Message
	broadMessage.From = chatevent.From

	data, err := json.Marshal(broadMessage)
	if err != nil {
		return fmt.Errorf("failed to marshal broadcast message: %v", err)
	}

	var outgoingEvent Event
	outgoingEvent.Payload = data
	outgoingEvent.Type = EventNewMessage

	for client := range c.manager.Clients {
		if client.chatroom == "" {
			continue
		}
		if client.chatroom == c.chatroom ||
			strings.Split(client.chatroom, "&")[0] == strings.Split(c.chatroom, "&")[1] &&
				strings.Split(client.chatroom, "&")[1] == strings.Split(c.chatroom, "&")[0] {
			client.egress <- outgoingEvent
		}
	}
	fmt.Println(c.chatroom)
	receiverId, err := strconv.Atoi(strings.Split(c.chatroom, "&")[1])
	if err != nil {
		//log
		return nil
	}

	err = c.manager.chatService.SaveMsg(entities.Message{
		SenderID:   receiverId,
		ReceiverID: broadMessage.From,
		Body:       broadMessage.Message,
		SendTime:   broadMessage.Sent,
	})
	if err != nil {
		//log ?
	}

	return nil
}

func ChatRoomHandler(event Event, c *Client) error {
	var changeRoomEvent ChangeRoomEvent
	if err := json.Unmarshal(event.Payload, &changeRoomEvent); err != nil {
		return fmt.Errorf("bad payload in request: %v", err)
	}

	c.chatroom = changeRoomEvent.Name
	return nil
}
