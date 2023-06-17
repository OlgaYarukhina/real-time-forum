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
	var password string
	var id int

	err := d.db.QueryRow("SELECT user_id, password_hash FROM users WHERE email = ?", email).Scan(&id, &password)
	if err == sql.ErrNoRows {
		return id, password, err
	}
	return id, password, nil
}

func (d *Database) GetAllUsers(currentUserID int) ([]*entities.UserChatInfo, error) {
	stmt := `SELECT user_id, nickname FROM users`
	rows, err := d.db.Query(stmt)
	defer rows.Close()

	var users []*entities.UserChatInfo
	for rows.Next() {
		user := entities.UserChatInfo{}
		err = rows.Scan(&user.UserID, &user.Nickname)
		if err != nil {
			return nil, err
		}
		// check if them have unread message
		user.IsMessage, user.IsUnread = d.CheckIsUnread(currentUserID, user.UserID)
		if err != nil {
			return nil, err
		}

		users = append(users, &user)
	}
	return users, nil
}

//sessions

func (d *Database) SaveSession(session entities.Session) (int, error) {
	stmt := `INSERT INTO user_sessions (token, user_id, expire_at) VALUES(?, ?, ?)`
	result, err := d.db.Exec(stmt, session.Token, session.UserID, session.ExpireAt)
	if err != nil {
		return -1, err
	}
	sessionID, err := result.LastInsertId()
	if err != nil {
		return -1, err
	}
	return int(sessionID), nil
}

func (d *Database) RemoveSession(userId int) error {
	stmt := "DELETE FROM user_sessions WHERE user_id = ?"
	_, err := d.db.Exec(stmt, userId)
	if err != nil {
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
			return session, err
		}
		return session, err
	}

	return session, nil
}

// chat

func (d *Database) SaveMsg(message entities.Message) error {
	stmt := `INSERT INTO messages (sender_id, receiver_id, message_text, send_time)
    VALUES(?,?,?, current_date)`
	_, err := d.db.Exec(stmt, &message.SenderID, &message.ReceiverID, &message.Body, &message.SendTime)
	if err != nil {
		return err
	}
	return nil
}

func (d *Database) GetHistory(currentUser, user int) ([]entities.Message, error) {
	stmt := `SELECT sender_id, receiver_id, send_time, message_text FROM message WHERE receiver_id = ? AND sender_id = ? OR receiver_id = ? AND sender_id = ? ORDER BY created_at ASC LIMIT 200`
	rows, err := d.db.Query(stmt, currentUser, user, user, currentUser)
	defer rows.Close()

	var messages []entities.Message
	for rows.Next() {
		message := entities.Message{}
		err = rows.Scan(&message.SenderID, &message.ReceiverID, &message.SendTime, &message.Body)
		if err != nil {
			return nil, err
		}
		messages = append(messages, message)
	}
	return messages, nil
}

func (d *Database) CheckIsUnread(currentUser, user int) (bool, bool) {

	isUnreadCheck := 0
	isMessage := true
	var isUnread bool
	if err := d.db.QueryRow("SELECT is_read FROM messages WHERE receiver_id = ? AND sender_id = ?", currentUser, user).Scan(&isUnreadCheck); err != nil {
		if err == sql.ErrNoRows {
			isMessage = false
		} else {
			fmt.Println(err)
		}
	} else {
		if isUnreadCheck == 1 {
			isUnread = true
		} else {
			isUnread = false
		}
	}
	return isMessage, isUnread
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
		catId := &post.PostID
		post.Categories, err = d.getCategoryRelation(*catId)
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
	post.Categories, err = d.getCategoryRelation(postId.PostID)
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
		fmt.Println(cat_id)
		stmt := `INSERT INTO categoryPostRelation (post_id, category_id) VALUES (?,?)`
		_, err = d.db.Exec(stmt, id, cat_id)
		if err != nil {
			return err
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

	var comments []*entities.Comment
	for rows.Next() {
		comment := &entities.Comment{}
		err = rows.Scan(&comment.CommentID, &comment.Comment, &comment.PostID, &comment.UserID, &comment.CreatedAt)
		comment.Nickname = d.GetUserById(comment.UserID)
		if err != nil {
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
	if err := d.db.QueryRow("SELECT nickname from users WHERE user_id = ?", id).Scan(&nickname); err != nil {
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

func (d *Database) getCategoryRelation(postId int) ([]string, error) {
	stmt := `SELECT category_id FROM categoryPostRelation WHERE post_id = ?`
	var categoriesArr []string
	var categoryId int
	rows, err := d.db.Query(stmt, postId)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	for rows.Next() {
		err = rows.Scan(&categoryId)
		name, err := d.getNameOfCategoryById(categoryId)
		if err != nil {
			return nil, err
		}
		categoriesArr = append(categoriesArr, name)
	}
	return categoriesArr, nil
}

func (d *Database) getNameOfCategoryById(categoryId int) (string, error) {
	var category string
	if err := d.db.QueryRow("SELECT called FROM categories WHERE category_id = ?", categoryId).Scan(&category); err != nil {
		if err == sql.ErrNoRows {
			fmt.Println("Category was not found")
		} else {
			fmt.Println(err)
		}
	}
	return category, nil
}

// 	https://go.dev/tour/concurrency/9
