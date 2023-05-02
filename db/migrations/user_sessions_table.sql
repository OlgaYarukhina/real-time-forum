CREATE TABLE user_sessions (
    session_id      VARCHAR(36)     NOT NULL    PRIMARY KEY,
    user_id         INTEGER             NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    user_agent      VARCHAR(255)    NOT NULL,
    created_at      TIMESTAMP       DEFAULT     CURRENT_TIMESTAMP
);