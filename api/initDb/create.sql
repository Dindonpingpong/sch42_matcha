create extension cube;
CREATE extension earthdistance;
DROP TABLE IF EXISTS Users CASCADE;
DROP TABLE IF EXISTS Connections CASCADE;
DROP TABLE IF EXISTS History CASCADE;
DROP TABLE IF EXISTS Chat CASCADE;
DROP TABLE IF EXISTS Tags CASCADE;
DROP TABLE IF EXISTS User_Tags CASCADE;
DROP TABLE IF EXISTS Reports CASCADE;
DROP TABLE IF EXISTS Report_Type CASCADE;
DROP TABLE IF EXISTS User_Reports CASCADE;
DROP TYPE IF EXISTS sexType;
CREATE TYPE sexType AS ENUM ('male', 'female');
DROP TYPE IF EXISTS preferences;
CREATE TYPE preferences AS ENUM ('heterosexual', 'homosexual', 'bisexual');
DROP TYPE IF EXISTS connectionType;
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
    -- photos text[3][3] DEFAULT ARRAY[['image/jpg','1.jpg'],['image/svg','photo.svg'],['image/svg','photo.svg']],
    photos text[3][3] DEFAULT ARRAY[['image/jpg','1.jpg'],['image/jpg','1.jpg'],['image/jpg','1.jpg']],
    location text[2],
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
    type text,
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

INSERT INTO Users (nickName, firstName, lastName, email, dateBirth, sex, password, location, position, confirm) VALUES
    ('rkina', 'Dima', 'Ng', 'd_ng@mail.ru', '1998-07-03', 'male', '$2b$10$QbsxNU1tXUDH4Q4e13U.tuEfs4PrGEsX8tFwCbqQqXxS8SRpwW1nW' , ARRAY['Russia','Moscow'], point(55.751244,37.618423), TRUE),
    ('mgrass', 'nya', 'milk', 'nyamilk@yandex.ru', '1990-12-26', 'female', '$2b$10$9jPn1ZpuXtOCA3dmO4gkeuj5749pfppkjd4jb.jbKKrrZ38S08rLu' , ARRAY['Russia','Podolsk'], point(55.751244,37.618423), TRUE),
    ('kusmene', 'kus', 'mene', 'kus@mene.ru', '1995-02-23', 'male', '$2b$10$QbsxNU1tXUDH4Q4e13U.tuEfs4PrGEsX8tFwCbqQqXxS8SRpwW1nW' , ARRAY['Russia','Moscow'], point(55.751244,37.618423), TRUE),
    ('test4', 'test4', 'test4', 'test4@test4.ru', '1990-02-23', 'female', '$2b$10$QbsxNU1tXUDH4Q4e13U.tuEfs4PrGEsX8tFwCbqQqXxS8SRpwW1nW' , ARRAY['Russia','Moscow'], point(55.751244,37.618423), TRUE),
    ('test5', 'test5', 'test5', 'test5@test5.ru', '1985-02-23', 'male', '$2b$10$QbsxNU1tXUDH4Q4e13U.tuEfs4PrGEsX8tFwCbqQqXxS8SRpwW1nW' , ARRAY['Russia','Moscow'], point(55.751244,37.618423), TRUE),
    ('test6', 'test6', 'test6', 'test6@test6.ru', '1980-02-23', 'male', '$2b$10$QbsxNU1tXUDH4Q4e13U.tuEfs4PrGEsX8tFwCbqQqXxS8SRpwW1nW' , ARRAY['Russia','Moscow'], point(55.751244,37.618423), TRUE),
    ('test7', 'test7', 'test7', 'test7@test7.ru', '1975-02-23', 'female', '$2b$10$QbsxNU1tXUDH4Q4e13U.tuEfs4PrGEsX8tFwCbqQqXxS8SRpwW1nW' , ARRAY['Russia','Troitsk'], point(55.751244,37.618423), TRUE),
    ('test8', 'test8', 'test8', 'test8@test8.ru', '1965-02-23', 'male', '$2b$10$QbsxNU1tXUDH4Q4e13U.tuEfs4PrGEsX8tFwCbqQqXxS8SRpwW1nW' , ARRAY['Russia','Moscow'], point(55.751244,37.618423), TRUE),
    ('test9', 'test9', 'test9', 'test9@test8.ru', '1965-02-23', 'male', '$2b$10$QbsxNU1tXUDH4Q4e13U.tuEfs4PrGEsX8tFwCbqQqXxS8SRpwW1nW' , ARRAY['Russia','Moscow'], point(55.751244,37.618423), TRUE),
    ('test10', 'test10', 'test10', 'test10@test5.ru', '1985-02-23', 'female', '$2b$10$QbsxNU1tXUDH4Q4e13U.tuEfs4PrGEsX8tFwCbqQqXxS8SRpwW1nW' , ARRAY['Russia','Moscow'], point(55.751244,37.618423), TRUE),
    ('test11', 'test11', 'test11', 'test11@test6.ru', '1980-02-23', 'male', '$2b$10$QbsxNU1tXUDH4Q4e13U.tuEfs4PrGEsX8tFwCbqQqXxS8SRpwW1nW' , ARRAY['Russia','Moscow'], point(55.751244,37.618423), TRUE),
    ('test12', 'test12', 'test12', 'test12@test7.ru', '1975-02-23', 'female', '$2b$10$QbsxNU1tXUDH4Q4e13U.tuEfs4PrGEsX8tFwCbqQqXxS8SRpwW1nW' , ARRAY['Russia','Moscow'], point(55.751244,37.618423), TRUE),
    ('test13', 'test13', 'test13', 'test13@test8.ru', '1965-02-23', 'female', '$2b$10$QbsxNU1tXUDH4Q4e13U.tuEfs4PrGEsX8tFwCbqQqXxS8SRpwW1nW' , ARRAY['Russia','Podolsk'], point(55.751244,37.618423), TRUE);

