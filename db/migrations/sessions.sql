CREATE TABLE user_sessions (
    id              INTEGER         PRIMARY KEY,
    token           BINARY(72)      NOT NULL,
    user_id         INTEGER         NOT NULL    REFERENCES users (id) ON DELETE CASCADE,
    expire_at       TIMESTAMP       DEFAULT     CURRENT_TIMESTAMP
);