package entities

import "time"

type Post struct {
	PostID       int       `json:"post_id"`
	Title        string    `json:"title"`
	Content      string    `json:"content"`
	Categories   []string  `json:"categories"`
	CreatedAt    time.Time `json:"created_at"`
	UserID       int   
	Likes        int
	Dislikes     int    
}
