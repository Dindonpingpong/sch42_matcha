-- SELECT u.id, u.nickName, c.status FROM Connections c 
-- RIGHT JOIN Users u ON u.id = c.idTo
-- WHERE u.id = 5;

-- SELECT u.id, u.nickName, c.status FROM Users u
-- LEFT JOIN Connections c ON c.idFrom = u.id
-- LEFT JOIN Connections d ON d.idTo = u.id;

-- SELECT a.nickName, b.nickName, status FROM Connections u
-- JOIN Users a ON u.idFrom = a.id
-- JOIN Users b ON u.idTo = b.id; 

-- SELECT idTo FROM Connections
-- WHERE idFrom=5 AND status='ignore';

SELECT nickName FROM Users 
WHERE id !=(SELECT idTo FROM Connections
WHERE idFrom=5 AND status='ignore')