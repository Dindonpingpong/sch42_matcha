-- update Users set photos[2]='../img/1.jpg' where id=1;
-- SELECT u.id, u.nickName, u.dateBirth, u.photos[1], u.about FROM Users u JOIN History h ON u.id = h.idvisitor WHERE h.idvisited = (SELECT id FROM Users WHERE nickName = 'rkina');
-- INSERT INTO Connections (idFrom, idTo, status) VALUES ('4', '1', 'like');
SELECT u.nickName, date_part('year', age(u.dateBirth::date)) AS age, u.photos[1], u.about FROM Users u JOIN Connections c ON u.id = c.idFrom WHERE c.idTo = (SELECT id FROM Users WHERE nickName='rkina') AND status = 'like';