package database

import (
	"database/sql"
	"fmt"
	"real-time-forum/internal/domain/entities"
	"strconv"

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

func (d *Database) SaveSession(token string) error {
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

func (d *Database) GetPosts() ([]entities.Post, error)  {
	stmt := `SELECT * FROM posts ORDER BY created_at ASC LIMIT 200`
	rows, err := d.db.Query(stmt)
	defer rows.Close()
	var posts []entities.Post
	for rows.Next() {
		s := entities.Post{}
		err = rows.Scan(&s.PostID , &s.Title, &s.Content, &s.UserID, &s.CreatedAt)
		//s.Category_name, err = d.getCategoryRelation(&s.ID)
		//s.Like, s.Dislike, err = d.getCountLikesByPostId(&s.ID)
		if err != nil {
			return nil, err
		}
		posts = append(posts, s)
	}
	return posts, nil
}


func (d *Database) GetPost(postId entities.Post) (*entities.Post, error) {
	var post *entities.Post
	row := d.db.QueryRow(`SELECT * FROM post WHERE ID = ?`, postId.PostID)
	err := row.Scan(&post.PostID, &post.Title, &post.Content, post.UserID, post.CreatedAt)
	// post.Category_name, err = d.getCategoryRelation(postId.PostID)
	// post.Like, post.Dislike, err = d.getCountLikesByPostId(postId.PostID)
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
