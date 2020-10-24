-- update Users set photos[2]='../img/1.jpg' where id=1;
-- SELECT u.id, u.nickName, u.dateBirth, u.photos[1], u.about FROM Users u JOIN History h ON u.id = h.idvisitor WHERE h.idvisited = (SELECT id FROM Users WHERE nickName = 'rkina');
-- INSERT INTO Connections (idFrom, idTo, status) VALUES ('4', '1', 'like');
-- SELECT u.nickName, date_part('year', age(u.dateBirth::date)) AS age, u.photos[1], u.about FROM Users u JOIN Connections c ON u.id = c.idFrom WHERE c.idTo = (SELECT id FROM Users WHERE nickName='rkina') AND status = 'like';
-- SELECT status FROM Connections WHERE idFrom = 2 AND idTo = 1;
-- SELECT status FROM Connections WHERE idFrom = (SELECT id FROM Users WHERE nickName = 'test4') AND idTo = (SELECT id FROM Users WHERE nickName = 'rkina');
-- SELECT status FROM Connections WHERE idFrom = (SELECT id FROM Users WHERE nickName = 'test4') AND idTo = (SELECT id FROM Users WHERE nickName = 'test4') OR false;
-- UPDATE Connections SET status = 'like' WHERE idFrom = (SELECT id FROM Users WHERE nickName = 'test4') AND idTo = (SELECT id FROM Users WHERE nickName = 'test5') RETURNING id;
-- INSERT INTO Connections (idFrom, idTo, status) VALUES ((SELECT id FROM Users WHERE nickName = 'test4'), (SELECT id FROM Users WHERE nickName = 'test6'), 'like');
-- INSERT INTO Connections (idFrom, idTo, status) VALUES ((SELECT id FROM Users WHERE nickName = 'test4'), (SELECT id FROM Users WHERE nickName = 'test7'), 'like') RETURNING id;

-- SELECT u.id, u.nickName, u.dateBirth, u.photos[1], u.about FROM Users u JOIN History h ON u.id = h.idvisitor WHERE h.idvisited = (SELECT id FROM Users WHERE nickName = 'rkina');
-- SELECT u.nickName, date_part('year', age(u.dateBirth::date)) AS age, u.photos[1], u.about FROM Users u JOIN Connections c ON u.id = c.idFrom WHERE c.idTo = (SELECT id FROM Users WHERE nickName='test4') AND status = 'like' ORDER BY c.createdAt DESC;

SELECT h.visiTime FROM History h
JOIN Users u ON u.id = h.idvisitor
WHERE h.idvisitor = (SELECT id FROM Users WHERE nickName = 'mgrass') AND h.idvisited = (SELECT id FROM Users WHERE nickName = 'rkina');

SELECT visiTime FROM History WHERE idvisitor = (SELECT id FROM Users WHERE nickName = 'mgrass') AND idvisited = (SELECT id FROM Users WHERE nickName = 'rkina');

INSERT INTO History (idVisitor, idVisited, visiTime) VALUES ((SELECT id FROM Users WHERE nickName = 'rkina'), (SELECT id FROM Users WHERE nickName = 'test4'), CURRENT_TIMESTAMP) RETURNING id;
UPDATE History SET visiTime = CURRENT_TIMESTAMP WHERE idVisitor = (SELECT id FROM Users WHERE nickName = 'rkina') AND idVisited = (SELECT id FROM Users WHERE nickName = 'test4') RETURNING id;

SELECT firstName, (SELECT array_agg(t.tag) FROM Tags t JOIN User_Tags ut ON ut.idTag = t.id WHERE ut.idUser = (SELECT id FROM Users WHERE nickName = 'rkina')) AS tags FROM Users WHERE nickName='rkina';

SELECT u.nickName, u.firstName, u.lastName FROM Users u JOIN WHERE u.nickName='rkina';

SELECT array_agg(t.tag) FROM Tags t JOIN User_Tags ut ON ut.idTag = t.id WHERE ut.idUser = (SELECT id FROM Users WHERE nickName = 'rkina');

SELECT nickName, firstName, lastName, email, date_part('year', age(dateBirth::date)) AS age, sexPreferences, sex, rate, about, photos, location[1] AS country, location[3] AS city,
(SELECT array_agg(t.tag) FROM Tags t JOIN User_Tags ut ON ut.idTag = t.id WHERE ut.idUser = (SELECT id FROM Users WHERE nickName = $1)) AS tags
FROM Users WHERE nickName=$1

SELECT nickName, firstName, lastName, email, date_part('year', age(dateBirth::date)) AS age, sexPreferences, sex, rate, about, photos, location[1] AS country, location[3] AS city,
(SELECT array_agg(t.tag) FROM Tags t JOIN User_Tags ut ON ut.idTag = t.id WHERE ut.idUser = (SELECT id FROM Users WHERE nickName = 'rkina')) AS tags
FROM Users WHERE nickName='rkina';