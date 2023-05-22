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

func (d *Database) SaveUser(user entities.User) error {
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

func (d *Database) GetHashedPassword(email string) (string, error) {
	fmt.Println("SQL work")
	var password string

	err := d.db.QueryRow("SELECT password_hash FROM users WHERE email = ?", email).Scan(&password)
	if err == sql.ErrNoRows {
		return password, err
	}

	fmt.Println("SQL work end")
	return password, nil
}

//sessions

func (d *Database) SaveSession() error {
	return nil
}

func (d *Database) RemoveSession() error {
	return nil
}

func (d *Database) GetSession() error {
	return nil
}

// chat

func (d *Database) SaveMsg() error {
	return nil
}

func (d *Database) GetPrevMsgs() error {
	return nil
}

// posts

func (d *Database) GetPosts() error {
	return nil
}

func (d *Database) GetPost() error {
	return nil
}

func (d *Database) SavePost() error {
	return nil
}

func (d *Database) GetComments() error {
	return nil
}

func (d *Database) SaveComment() error {
	return nil
}

// func (d *Database) SaveMessage(message entities.Message) error {
// 	fmt.Println("database saved msg")
// 	//https://go.dev/tour/concurrency/9
// 	//req := d.db.Create(&message)
// 	// if req.RowsAffected == 0 {
// 	// 	return errors.New(fmt.Sprintf("messages not saved: %v", req.Error))
// 	// }
// 	return nil
// }
