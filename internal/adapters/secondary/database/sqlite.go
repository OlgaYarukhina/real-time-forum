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
		post := entities.Post{}
		err = rows.Scan(&post.PostID, &post.Title, &post.Content, &post.UserID, &post.CreatedAt)
		//s.Category_name, err = d.getCategoryRelation(&s.ID)
		if err != nil {
			return nil, err
		}
		posts = append(posts, post)
	}
	return posts, nil
}

func (d *Database) GetPost(postId entities.Post) (*entities.Post, error) {
	post := &entities.Post{}
	row := d.db.QueryRow(`SELECT * FROM posts WHERE post_id = ?`, postId.PostID)
	err := row.Scan(&post.PostID, &post.Title, &post.Content, &post.UserID, &post.CreatedAt)
	// post.Category_name, err = d.getCategoryRelation(postId.PostID)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, fmt.Errorf("Post not found")
		}
		return nil, err
	}
	return post, nil
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

func (d *Database) GetComments(postId entities.Post) ([]*entities.Comment, error) {
	stmt := `SELECT * FROM comments WHERE post_id = ? ORDER BY created_at ASC LIMIT 200`
	rows, err := d.db.Query(stmt, postId.PostID)
	if err != nil {
		fmt.Println("Here1")
		return nil, err
	}
	defer rows.Close()

	var comments [] *entities.Comment
	for rows.Next() {
		comment := &entities.Comment{}
		err = rows.Scan(&comment.CommentID, &comment.Comment, &comment.PostID, &comment.UserID, &comment.CreatedAt)
		comment.Nickname = d.GetUserById(comment.UserID)
		if err != nil {
			fmt.Println("Here2")
			return nil, err
		}
		comments = append(comments, comment)
	}
	if err = rows.Err(); err != nil {
		fmt.Println("Here3")
		return nil, err
	}
	return comments, nil
}

func (d *Database) GetUserById(id int) string {
	var nickname string
	if err := d.db.QueryRow("SELECT nickname from users where user_id = ?", id).Scan(&nickname); err != nil {
		if err == sql.ErrNoRows {
			fmt.Println(err)
		}
		fmt.Println(err)
	}
	return nickname
}

func (d *Database) SaveComment(comment entities.Comment) error {
	stmt := `INSERT INTO comments (comment, post_id, user_id, created_at)
    VALUES(?,?,?, current_date)`
	_, err := d.db.Exec(stmt, comment.Comment, comment.PostID, comment.UserID, comment.CreatedAt)
	if err != nil {
		return err
	}
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
