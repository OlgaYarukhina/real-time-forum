CREATE TABLE messages (
    id              INTEGER     PRIMARY KEY,
    sender_id       INTEGER     REFERENCES users (user_id) ON DELETE CASCADE,
    receiver_id     INTEGER     REFERENCES users (user_id) ON DELETE CASCADE,
    send_time       TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
    message_text    TEXT        NOT NULL,
    is_read         INTEGER     NOT NULL DEFAULT 0 CHECK(is_read IN (0,1))
);