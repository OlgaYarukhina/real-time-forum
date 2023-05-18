package database

import (
	"database/sql"
	"fmt"
	"real-time-forum/internal/domain/entities"

	_ "github.com/mattn/go-sqlite3"
)

type Database struct {
	db *sql.DB
}

func NewDatabase(dsn string) (*Database, error) {
	fmt.Println(" database connection created and db is ready to use through adapter")
	//fmt.Println("dsn - " + dsn)
	db, err := sql.Open("sqlite3", dsn)
	if err != nil {
		return nil, err
	}
	if err = db.Ping(); err != nil {
		return nil, err
	}
	return &Database{
		db: db,
	}, nil
}

func (d *Database) GetUserCredentials(login string) (entities.UserCredentials, error) {
	fmt.Println("database getting user credentials")
	return entities.UserCredentials{}, nil
}

func (d *Database) CreateUser(user entities.User) error {
	fmt.Println("database try create new user ")

	stmt := `INSERT INTO users (email, nickname, age, gender, first_name, last_name, password_hash, created_at)
    VALUES(?, ?, ?, ?, ?, ?, ?, current_date)`

	_, err := d.db.Exec(stmt, user.Email, user.Nickname, user.Age, user.Gender,
		user.FirstName, user.LastName, []byte(user.PasswordHash))
	if err != nil {
		fmt.Println(err)
		return err
	}

	return nil
}

func (d *Database) SaveMessage(message entities.Message) error {
	fmt.Println("database saved msg")
	//https://go.dev/tour/concurrency/9
	//req := d.db.Create(&message)
	// if req.RowsAffected == 0 {
	// 	return errors.New(fmt.Sprintf("messages not saved: %v", req.Error))
	// }
	return nil
}
