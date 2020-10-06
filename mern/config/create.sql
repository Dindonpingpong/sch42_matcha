DROP TABLE IF EXISTS Users;
DROP TYPE IF EXISTS sexEnum;
CREATE TYPE sexEnum AS ENUM ('male','female', 'prefer not to say');
CREATE TABLE IF NOT EXISTS Users (
    user_id SERIAL,
    firstName text NOT NULL,
    lastName text NOT NULL,
    email text DEFAULT NULL,
    password text NOT NULL,
    sex sexEnum NOT NULL DEFAULT 'prefer not to say',
    about text,
    created_at_user timestamp DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id)
);

