package database

import (
	"database/sql"
	"fmt"
	"real-time-forum/internal/core/entities"
)

type Database struct {
	db *sql.DB
}

func NewDatabase() *Database {
	fmt.Println(" database connection created and db is ready to use through adapter")
	//creation

	return &Database{
		//db: db,
	}
}

func (m *Database) SaveMessage(message entities.Message) error {
	fmt.Println("database saved msg")
	//https://go.dev/tour/concurrency/9
	//req := m.db.Create(&message)
	// if req.RowsAffected == 0 {
	// 	return errors.New(fmt.Sprintf("messages not saved: %v", req.Error))
	// }
	return nil
}
