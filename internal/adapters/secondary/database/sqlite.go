package database

import (
	"database/sql"
	"fmt"
	"real-time-forum/internal/domain/entities"
	"strconv"
	"time"

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

func (d *Database) GetHashedPassword(email string) (int, string, error) {
	fmt.Println("SQL work")
	var password string
	var id int

	err := d.db.QueryRow("SELECT user_id, password_hash FROM users WHERE email = ?", email).Scan(&id, &password)
	if err == sql.ErrNoRows {
		return id, password, err
	}

	fmt.Println("SQL work end")
	return id, password, nil
}

//sessions

func (d *Database) SaveSession(session entities.Session) (int, error) {
	stmt := `INSERT INTO user_sessions (token, user_id, expire_at)
    VALUES(?, ?, ?)`

	result, err := d.db.Exec(stmt, session.Token, session.UserID, session.ExpireAt)
	if err != nil {
		fmt.Println(err)
		return -1, err
	}
	sessionID, err := result.LastInsertId()
	if err != nil {
		fmt.Println(err)
		return -1, err
	}
	return int(sessionID), nil
}

func (d *Database) RemoveSession(userId int) error {
	stmt := "DELETE FROM user_sessions WHERE user_id = ?"

	_, err := d.db.Exec(stmt, userId)
	if err != nil {
		fmt.Println(err)
		return err
	}

	return nil
}

func (repo *Database) RemoveExpiredSessions() error {
	stmt := "DELETE FROM user_sessions WHERE expire_at < ?"

	expirationTime := time.Now()

	_, err := repo.db.Exec(stmt, expirationTime)
	if err != nil {
		return err
	}

	return nil
}

func (d *Database) GetSession(sessionID int) (entities.Session, error) {
	var session entities.Session

	stmt := `SELECT id, token, user_id, expire_at FROM user_sessions WHERE id = ?`

	err := d.db.QueryRow(stmt, sessionID).Scan(&session.Id, &session.Token, &session.UserID, &session.ExpireAt)
	if err != nil {
		if err == sql.ErrNoRows {
			// Handle case where session is not found
			return session, fmt.Errorf("session not found")
		}
		return session, err
	}

	return session, nil
}

// chat

func (d *Database) SaveMsg() error {
	return nil
}

func (d *Database) GetPrevMsgs() error {
	return nil
}

// posts

func (d *Database) GetPosts() ([]entities.Post, error) {
	stmt := `SELECT * FROM posts ORDER BY created_at ASC LIMIT 200`
	rows, err := d.db.Query(stmt)
	defer rows.Close()
	var posts []entities.Post
	for rows.Next() {
		s := entities.Post{}
		err = rows.Scan(&s.PostID, &s.Title, &s.Content, &s.UserID, &s.CreatedAt)
		//s.Category_name, err = d.getCategoryRelation(&s.ID)
		//s.Like, s.Dislike, err = d.getCountLikesByPostId(&s.ID)
		if err != nil {
			return nil, err
		}
		posts = append(posts, s)
	}
	return posts, nil
}

func (d *Database) GetPost() error {
	return nil
}

func (d *Database) SavePost(post entities.Post) error {
	stmt := `INSERT INTO posts (header, content, user_id, created_at)
    VALUES(?,?,?, current_date)`
	result, err := d.db.Exec(stmt, post.Title, post.Content, post.UserID, post.CreatedAt)
	id, err := result.LastInsertId()
	for _, category_id := range post.Categories {
		cat_id, err := strconv.Atoi(category_id)
		stmt := `INSERT INTO categoryPostRelation (post_id, category_id) VALUES (?,?)`
		_, err = d.db.Exec(stmt, id, cat_id)
		if err != nil {
			fmt.Println(err)
		}
	}
	if err != nil {
		return err
	}
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
