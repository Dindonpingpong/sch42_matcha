-- SELECT distinct(location[3]) FROM Users WHERE location[3] IN ('Russia', 'Moscow', 'Podolsk');

-- UPDATE Users 
--   SET location = 'Viet', location[2] = 'Hanoi', position = point('25', '75')
--   WHERE nickName = 'mgrass' 
--   RETURNING id;

SELECT position <@> (SELECT position FROM Users WHERE nickName = 'test6') as distance 
from Users 
WHERE position <@> (SELECT position FROM Users WHERE nickName = 'test6') < 2500
AND nickName != 'test6' AND nickName = 'test4';


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

SELECT * FROM (
    SELECT nickName, firstName, lastName, date_part('year', age(dateBirth::date)) AS age, rate, location[2] AS city, photos[2], position <@> myPosition('test6') as distance, 
    sex, sexpreferences,
    (SELECT array_agg(t.tag) FROM Tags t JOIN User_Tags ut ON ut.idTag = t.id WHERE ut.idUser = Users.id) AS tags,
    (SELECT COUNT(u) - COUNT(DISTINCT u) FROM
    (SELECT UNNEST (array_cat(
    (SELECT array_agg(idTag) FROM User_Tags WHERE idUser = (myId('test6'))),
    (SELECT array_agg(idTag) FROM User_Tags WHERE idUser = id))) AS u) t) count,
    CASE
    WHEN (sex = 'female' AND sexpreferences = 'heterosexual' OR sex = 'female' AND sexpreferences = 'bisexual')
        AND (mySex('test6') = 'male' AND myPref('test6') = 'heterosexual')
        THEN true
    WHEN (sex = 'male' AND sexpreferences = 'heterosexual' OR sex = 'male' AND sexpreferences = 'bisexual')
        AND (mySex('test6') = 'female' AND myPref('test6') = 'heterosexual')
        THEN true
    WHEN (sex = 'male' AND sexpreferences = 'homosexual' OR sex = 'male' AND sexpreferences = 'bisexual')
        AND (mySex('test6') = 'male' AND myPref('test6') = 'homosexual')
        THEN true
    WHEN (sex = 'female' AND sexpreferences = 'homosexual' OR sex = 'female' AND sexpreferences = 'bisexual')
        AND (mySex('test6') = 'female' AND myPref('test6') = 'homosexual')
        THEN true
    ELSE NULL
    END AS contact
    FROM Users
    WHERE nickName != 'test6'
    AND id != (coalesce((SELECT idTo FROM Connections WHERE idFrom = myId('test6')
    AND status = 'ignore'), 0))
    AND location[2] = myCity('test6')
    ORDER BY age ASC, count DESC, rate DESC
) t WHERE contact IS NOT NULL AND (sex = 'female' OR sex = 'male') AND age > 18 AND age < 120 AND rate > 0 AND rate < 1000 
    AND distance > 1000
     LIMIT 6;


SELECT * FROM (
    SELECT nickName, date_part('year', age(dateBirth::date)) AS age, rate, location[2] AS city, photos[1][2], position <@> myPosition('test6') as distance, sex, sexpreferences,
    (SELECT array_agg(t.tag) FROM Tags t JOIN User_Tags ut ON ut.idTag = t.id WHERE ut.idUser = Users.id) AS tags,  
    CASE
    WHEN (sex = 'female' AND sexpreferences = 'heterosexual' OR sex = 'female' AND sexpreferences = 'bisexual')     
        AND (mySex('test6') = 'male' AND myPref('test6') = 'heterosexual')
        THEN true
        WHEN (sex = 'male' AND sexpreferences = 'heterosexual' OR sex = 'male' AND sexpreferences = 'bisexual')     
        AND (mySex('test6') = 'female' AND myPref('test6') = 'heterosexual')
        THEN true
    WHEN (sex = 'male' AND sexpreferences = 'homosexual' OR sex = 'male' AND sexpreferences = 'bisexual')
        AND (mySex('test6') = 'male' AND myPref('test6') = 'homosexual')
        THEN true
    WHEN (sex = 'female' AND sexpreferences = 'homosexual' OR sex = 'female' AND sexpreferences = 'bisexual')       
        AND (mySex('test6') = 'female' AND myPref('test6') = 'homosexual')
        THEN true
    ELSE NULL
    END AS contact
    FROM Users
    WHERE nickName != 'test6'
    AND id != (coalesce((SELECT idTo FROM Connections WHERE idFrom = (SELECT id FROM Users WHERE nickName = 'test6')     
    AND status = 'ignore'), 0))
    AND location[2] = myCity('test6')
) t WHERE contact IS NOT NULL AND sex = 'female' AND age > 18 AND age < 120 AND rate > 0 AND rate < 1000 AND distance <= 2000;

