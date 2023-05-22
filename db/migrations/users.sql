CREATE TABLE users (
  user_id       INTEGER     PRIMARY KEY,
  email         TEXT        NOT NULL UNIQUE,
  nickname      TEXT        NOT NULL UNIQUE,
  age           INTEGER     NOT NULL,
  gender        TEXT        NOT NULL,
  first_name    TEXT        NOT NULL,
  last_name     TEXT        NOT NULL,
  password_hash BINARY(60)  NOT NULL,
  created_at    TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP
);