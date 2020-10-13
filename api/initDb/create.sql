DROP TABLE IF EXISTS Users CASCADE;
DROP TABLE IF EXISTS Connections CASCADE;
DROP TABLE IF EXISTS History CASCADE;
DROP TABLE IF EXISTS Chat CASCADE;
DROP TYPE IF EXISTS sexType;
CREATE TYPE sexType AS ENUM ('male','female', 'prefer not to say');
DROP TYPE IF EXISTS preferences;
CREATE TYPE preferences AS ENUM ('heterosexual','homosexual', 'bisexual');
DROP TYPE IF EXISTS connectionType;
CREATE TYPE connectionType AS ENUM ('like','ignore');

CREATE TABLE  Users (
    id SERIAL,
    nickName text NOT NULL,
    firstName text NOT NULL,
    lastName text NOT NULL,
    email text DEFAULT NULL,
    dateBirth timestamp NOT NULL,
    password text NOT NULL,
    confirm boolean DEFAULT FALSE,
    sexPreferences preferences DEFAULT 'bisexual', 
    sex sexType NOT NULL DEFAULT 'prefer not to say',
    rate int DEFAULT 0,
    about text,
    photos text[5],
    location text[3],
    created_at_user timestamp DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);

CREATE TABLE Connections (
    id SERIAL,
    idFrom int,
    idTo int,
    createdAt timestamp DEFAULT CURRENT_TIMESTAMP,
    status connectionType,
    PRIMARY KEY (id),
    FOREIGN KEY (idFrom) REFERENCES Users (id),
    FOREIGN KEY (idTo) REFERENCES Users (id)
);

CREATE TABLE History (
    id SERIAL,
    idVisitor int,
    idVisited int,
    visiTime timestamp DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (idVisitor) REFERENCES Users (id),
    FOREIGN KEY (idVisited) REFERENCES Users (id)
);

CREATE TABLE Chat (
    id SERIAL,
    idFrom int,
    idTo int,
    message text,
    createdAt timestamp DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (idFrom) REFERENCES Users (id),
    FOREIGN KEY (idTo) REFERENCES Users (id)
);

-- INSERT INTO Users (nickName, firstName, lastName, email, )
