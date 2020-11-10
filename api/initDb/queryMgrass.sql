-- update Users set photos[2]='../img/1.jpg' where id=1;
-- SELECT u.id, u.nickName, u.dateBirth, u.photos[1], u.about FROM Users u JOIN History h ON u.id = h.idvisitor WHERE h.idvisited = (SELECT id FROM Users WHERE nickName = 'rkina');
-- INSERT INTO Connections (idFrom, idTo, status) VALUES ('4', '1', 'like');
-- SELECT u.nickName, date_part('year', age(u.dateBirth::date)) AS age, u.photos[1], u.about FROM Users u JOIN Connections c ON u.id = c.idFrom WHERE c.idTo = (SELECT id FROM Users WHERE nickName='rkina') AND status = 'like';
-- SELECT status FROM Connections WHERE idFrom = 2 AND idTo = 1;
-- SELECT status FROM Connections WHERE idFrom = (SELECT id FROM Users WHERE nickName = 'test4') AND idTo = (SELECT id FROM Users WHERE nickName = 'rkina');
-- SELECT status FROM Connections WHERE idFrom = (SELECT id FROM Users WHERE nickName = 'test4') AND idTo = (SELECT id FROM Users WHERE nickName = 'test4') OR false;
-- UPDATE Connections SET status = 'like' WHERE idFrom = (SELECT id FROM Users WHERE nickName = 'test4') AND idTo = (SELECT id FROM Users WHERE nickName = 'test5') RETURNING id;
-- INSERT INTO Connections (idFrom, idTo, status) VALUES ((SELECT id FROM Users WHERE nickName = 'test4'), (SELECT id FROM Users WHERE nickName = 'mgrass'), 'like');
-- INSERT INTO Connections (idFrom, idTo, status) VALUES ((SELECT id FROM Users WHERE nickName = 'test4'), (SELECT id FROM Users WHERE nickName = 'test7'), 'like') RETURNING id;

-- SELECT u.id, u.nickName, u.dateBirth, u.photos[1], u.about FROM Users u JOIN History h ON u.id = h.idvisitor WHERE h.idvisited = (SELECT id FROM Users WHERE nickName = 'rkina');
-- SELECT u.nickName, date_part('year', age(u.dateBirth::date)) AS age, u.photos[1], u.about FROM Users u JOIN Connections c ON u.id = c.idFrom WHERE c.idTo = (SELECT id FROM Users WHERE nickName='test4') AND status = 'like' ORDER BY c.createdAt DESC;

-- SELECT h.visiTime FROM History h
-- JOIN Users u ON u.id = h.idvisitor
-- WHERE h.idvisitor = (SELECT id FROM Users WHERE nickName = 'mgrass') AND h.idvisited = (SELECT id FROM Users WHERE nickName = 'rkina');

-- SELECT visiTime FROM History WHERE idvisitor = (SELECT id FROM Users WHERE nickName = 'mgrass') AND idvisited = (SELECT id FROM Users WHERE nickName = 'rkina');

-- INSERT INTO History (idVisitor, idVisited, visiTime) VALUES ((SELECT id FROM Users WHERE nickName = 'rkina'), (SELECT id FROM Users WHERE nickName = 'test4'), CURRENT_TIMESTAMP) RETURNING id;
-- UPDATE History SET visiTime = CURRENT_TIMESTAMP WHERE idVisitor = (SELECT id FROM Users WHERE nickName = 'rkina') AND idVisited = (SELECT id FROM Users WHERE nickName = 'test4') RETURNING id;

-- SELECT firstName, (SELECT array_agg(t.tag) FROM Tags t JOIN User_Tags ut ON ut.idTag = t.id WHERE ut.idUser = (SELECT id FROM Users WHERE nickName = 'rkina')) AS tags FROM Users WHERE nickName='rkina';

-- SELECT u.nickName, u.firstName, u.lastName FROM Users u JOIN WHERE u.nickName='rkina';

-- SELECT array_agg(t.tag) FROM Tags t JOIN User_Tags ut ON ut.idTag = t.id WHERE ut.idUser = (SELECT id FROM Users WHERE nickName = 'rkina');

-- SELECT nickName, firstName, lastName, email, date_part('year', age(dateBirth::date)) AS age, sexPreferences, sex, rate, about, photos, location[1] AS country, location[3] AS city,
-- (SELECT array_agg(t.tag) FROM Tags t JOIN User_Tags ut ON ut.idTag = t.id WHERE ut.idUser = (SELECT id FROM Users WHERE nickName = $1)) AS tags
-- FROM Users WHERE nickName=$1

