CREATE TABLE posts (
  post_id     INTEGER   PRIMARY KEY,
  header      TEXT      NOT NULL,
  content     TEXT      NOT NULL,
  user_id     INTEGER   NOT NULL REFERENCES users (id) ON DELETE CASCADE,
  created_at  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);