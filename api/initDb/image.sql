-- UPDATE Users SET photos[1][1] = 'image/png', photos[1][2] = 'src/here.png' WHERE nickName = 'rkina' RETURNING id;
-- SELECT photos from USERS;

SELECT id, nickName, lastName from Users;
UPDATE Users SET nickName = 'rkina2', lastName = 'wow' WHERE nickName = 'rkina';
SELECT id, nickName, lastName from Users;
