
SELECT nickName, firstName, lastName, rate FROM Users 
WHERE id !=(SELECT idTo FROM Connections
WHERE idFrom=(SELECT id FROM Users WHERE nickName='test5') AND status='ignore') AND location[3]='Moscow'
LIMIT 3 OFFSET 3;

-- SELECT id, location[3] FROM Users WHERE nickName='rkina';

-- for api
-- SELECT nickName, firstName, lastName, rate FROM Users 
-- WHERE id !=(SELECT idTo FROM Connections
-- WHERE idFrom=$1 AND status='ignore') AND location[3]=$2
-- LIMIT 3 OFFSET $3;