package helpers

import (
	"log"
	"time"

	"real-time-forum/internal/domain/interfaces"
)

type SessionCleaner struct {
	repo interfaces.Repository
}

func NewSessionCleaner(repo interfaces.Repository) *SessionCleaner {
	return &SessionCleaner{
		repo: repo,
	}
}

func (cleaner *SessionCleaner) StartCleaningSessions(interval time.Duration) {
	ticker := time.NewTicker(interval)

	go func() {
		for {
			select {
			case <-ticker.C:
				err := cleaner.repo.RemoveExpiredSessions()
				if err != nil {
					log.Fatalf("Error: %s", err)
				}
			}
		}
	}()
}
