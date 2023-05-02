CREATE TABLE comments (
     id         INTEGER PRIMARY KEY,
     comment    TEXT    NOT NULL,
     post_id    INTEGER REFERENCES post (id) ON DELETE CASCADE,
     user_id    INTEGER REFERENCES user (id) ON DELETE CASCADE,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
