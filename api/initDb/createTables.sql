CREATE extension IF NOT EXISTS cube;
CREATE extension IF NOT EXISTS  earthdistance;
DROP TABLE IF EXISTS Users CASCADE;
DROP TABLE IF EXISTS Connections CASCADE;
DROP TABLE IF EXISTS History CASCADE;
DROP TABLE IF EXISTS Chat CASCADE;
DROP TABLE IF EXISTS Tags CASCADE;
DROP TABLE IF EXISTS User_Tags CASCADE;
DROP TABLE IF EXISTS Reports CASCADE;
DROP TABLE IF EXISTS User_Reports CASCADE;
DROP TABLE IF EXISTS Logs CASCADE;

DROP TYPE sexType CASCADE;
DROP TYPE preferences CASCADE;
DROP TYPE connectionType CASCADE;

CREATE TYPE sexType AS ENUM ('male', 'female');
CREATE TYPE preferences AS ENUM ('heterosexual', 'homosexual', 'bisexual');
CREATE TYPE connectionType AS ENUM ('like', 'ignore', 'unlike');

CREATE TABLE  Users (
    id SERIAL,
    nickName text NOT NULL,
    firstName text NOT NULL,
    lastName text NOT NULL,
    email text DEFAULT NULL,
    dateBirth date NOT NULL,
    password text NOT NULL,
    position point,
    confirm boolean DEFAULT FALSE,
    confirmHash text,
    remindHash text,
    remindTime timestamp,
    sexPreferences preferences DEFAULT 'bisexual', 
    sex sexType NOT NULL,
    rate int DEFAULT 500 CHECK (rate >= 0 AND rate <= 1000),
    about text DEFAULT 'About me...',
    photos text[3][3] DEFAULT ARRAY[['image/jpg','1.jpg'],['image/jpg','2.jpg'],['image/jpg','2.jpg']],
    location text[2],
    loggedStatus text DEFAULT 'Offline',
    lastVisit timestamp DEFAULT CURRENT_TIMESTAMP,
    created_at_user timestamp DEFAULT CURRENT_TIMESTAMP,
    count_reports int DEFAULT 0,
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
    type text DEFAULT 'message',
    path text,
    createdAt timestamp DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (idFrom) REFERENCES Users (id),
    FOREIGN KEY (idTo) REFERENCES Users (id)
);

CREATE TABLE Tags (
    id SERIAL,
    tag text,
    PRIMARY KEY (id)
);

CREATE TABLE User_Tags (
    idUser int,
    idTag int,
    PRIMARY KEY (idUser, idTag),
    FOREIGN KEY (idUser) REFERENCES Users (id),
    FOREIGN KEY (idTag) REFERENCES Tags (id)
);

CREATE TABLE Reports (
    id SERIAL,
    report text,
    PRIMARY KEY (id)
);

CREATE TABLE User_Reports (
    id SERIAL,
    idFrom int,
    idTo int,
    idReport int,
    message text,
    PRIMARY KEY (id),
    FOREIGN KEY (idFrom) REFERENCES Users (id),
    FOREIGN KEY (idTo) REFERENCES Users (id),
    FOREIGN KEY (idReport) REFERENCES Reports (id)
);

CREATE TABLE Logs (
    id SERIAL, 
    idFrom int,
    idTo int,
    event text,
    message text,
    viewed boolean DEFAULT false,
    time timestamp DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (idFrom) REFERENCES Users (id),
    FOREIGN KEY (idTo) REFERENCES Users (id)
);

CREATE OR REPLACE FUNCTION myId(login text) RETURNS integer 
AS 'SELECT id FROM Users WHERE nickName = $1' 
LANGUAGE SQL;

CREATE OR REPLACE FUNCTION mySex(login text) RETURNS sextype 
AS 'SELECT sex FROM Users WHERE id = myId($1)' 
LANGUAGE SQL;

CREATE OR REPLACE FUNCTION myPref(login text) RETURNS preferences 
AS 'SELECT sexpreferences FROM Users WHERE id = myId($1)' 
LANGUAGE SQL;

CREATE OR REPLACE FUNCTION myCity(login text) RETURNS text 
AS 'SELECT location[2] FROM Users WHERE nickName = $1' 
LANGUAGE SQL;

CREATE OR REPLACE FUNCTION myPosition(login text) RETURNS point 
AS 'SELECT position FROM Users WHERE nickName = $1' 
LANGUAGE SQL;

INSERT INTO Users (nickName, firstName, lastName, email, dateBirth, sex, sexPreferences,  password, location, position, confirm) VALUES
    ('rkina', 'Dima', 'Ng', 'd_ng@mail.ru', '1998-07-03', 'male', 'heterosexual', '$2b$10$xrxrxkFrvvB8Np2bbQw6D.T5NHHh9UZ4KG5b7jKUmNiFQBxPSihua' , ARRAY['Russia','Moscow'], point(55.751244,37.618423), TRUE),
    ('mgrass', 'nya', 'milk', 'nyamilk@yandex.ru', '1990-12-26', 'female', 'heterosexual', '$2b$10$xrxrxkFrvvB8Np2bbQw6D.T5NHHh9UZ4KG5b7jKUmNiFQBxPSihua' , ARRAY['Russia','Podolsk'], point(55.42277902267131, 37.53753662109376), TRUE);

INSERT INTO Connections (idFrom, idTo, status) VALUES
    ('1', '2', 'like'),
    ('2', '1', 'like');

INSERT INTO Tags (Tag) VALUES
    ('sport'),
    ('movie'),
    ('food'),
    ('art'),
    ('travel'),
    ('dance'),
    ('animal');

INSERT INTO User_Tags (idUser, idTag) VALUES 
    ('1', '1'),
    ('1', '3'),
    ('1', '4'),
    ('1', '7');

INSERT INTO Reports (report) VALUES
    ('pornography'),
    ('spam'),
    ('offensive behavior'),
    ('fraud'),
    ('fake');
