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

SELECT u.nickName 
    FROM Users u JOIN Connections c ON u.id = c.idTo
    WHERE 
    c.idFrom = (SELECT id FROM Users WHERE nickName='rkina');


INSERT INTO Connections (idFrom, idTo, status) VALUES
    ('1', '3', 'like'),
    ('3', '1', 'like');

INSERT INTO Connections (idFrom, idTo, status) VALUES
    ('1', '2', 'like'),
    ('1', '7', 'like'),
    ('9', '1', 'like'),
    ('2', '1', 'like');

SELECT u.nickName, c.status 
    FROM Users u JOIN Connections c ON u.id = c.idTo
    WHERE 
    c.idFrom = (SELECT id FROM Users WHERE nickName='rkina');

SELECT COUNT(*) from 
(SELECT idTo as idFrom, idFrom as idTo,  status FROM Connections WHERE
idFrom = 1 AND status = 'like'
UNION ALL
SELECT idFrom, idTo, status FROM Connections WHERE
idTo = 1 AND status = 'like') tmp
HAVING count(*) > 1;

SELECT nickName FROM 
(SELECT (SELECT nickname FROM Users WHERE id = a.idFrom) as nickName, createdAt FROM Connections a
    WHERE exists 
    (SELECT * from Connections b
        WHERE 
        status = 'like' 
        AND a.idFrom = b.idTo 
        AND a.idTo = b.idFrom 
        AND (idFrom = myId('rkina') OR idTo = myId('rkina'))
    )
) as res
WHERE nickName != 'rkina'
ORDER BY createdAt DESC;

SELECT a.nickName, b.nickName, c.message, c.createdat, c.id, c.type FROM Chat c
  JOIN Users a ON a.id = c.idFrom
  JOIN Users b ON b.id = c.idTo
  WHERE (a.nickName = 'rkina' AND b.nickName = 'mgrass') OR (a.nickName = 'mgrass' AND b.nickName = 'rkina')
  ORDER BY createdAt DESC;