UPDATE Users SET sexPreferences = 'heterosexual' WHERE id IN (1, 2, 4);
UPDATE Users SET sexPreferences = 'heterosexual' WHERE id = 14;
UPDATE Users SET sexPreferences = 'homosexual' WHERE id IN (3, 5, 6);

UPDATE Users SET confirm = true WHERE id IN (1, 2, 3, 5, 7);

-- UPDATE Users SET sex = 'male' WHERE id IN (1, 3, 4);
-- UPDATE Users SET sex = 'male' WHERE id = 14;
-- UPDATE Users SET sex = 'female' WHERE id IN (2, 6, 7);

UPDATE Users SET about = 'About me... test...' WHERE id IN (1, 2, 5);

-- UPDATE Users SET photos = ARRAY['../img/1.jpg','../img/photo.svg','../img/1.jpg','../img/1.jpg','../img/2.jpg'] WHERE id IN (1, 5);
-- UPDATE Users SET photos[1] = '../img/1.jpg', photos[2] = '../img/1.jpg', photos[3] = '../img/1.jpg', photos[4] = '../img/1.jpg' WHERE id IN (2);

INSERT INTO Connections (idFrom, idTo, status) VALUES
    ('4', '1', 'like'),
    ('4', '6', 'like'),
    ('6', '4', 'like'),
    ('5', '7', 'ignore'),
    ('7', '5', 'like'),
    ('5', '6', 'like'),
    ('8', '7', 'like'),
    ('7', '2', 'ignore');

INSERT INTO History (idVisitor, idVisited) VALUES
    ('4', '1'),
    ('2', '1'),
    ('4', '5'),
    ('4', '6'),
    ('5', '7'),
    ('6', '7'),
    ('7', '8');

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

INSERT INTO User_Tags (idUser, idTag) VALUES 
    ('3', '2'),
    ('3', '4'),
    ('3', '5');

INSERT INTO Tags (Tag) VALUES
    ('pornography'),
    ('spam'),
    ('offensive behavior'),
    ('fraud');


INSERT INTO User_Tags (idUser, idTag) VALUES 
    ('8', '2'),
    ('9', '2'),
    ('11', '2');

INSERT INTO Users (nickName, firstName, lastName, email, dateBirth, sex, password, location) VALUES
    ('test14', 'Dima', 'Ng', 'd_ng@meail.ru', '1998-07-03', 'male', '$2b$10$QbsxNU1tXUDH4Q4e13U.tuEfs4PrGEsX8tFwCbqQqXxS8SRpwW1nW' , ARRAY['Russia','Moscow','Podolsk']);

INSERT INTO User_Tags (idUser, idTag) VALUES 
    ('14', '2');

INSERT INTO Reports (report) VALUES
    ('pornography'),
    ('spam'),
    ('offensive behavior'),
    ('fraud');

UPDATE Users SET rate = 499 WHERE id = 14;
UPDATE Users SET rate = 99 WHERE id = 3;
UPDATE Users SET rate = 150 WHERE id = 5;
UPDATE Users SET rate = 502 WHERE id = 11;
UPDATE Users SET rate = 502 WHERE id = 8;