-- SELECT nickName, firstName, lastName, email, date_part('year', age(dateBirth::date)) AS age, sexPreferences, sex, rate, about, photos, location[1] AS country, location[3] AS city,
-- (SELECT array_agg(t.tag) FROM Tags t JOIN User_Tags ut ON ut.idTag = t.id WHERE ut.idUser = (SELECT id FROM Users WHERE nickName = 'rkina')) AS tags
-- FROM Users WHERE nickName='rkina';

-- 24/10 
-- UPDATE Users SET nickName = 'test44', firstName = 'test44', lastName = 'test44', dateBirth = '1990-02-23', email = 'test44@test4.ru', about = 'test',
-- sex = 'male', sexPreferences = 'heterosexual' WHERE id = (SELECT id FROM Users WHERE nickName = 'test4');


-- SELECT nickName, firstName, date_part('year', age(dateBirth::date)) AS age, rate, sex, sexPreferences, location[2] as region, location[3] as city, photos[1]
--   FROM Users 
--   WHERE nickName != $1 
--   AND id !=( coalesce((SELECT  idTo FROM Connections WHERE idFrom = (SELECT id FROM Users WHERE nickName = $1) 
--   AND status = 'ignore'), 0)) AND location[3] =
--   (SELECT location[3] FROM Users WHERE nickName=$1)
--   LIMIT 6 OFFSET $2;

-- , date_part('year', age(dateBirth::date)) AS age, location[3] as city

-- SELECT u.nickName, firstName

-- select u.nickName,(SELECT array_agg(t.tag) FROM Tags t JOIN User_Tags ut ON ut.idTag = t.id WHERE ut.idUser = (SELECT id FROM Users WHERE nickName = 'rkina')) AS tags from Users u Join 

-- SELECT array_positions(ARRAY[1, 4, 3, 1, 3, 4, 2, 1], 1, 4);
-- SELECT array_positions(ARRAY[1, 4, 3, 1, 3, 4, 2, 1], ARRAY[1, 4]);

-- select array_agg(distinct e order by e) from unnest(ARRAY[1, 4, 3, 1, 3, 4, 2, 1]) e

-- SELECT uniq(sort(SELECT array_agg(t.tag) FROM Tags t JOIN User_Tags ut ON ut.idTag = t.id WHERE ut.idUser = 1)) = uniq(sort(SELECT array_agg(t.tag) FROM Tags t JOIN User_Tags ut ON ut.idTag = t.id WHERE ut.idUser = 2));
	
-- array_cat(ARRAY[1,2,3], ARRAY[4,5])

-- SELECT COUNT(DISTINCT u) FROM (SELECT UNNEST(users) AS u FROM mytable) t;
-- SELECT COUNT(DISTINCT u) FROM 
-- (SELECT UNNEST (array_cat(
--     (SELECT array_agg(idTag) FROM User_Tags WHERE idUser = 1),
--     (SELECT array_agg(idTag) FROM User_Tags WHERE idUser = 2))) AS u) t;

-- SELECT COUNT(u) - COUNT(DISTINCT u) FROM 
-- (SELECT UNNEST (array_cat(
-- (SELECT array_agg(idTag) FROM User_Tags WHERE idUser = 2),
-- (SELECT array_agg(idTag) FROM User_Tags WHERE idUser = 4))) AS u) t;

-- select 'rkina' me, nickName you From Users;

-- SELECT 'rkina', nickName, date_part('year', age(dateBirth::date)) AS age, rate, sex, sexPreferences, location[3] as city, photos[1][2],
-- (SELECT COUNT(u) - COUNT(DISTINCT u) FROM 
-- (SELECT UNNEST (array_cat(
-- (SELECT array_agg(idTag) FROM User_Tags WHERE idUser = (SELECT id FROM Users WHERE nickName = 'rkina')),
-- (SELECT array_agg(idTag) FROM User_Tags WHERE idUser = id))) AS u) t) count
-- From Users
-- WHERE nickName != 'rkina'
-- AND id !=( coalesce((SELECT  idTo FROM Connections WHERE idFrom = (SELECT id FROM Users WHERE nickName = 'rkina') 
--   AND status = 'ignore'), 0)) AND location[3] =
--   (SELECT location[3] FROM Users WHERE nickName='rkina')
-- ORDER BY count DESC, rate DESC;
--   LIMIT 6;

