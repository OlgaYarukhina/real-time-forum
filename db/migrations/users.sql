CREATE TABLE users (
  user_id       INTEGER     PRIMARY KEY,
  nickname      TEXT        NOT NULL UNIQUE,
  age           INTEGER     NOT NULL CHECK (age > 0),
  gender        TEXT        NOT NULL CHECK (gender IN ('M', 'F', 'O')),
  first_name    TEXT        NOT NULL,
  last_name     TEXT        NOT NULL,
  email         TEXT        NOT NULL UNIQUE,
  password_hash BINARY(60)  NOT NULL,
  created_at    TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP
);