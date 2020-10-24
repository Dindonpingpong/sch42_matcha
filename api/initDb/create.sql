DROP TABLE IF EXISTS Users CASCADE;
DROP TABLE IF EXISTS Connections CASCADE;
DROP TABLE IF EXISTS History CASCADE;
DROP TABLE IF EXISTS Chat CASCADE;
DROP TABLE IF EXISTS Tags CASCADE;
DROP TABLE IF EXISTS Tags_Users CASCADE;
DROP TYPE IF EXISTS sexType;
CREATE TYPE sexType AS ENUM ('male', 'female', 'prefer not to say');
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
    confirm boolean DEFAULT FALSE,
    sexPreferences preferences DEFAULT 'bisexual', 
    sex sexType NOT NULL DEFAULT 'prefer not to say',
    rate int DEFAULT 0,
    about text DEFAULT 'About me...',
    -- photos text[3][3] DEFAULT ARRAY[['image/jpg','1.jpg'],['image/svg','photo.svg'],['image/svg','photo.svg']],
    photos text[3][3] DEFAULT ARRAY[['image/jpg','1.jpg'],['image/jpg','1.jpg'],['image/jpg','1.jpg']],
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

CREATE TABLE Tags (
    id SERIAL,
    tag text,
    PRIMARY KEY (id)
);

CREATE TABLE User_Tags (
    idUser int,
    idTag int,
    FOREIGN KEY (idUser) REFERENCES Users (id),
    FOREIGN KEY (idTag) REFERENCES Tags (id)
);

INSERT INTO Users (nickName, firstName, lastName, email, dateBirth, password, location) VALUES
    ('rkina', 'Dima', 'Ng', 'd_ng@mail.ru', '1998-07-03', '$2b$10$QbsxNU1tXUDH4Q4e13U.tuEfs4PrGEsX8tFwCbqQqXxS8SRpwW1nW' , ARRAY['Russia','Moscow','Moscow']),
    ('mgrass', 'nya', 'milk', 'nyamilk@yandex.ru', '1990-12-26', '$2b$10$9jPn1ZpuXtOCA3dmO4gkeuj5749pfppkjd4jb.jbKKrrZ38S08rLu' , ARRAY['Russia','Moscow','Podolsk']),
    ('kusmene', 'kus', 'mene', 'kus@mene.ru', '1995-02-23', '$2b$10$QbsxNU1tXUDH4Q4e13U.tuEfs4PrGEsX8tFwCbqQqXxS8SRpwW1nW' , ARRAY['Russia','Moscow','Moscow']),
    ('test4', 'test4', 'test4', 'test4@test4.ru', '1990-02-23', '$2b$10$QbsxNU1tXUDH4Q4e13U.tuEfs4PrGEsX8tFwCbqQqXxS8SRpwW1nW' , ARRAY['Russia','Moscow','Moscow']),
    ('test5', 'test5', 'test5', 'test5@test5.ru', '1985-02-23', '$2b$10$QbsxNU1tXUDH4Q4e13U.tuEfs4PrGEsX8tFwCbqQqXxS8SRpwW1nW' , ARRAY['Russia','Moscow','Moscow']),
    ('test6', 'test6', 'test6', 'test6@test6.ru', '1980-02-23', '$2b$10$QbsxNU1tXUDH4Q4e13U.tuEfs4PrGEsX8tFwCbqQqXxS8SRpwW1nW' , ARRAY['Russia','Moscow','Moscow']),
    ('test7', 'test7', 'test7', 'test7@test7.ru', '1975-02-23', '$2b$10$QbsxNU1tXUDH4Q4e13U.tuEfs4PrGEsX8tFwCbqQqXxS8SRpwW1nW' , ARRAY['Russia','Moscow','Troitsk']),
    ('test8', 'test8', 'test8', 'test8@test8.ru', '1965-02-23', '$2b$10$QbsxNU1tXUDH4Q4e13U.tuEfs4PrGEsX8tFwCbqQqXxS8SRpwW1nW' , ARRAY['Russia','Moscow','Moscow']),
    ('test9', 'test9', 'test9', 'test8@test8.ru', '1965-02-23', '$2b$10$QbsxNU1tXUDH4Q4e13U.tuEfs4PrGEsX8tFwCbqQqXxS8SRpwW1nW' , ARRAY['Russia','Moscow','Moscow']),
    ('test10', 'test10', 'test10', 'test5@test5.ru', '1985-02-23', '$2b$10$QbsxNU1tXUDH4Q4e13U.tuEfs4PrGEsX8tFwCbqQqXxS8SRpwW1nW' , ARRAY['Russia','Moscow','Moscow']),
    ('test11', 'test11', 'test11', 'test6@test6.ru', '1980-02-23', '$2b$10$QbsxNU1tXUDH4Q4e13U.tuEfs4PrGEsX8tFwCbqQqXxS8SRpwW1nW' , ARRAY['Russia','Moscow','Moscow']),
    ('test12', 'test12', 'test12', 'test7@test7.ru', '1975-02-23', '$2b$10$QbsxNU1tXUDH4Q4e13U.tuEfs4PrGEsX8tFwCbqQqXxS8SRpwW1nW' , ARRAY['Russia','Moscow','Moscow']),
    ('test13', 'test13', 'test13', 'test8@test8.ru', '1965-02-23', '$2b$10$QbsxNU1tXUDH4Q4e13U.tuEfs4PrGEsX8tFwCbqQqXxS8SRpwW1nW' , ARRAY['Russia','Moscow','Moscow']);

UPDATE Users SET sexPreferences = 'heterosexual' WHERE id IN (1, 2, 4);
UPDATE Users SET sexPreferences = 'homosexual' WHERE id IN (3, 5, 6);

UPDATE Users SET confirm = true WHERE id IN (1, 2, 3, 5, 7);

UPDATE Users SET sex = 'male' WHERE id IN (1, 3, 4);
UPDATE Users SET sex = 'female' WHERE id IN (2, 6, 7);

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