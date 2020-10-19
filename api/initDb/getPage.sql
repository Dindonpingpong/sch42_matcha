
SELECT nickName, firstName, lastName, rate FROM Users 
WHERE nickName !='test7' AND id !=( coalesce((SELECT  idTo FROM Connections WHERE idFrom=(SELECT id FROM Users WHERE nickName='test7') AND status='ignore'), 0)) AND location[3]='Podolsk';
-- LIMIT 3 OFFSET 0;

-- SELECT id, location[3] FROM Users WHERE nickName='rkina';

-- for api
-- SELECT nickName, firstName, lastName, rate FROM Users 
-- WHERE id !=(SELECT idTo FROM Connections
-- WHERE idFrom=5 AND status='ignore') AND location[3]='Moscow'
-- LIMIT 3 OFFSET 3;