SELECT * FROM (
    SELECT nickName, date_part('year', age(dateBirth::date)) AS age, rate, location[2] AS city, position <-> myPosition('test6') as distance, sex, sexpreferences,
    (SELECT array_agg(t.tag) FROM Tags t JOIN User_Tags ut ON ut.idTag = t.id WHERE ut.idUser = Users.id) AS tags,  
    CASE
    WHEN (sex = 'female' AND sexpreferences = 'heterosexual' OR sex = 'female' AND sexpreferences = 'bisexual')     
        AND ('male' = 'male' AND 'heterosexual' = 'heterosexual')
        THEN true
    WHEN (sex = 'male' AND sexpreferences = 'heterosexual' OR sex = 'male' AND sexpreferences = 'bisexual')
        AND ('male' = 'female' AND 'heterosexual' = 'heterosexual')
        THEN true
    WHEN (sex = 'male' AND sexpreferences = 'homosexual' OR sex = 'male' AND sexpreferences = 'bisexual')
        AND ('male' = 'male' AND 'heterosexual' = 'homosexual')
        THEN true
    WHEN (sex = 'female' AND sexpreferences = 'homosexual' OR sex = 'female' AND sexpreferences = 'bisexual')
        AND ('male' = 'female' AND 'heterosexual' = 'homosexual')
        THEN true
    ELSE NULL
    END AS contact
    FROM Users
    WHERE nickName != 'test6'
    AND id != (coalesce((SELECT idTo FROM Connections WHERE idFrom = (SELECT id FROM Users WHERE nickName = 'test6')
    AND status = 'ignore'), 0))
    AND location[2] = (SELECT location[2] FROM Users WHERE nickName = 'test6')
) t WHERE contact IS NOT NULL AND sex = 'female' AND age > 18 AND age < 120 AND rate > 0 AND rate < 1000;


  SELECT * FROM (
    SELECT nickName, date_part('year', age(dateBirth::date)) AS age, rate, location[2] AS city, sex, sexpreferences, position <-> myPosition('test6') as distance,
    (SELECT array_agg(t.tag) FROM Tags t JOIN User_Tags ut ON ut.idTag = t.id WHERE ut.idUser = Users.id) AS tags,
    CASE
    WHEN (sex = 'female' AND sexpreferences = 'heterosexual' OR sex = 'female' AND sexpreferences = 'bisexual')     
        AND ('male' = 'male' AND 'homosexual' = 'heterosexual')
        THEN true
    WHEN (sex = 'male' AND sexpreferences = 'heterosexual' OR sex = 'male' AND sexpreferences = 'bisexual')
        AND ('male' = 'female' AND 'homosexual' = 'heterosexual')
        THEN true
    WHEN (sex = 'male' AND sexpreferences = 'homosexual' OR sex = 'male' AND sexpreferences = 'bisexual')
        AND ('male' = 'male' AND 'homosexual' = 'homosexual')
        THEN true
    WHEN (sex = 'female' AND sexpreferences = 'homosexual' OR sex = 'female' AND sexpreferences = 'bisexual')
        AND ('male' = 'female' AND 'homosexual' = 'homosexual')
        THEN true
    ELSE NULL
    END AS contact
    FROM Users
    WHERE nickName != 'test6'
    AND id != (coalesce((SELECT idTo FROM Connections WHERE idFrom = (SELECT id FROM Users WHERE nickName = 'test6')
    AND status = 'ignore'), 0))
    AND location[2] = (SELECT location[2] FROM Users WHERE nickName = 'test6')
) t WHERE contact IS NOT NULL AND (sex = 'female' OR sex = 'male') AND age > 18 AND age < 120 AND rate > 0 AND rate < 1000 AND distance <= 2000;


SELECT * FROM (
    SELECT nickName, firstName, lastName, date_part('year', age(dateBirth::date)) AS age, rate, location[2] AS city, position <-> myPosition('test6') as distance, photos[1][2], sex, sexpreferences,      
    (SELECT array_agg(t.tag) FROM Tags t JOIN User_Tags ut ON ut.idTag = t.id WHERE ut.idUser = Users.id) AS tags,
    (SELECT COUNT(u) - COUNT(DISTINCT u) FROM
    (SELECT UNNEST (array_cat(
    (SELECT array_agg(idTag) FROM User_Tags WHERE idUser = (SELECT id FROM Users WHERE nickName = 'test6')),
    (SELECT array_agg(idTag) FROM User_Tags WHERE idUser = id))) AS u) t) count,
    CASE
    WHEN (sex = 'female' AND sexpreferences = 'heterosexual' OR sex = 'female' AND sexpreferences = 'bisexual')
        AND ('female' = 'male' AND 'heterosexual' = 'heterosexual')
        THEN true
    WHEN (sex = 'male' AND sexpreferences = 'heterosexual' OR sex 
= 'male' AND sexpreferences = 'bisexual')
        AND ('female' = 'female' AND 'heterosexual' = 'heterosexual')
        THEN true
    WHEN (sex = 'male' AND sexpreferences = 'homosexual' OR sex = 
'male' AND sexpreferences = 'bisexual')
        AND ('female' = 'male' AND 'heterosexual' = 'homosexual')
        THEN true
    WHEN (sex = 'female' AND sexpreferences = 'homosexual' OR sex 
= 'female' AND sexpreferences = 'bisexual')
        AND ('female' = 'female' AND 'heterosexual' = 'homosexual')
        THEN true
    ELSE NULL
    END AS contact
    FROM Users
    WHERE nickName != 'test6'
    AND id != (coalesce((SELECT idTo FROM Connections WHERE idFrom = (SELECT id FROM Users WHERE nickName = 'test6')
    AND status = 'ignore'), 0))
    AND location[2] = (SELECT location[2] FROM Users WHERE nickName = 'test6')
    ORDER BY distance DESC, age ASC, rate DESC, count DESC        
) t WHERE contact IS NOT NULL AND (sex = 'female' OR sex = 'male') AND age > 18 AND age < 120 AND rate > 0 AND rate < 1000 AND distance <= 700;