-- UPDATE Users SET photos[1][1] = 'image/png', photos[1][2] = 'src/here.png' WHERE nickName = 'rkina' RETURNING id;
-- SELECT photos from USERS;

SELECT id, nickName, lastName from Users;
UPDATE Users SET nickName = 'rkina2', lastName = 'wow' WHERE nickName = 'rkina';
SELECT id, nickName, lastName from Users;

DELETE FROM User_Tags WHERE idUser = (SELECT id FROM Users WHERE nickName='rkina') RETURNING idUser;

INSERT INTO User_Tags (idUser, idTag) VALUES
((SELECT id FROM Users WHERE nickName='rkina'), (SELECT id FROM Tags WHERE tag = 'food')),
((SELECT id FROM Users WHERE nickName='rkina'), (SELECT id FROM Tags WHERE tag = 'sport'));

SELECT id FROM Tags WHERE tag IN (SELECT unnest(array['movie','sport']));

INSERT INTO User_Tags
(idTag, idUser) 
    SELECT id, (SELECT id FROM Users WHERE nickName='rkina') FROM Tags WHERE tag IN (SELECT unnest(array['movie','sport']));

