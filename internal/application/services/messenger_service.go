//concrete service logic
//use here and only here entities - creating, modification and etc

package services

import (
	"fmt"
	"real-time-forum/internal/domain/entities"
	"real-time-forum/internal/domain/interfaces"
	//"github.com/gofrs/uuid"
)

type MessengerService struct {
	repo interfaces.Repository
}

func NewMessengerService(repo interfaces.Repository) *MessengerService {
	fmt.Println("messenger service created and ready to use")
	return &MessengerService{
		repo: repo,
	}
}

func (service *MessengerService) SendMessage(message entities.Message) error {
	//logic before sending
	fmt.Println("message service did job before saving")
	return service.repo.SaveMessage(message)
}
