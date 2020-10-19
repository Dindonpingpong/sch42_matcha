-- send
-- INSERT INTO Chat (idFrom, idTo, message) VALUES
-- ( 
--     (SELECT id FROM Users WHERE nickName = 'rkina'),
--     (SELECT id FROM Users WHERE nickName = 'mgrass'),
--     'kusmene'
-- )

SELECT a.nickName, b.nickName, c.message FROM Chat c
JOIN Users a ON a.id = c.idFrom
JOIN Users b ON b.id = c.idTo
WHERE (a.nickName = 'rkina' AND b.nickName = 'mgrass') OR (a.nickName = 'mgrass' AND b.nickName = 'rkina')