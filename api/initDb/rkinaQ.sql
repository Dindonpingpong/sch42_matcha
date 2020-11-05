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

SELECT * FROM (
     SELECT nickName, firstName, lastName, date_part('year', age(dateBirth::date)) AS age, rate, location[2] AS city, position <@> myPosition('rkina') as distance, photos[2], sex, sexpreferences, count_reports,
     (SELECT array_agg(t.tag) FROM Tags t JOIN User_Tags ut ON ut.idTag = t.id WHERE ut.idUser = Users.id) AS tags,
     (SELECT COUNT(u) - COUNT(DISTINCT u) FROM 
     (SELECT UNNEST (array_cat( 
     (SELECT array_agg(idTag) FROM User_Tags WHERE idUser = (SELECT id FROM Users WHERE nickName = 'rkina')),
     (SELECT array_agg(idTag) FROM User_Tags WHERE idUser = id))) AS u) t) count,
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
     WHERE nickName != 'rkina'
     AND id != (coalesce((SELECT idTo FROM Connections WHERE idFrom = (SELECT id FROM Users WHERE nickName = 'rkina') 
     AND status = 'ignore'), 0))
     AND count_reports < 3
     ORDER BY distance ASC, age ASC,  count DESC,  rate DESC
 ) t WHERE contact IS NOT NULL AND (sex = 'female' OR sex = 'male') AND age > 18 AND age < 120 AND rate > 0 AND rate < 1000 AND distance <= 450;