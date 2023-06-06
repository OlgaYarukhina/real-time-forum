CREATE TABLE categoryPostRelation (
    id          INTEGER PRIMARY KEY,
    post_id     INTEGER REFERENCES posts (post_id),
    category_id INTEGER REFERENCES categories (category_id)
);