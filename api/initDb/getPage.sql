
-- SELECT nickName, firstName, lastName, rate, photos[1] FROM Users 
-- WHERE nickName !='test4' 
-- AND id !=( coalesce((SELECT  idTo FROM Connections WHERE idFrom=(SELECT id FROM Users WHERE nickName='test4') 
-- AND status='ignore'), 0)) AND location[3]=
-- (SELECT location[3] FROM Users WHERE nickName='test4');
-- LIMIT 3 OFFSET 1;
-- SELECT location[3] FROM Users WHERE nickName='test3'

-- SELECT id, location[3] FROM Users WHERE nickName='rkina';

-- for api
-- SELECT nickName, firstName, lastName, rate FROM Users 
-- WHERE id !=(SELECT idTo FROM Connections
-- WHERE idFrom=5 AND status='ignore') AND location[3]='Moscow'
-- LIMIT 3 OFFSET 3;
-- SELECT location[3] FROM Users WHERE nickName='test4';

UPDATE Users SET location[1] = 'Vietnam', location[2] = 'Hanoi', location[3] = 'Hanoi' WHERE nickName = 'rkina' RETURNING id;
SELECT location from Users;