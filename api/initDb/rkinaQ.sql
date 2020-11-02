-- SELECT distinct(location[3]) FROM Users WHERE location[3] IN ('Russia', 'Moscow', 'Podolsk');

UPDATE Users 
  SET location = 'Viet', location[2] = 'Hanoi', position = point('25', '75')
  WHERE nickName = 'mgrass' 
  RETURNING id;

SELECT nickName, position <@> (SELECT position FROM Users WHERE nickName = 'rkina') as distance 
from Users 
WHERE position <@> (SELECT position FROM Users WHERE nickName = 'rkina') < 2500
AND 
nickName != 'rkina';

SELECT * FROM (
     SELECT nickName, firstName, lastName, date_part('year', age(dateBirth::date)) AS age, rate, location[3] AS city, photos[2], sex, sexpreferences,
     (SELECT array_agg(t.tag) FROM Tags t JOIN User_Tags ut ON ut.idTag = t.id WHERE ut.idUser = Users.id) AS tags,
     (SELECT COUNT(u) - COUNT(DISTINCT u) FROM
     (SELECT UNNEST (array_cat(
     (SELECT array_agg(idTag) FROM User_Tags WHERE idUser = (SELECT id FROM Users WHERE nickName = 'test6')),
     (SELECT array_agg(idTag) FROM User_Tags WHERE idUser = id))) AS u) t) count,
     CASE
     WHEN (sex = 'female' AND sexpreferences = 'heterosexual' OR sex = 'female' AND sexpreferences = 'bisexual')
         AND ((SELECT sex FROM Users WHERE id = (SELECT id FROM Users WHERE nickName = 'test6')) = 'male' AND (SELECT sexpreferences FROM Users WHERE id = (SELECT id FROM Users WHERE nickName = 'test6')) = 'heterosexual')
         THEN true
     WHEN (sex = 'male' AND sexpreferences = 'heterosexual' OR sex = 'male' AND sexpreferences = 'bisexual')
         AND ((SELECT sex FROM Users WHERE id = (SELECT id FROM Users WHERE nickName = 'test6')) = 'female' AND (SELECT sexpreferences FROM Users WHERE id = (SELECT id 
FROM Users WHERE nickName = 'test6')) = 'heterosexual')
         THEN true
     WHEN (sex = 'male' AND sexpreferences = 'homosexual' OR sex = 'male' AND sexpreferences = 'bisexual')
         AND ((SELECT sex FROM Users WHERE id = (SELECT id FROM Users WHERE nickName = 'test6')) = 'male' AND (SELECT sexpreferences FROM Users WHERE id = (SELECT id FROM Users WHERE nickName = 'test6')) = 'homosexual')
         THEN true
     WHEN (sex = 'female' AND sexpreferences = 'homosexual' OR sex = 'female' AND sexpreferences = 'bisexual')
         AND ((SELECT sex FROM Users WHERE id = (SELECT id FROM Users WHERE nickName = 'test6')) = 'female' AND (SELECT sexpreferences FROM Users WHERE id = (SELECT id 
FROM Users WHERE nickName = 'test6')) = 'homosexual')
         THEN true
     ELSE NULL
     END AS contact
     FROM Users
     WHERE nickName != 'test6'
     AND id != (coalesce((SELECT idTo FROM Connections WHERE idFrom = (SELECT id FROM Users WHERE nickName = 'test6')
     AND status = 'ignore'), 0))
     AND location[3] = (SELECT location[3] FROM Users WHERE nickName = 'test6')
     ORDER BY age ASC, count DESC, rate DESC
 ) t WHERE contact IS NOT NULL AND sex = 'male' AND age > 18 AND age < 120 AND rate > 0 AND rate < 1000