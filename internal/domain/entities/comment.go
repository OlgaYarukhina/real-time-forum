package entities

import "time"

type Comment struct {
	CommentID    int       `json:"comment_id"`
	Comment      string    `json:"comment"`
	CreatedAt    time.Time `json:"created_at"`
	UserID       int  
	Nickname     string    `json:"nickname"`
	PostID       int  
	    
}