-- SELECT 'rkina', nickName, date_part('year', age(dateBirth::date)) AS age, rate,
-- location[3] as city, photos[1][2],
-- (select array_agg(t.tag) FROM Tags t JOIN User_Tags ut ON ut.idTag = t.id WHERE ut.idUser = Users.id),
-- (SELECT COUNT(u) - COUNT(DISTINCT u) FROM 
-- (SELECT UNNEST (array_cat(
-- (SELECT array_agg(idTag) FROM User_Tags WHERE idUser = (SELECT id FROM Users WHERE nickName = 'rkina')),
-- (SELECT array_agg(idTag) FROM User_Tags WHERE idUser = id))) AS u) t) count
-- From Users
-- WHERE nickName != 'rkina'
-- AND id != (coalesce((SELECT idTo FROM Connections WHERE idFrom = (SELECT id FROM Users WHERE nickName = 'rkina') 
--   AND status = 'ignore'), 0)) AND location[3] =
--   (SELECT location[3] FROM Users WHERE nickName='rkina')
-- ORDER BY count DESC, rate DESC;
--   LIMIT 6;

-- SELECT * FROM (
--     SELECT 'rkina', nickName, sex, sexpreferences, CASE
--     WHEN (sex = 'female' AND sexpreferences = 'heterosexual' OR sexpreferences = 'bisexual')
--     AND ((SELECT sex FROM Users WHERE id = 1) = 'male' AND (SELECT sexpreferences FROM Users WHERE id = 1) = 'heterosexual')
--     THEN true
--     ELSE NULL
--     END AS c
--     FROM Users
-- ) t WHERE c IS NOT NULL;



-- WHERE nickName != 'rkina'
-- AND id !=( coalesce((SELECT  idTo FROM Connections WHERE idFrom = (SELECT id FROM Users WHERE nickName = 'rkina') 
--   AND status = 'ignore'), 0)) AND location[3] =
--   (SELECT location[3] FROM Users WHERE nickName='rkina')
-- ORDER BY count DESC, rate DESC;
--   LIMIT 6;

SELECT * FROM (
    SELECT 'mgrass', nickName, firstName, lastName, date_part('year', age(dateBirth::date)) age, rate, location[3] as city, photos[1][2], sex, sexpreferences,
    (SELECT array_agg(t.tag) FROM Tags t JOIN User_Tags ut ON ut.idTag = t.id WHERE ut.idUser = Users.id),
    (SELECT COUNT(u) - COUNT(DISTINCT u) FROM 
    (SELECT UNNEST (array_cat( 
    (SELECT array_agg(idTag) FROM User_Tags WHERE idUser = (SELECT id FROM Users WHERE nickName = 'mgrass')),
    (SELECT array_agg(idTag) FROM User_Tags WHERE idUser = id))) AS u) t) count,
    CASE
    WHEN (sex = 'female' AND sexpreferences = 'heterosexual' OR sex = 'female' AND sexpreferences = 'bisexual')
        AND ((SELECT sex FROM Users WHERE id = 2) = 'male' AND (SELECT sexpreferences FROM Users WHERE id = 2) = 'heterosexual')
        THEN true
    WHEN (sex = 'male' AND sexpreferences = 'heterosexual' OR sex = 'male' AND sexpreferences = 'bisexual')
        AND ((SELECT sex FROM Users WHERE id = 2) = 'female' AND (SELECT sexpreferences FROM Users WHERE id = 2) = 'heterosexual')
        THEN true
    WHEN (sex = 'male' AND sexpreferences = 'homosexual' OR sex = 'male' AND sexpreferences = 'bisexual')
        AND ((SELECT sex FROM Users WHERE id = 2) = 'male' AND (SELECT sexpreferences FROM Users WHERE id = 2) = 'homosexual')
        THEN true
    WHEN (sex = 'female' AND sexpreferences = 'homosexual' OR sex = 'female' AND sexpreferences = 'bisexual')
        AND ((SELECT sex FROM Users WHERE id = 2) = 'female' AND (SELECT sexpreferences FROM Users WHERE id = 2) = 'homosexual')
        THEN true
    ELSE NULL
    END AS contact
    FROM Users
    WHERE nickName != 'mgrass'
    AND id != (coalesce((SELECT idTo FROM Connections WHERE idFrom = (SELECT id FROM Users WHERE nickName = 'mgrass') 
    AND status = 'ignore'), 0))
    AND location[3] = (SELECT location[3] FROM Users WHERE nickName='mgrass')
    ORDER BY count DESC, rate DESC
) t WHERE contact IS NOT NULL;

select array_to_string(array['sport', 'art'], ',');
INSERT INTO User_Tags (idTag, idUser) SELECT id, 3 FROM Tags WHERE tag IN (SELECT unnest(array['movie','sport']));



