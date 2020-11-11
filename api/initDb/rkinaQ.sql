-- SELECT distinct(location[3]) FROM Users WHERE location[3] IN ('Russia', 'Moscow', 'Podolsk');

-- UPDATE Users 
--   SET location = 'Viet', location[2] = 'Hanoi', position = point('25', '75')
--   WHERE nickName = 'mgrass' 
--   RETURNING id;

-- SELECT position <@> (SELECT position FROM Users WHERE nickName = 'test6') as distance 
-- from Users 
-- WHERE position <@> (SELECT position FROM Users WHERE nickName = 'test6') < 2500
-- AND nickName != 'test6' AND nickName = 'test4';


-- CREATE OR REPLACE FUNCTION myId(login text) RETURNS integer 
-- AS 'SELECT id FROM Users WHERE nickName = 'test6'' 
-- LANGUAGE SQL;

-- CREATE OR REPLACE FUNCTION mySex(login text) RETURNS sextype 
-- AS 'SELECT sex FROM Users WHERE id = myId('test6')' 
-- LANGUAGE SQL;

-- CREATE OR REPLACE FUNCTION myPref(login text) RETURNS preferences 
-- AS 'SELECT sexpreferences FROM Users WHERE id = myId('test6')' 
-- LANGUAGE SQL;

-- CREATE OR REPLACE FUNCTION myCity(login text) RETURNS text 
-- AS 'SELECT location[2] FROM Users WHERE nickName = 'test6'' 
-- LANGUAGE SQL;

-- CREATE OR REPLACE FUNCTION myPosition(login text) RETURNS point 
-- AS 'SELECT position FROM Users WHERE nickName = 'test6'' 
-- LANGUAGE SQL;

-- INSERT INTO Users (nickName, firstName, lastName, email, dateBirth, sex, password, location, position, confirm) VALUES
--     ('rkina123', 'Dima', 'Ng', 'd_nfdsag@mail.ru', '1998-07-03', 'male', ''male'b'rkina'0$QbsxNU1tXUDH4Q4e13U.tuEfs4PrGEsX8tFwCbqQqXxS8SRpwW1nW' , ARRAY['Russia','Moscow'], point(55.751244,37.618423), TRUE),
--     ('rkina12341', 'Dima', 'Ng', 'd_nfdsag@mail.ru', '1998-07-03', 'male', ''male'b'rkina'0$QbsxNU1tXUDH4Q4e13U.tuEfs4PrGEsX8tFwCbqQqXxS8SRpwW1nW' , ARRAY['Russia','Moscow'], point(55.751244,37.618423), TRUE)

INSERT INTO Logs (idFrom, idTo, event, message) VALUES
  (myId('rkina'), myId('mgrass'), 'message', 'kusmene'),
  (myId('mgrass'), myId('rkina'), 'message', 'kus:3'),
  (myId('rkina'), myId('mgrass'), 'like', 'liked you'),
  (myId('mgrass'), myId('rkina'), 'view', 'visited your profile'),
  (myId('rkina'), myId('mgrass'), 'ignore', 'ingored your profile');

SELECT 
  (SELECT nickname FROM Users WHERE id = l.idFrom), l.event, l.message, l.time
  FROM Logs AS l WHERE idTo = myId('mgrass');


SELECT idFrom, idTo, status FROM Connections WHERE idFrom = 4 AND idTo = 1 AND status = 'like';
SELECT idFrom, idTo, status FROM Connections WHERE idFrom = 1 AND idTo = 4 AND status = 'like';