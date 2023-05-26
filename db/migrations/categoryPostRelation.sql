CREATE TABLE categoryPostRelation (
    id          INTEGER PRIMARY KEY,
    post_id     INTEGER REFERENCES posts (id),
    category_id INTEGER REFERENCES categories (id)
);