SELECT * FROM (
    SELECT 'mgrass' as me, nickName, firstName, lastName, EXTRACT(YEAR FROM age(dateBirth)) as age, rate, location[3] as city, photos[1][2], sex, sexpreferences,
    (SELECT COUNT(u) - COUNT(DISTINCT u) FROM 
    (SELECT UNNEST (array_cat( 
    (SELECT array_agg(idTag) FROM User_Tags WHERE idUser = (SELECT id FROM Users WHERE nickName = 'mgrass')),
    (SELECT array_agg(idTag) FROM User_Tags WHERE idUser = id))) AS u) t) count,
    CASE
    WHEN (sex = 'female' AND sexpreferences = 'heterosexual' OR sex = 'female' AND sexpreferences = 'bisexual')
        AND ((SELECT sex FROM Users WHERE id = 2) = 'male' AND (SELECT sexpreferences FROM Users WHERE id = 2) = 'heterosexual')
        THEN true
    WHEN (sex = 'male' AND sexpreferences = 'heterosexual' OR sex = 'male' AND sexpreferences = 'bisexual')
        AND ((SELECT sex FROM Users WHERE id = 2) = 'female' AND (SELECT sexpreferences FROM Users WHERE id = 2) = 'heterosexual')
        THEN true
    WHEN (sex = 'male' AND sexpreferences = 'homosexual' OR sex = 'male' AND sexpreferences = 'bisexual')
        AND ((SELECT sex FROM Users WHERE id = 2) = 'male' AND (SELECT sexpreferences FROM Users WHERE id = 2) = 'homosexual')
        THEN true
    WHEN (sex = 'female' AND sexpreferences = 'homosexual' OR sex = 'female' AND sexpreferences = 'bisexual')
        AND ((SELECT sex FROM Users WHERE id = 2) = 'female' AND (SELECT sexpreferences FROM Users WHERE id = 2) = 'homosexual')
        THEN true
    ELSE NULL
    END AS contact
    FROM Users
    WHERE nickName != 'mgrass'
    AND id != (coalesce((SELECT idTo FROM Connections WHERE idFrom = (SELECT id FROM Users WHERE nickName = 'mgrass') 
    AND status = 'ignore'), 0))
    AND location[2] = (SELECT location[2] FROM Users WHERE nickName='mgrass')
    ORDER BY count DESC, rate DESC
) t WHERE contact IS NOT NULL
AND age > 18 AND age < 45
AND rate > 0 AND rate < 1000
-- AND sex = 'female' AND sex = 'male';
AND city = 'Moscow'
AND tags...;

select nickname from Users where
(sex = 'male' AND sexpreferences = 'heterosexual' OR sex = 'male' AND sexpreferences = 'bisexual')
AND ((SELECT sex FROM Users WHERE id = (SELECT id FROM Users WHERE nickName = 'mgrass')) = 'female' AND (SELECT sexpreferences FROM Users WHERE id = (SELECT id FROM Users WHERE nickName = 'mgrass')) = 'heterosexual')


-- SELECT 'rkina', nickName, date_part('year', age(dateBirth::date)) AS age, rate,
SELECT 'rkina', nickName, (select EXTRACT(YEAR FROM age(dateBirth)) as age FROM Users) s, rate,
location[3] as city, photos[1][2],
(SELECT array_agg(t.tag) FROM Tags t JOIN User_Tags ut ON ut.idTag = t.id WHERE ut.idUser = Users.id),
(SELECT COUNT(u) - COUNT(DISTINCT u) FROM 
(SELECT UNNEST (array_cat(
(SELECT array_agg(idTag) FROM User_Tags WHERE idUser = (SELECT id FROM Users WHERE nickName = 'rkina')),
(SELECT array_agg(idTag) FROM User_Tags WHERE idUser = id))) AS u) t) count
From Users
WHERE nickName != 'rkina'
AND id != (coalesce((SELECT idTo FROM Connections WHERE idFrom = (SELECT id FROM Users WHERE nickName = 'rkina') 
AND status = 'ignore'), 0))
AND location[2] = (SELECT location[2] FROM Users WHERE nickName='rkina')
ORDER BY count DESC, rate DESC, age ASC;

select * from (select EXTRACT(YEAR FROM age(dateBirth)) as age FROM Users) s where age > 18;

SELECT 'test10' AS nickTo, (SELECT nickname FROM Users WHERE id = l.idFrom), l.event, l.message, l.time
FROM Logs AS l WHERE idTo = 10 order by l.time desc limit 10;