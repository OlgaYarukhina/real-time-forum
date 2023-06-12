CREATE TABLE comments (
     id         INTEGER PRIMARY KEY,
     comment    TEXT    NOT NULL,
     post_id    INTEGER REFERENCES posts (post_id) ON DELETE CASCADE,
     user_id    INTEGER REFERENCES users (user_id) ON DELETE CASCADE,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
