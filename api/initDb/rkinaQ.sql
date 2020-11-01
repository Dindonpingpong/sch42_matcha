-- SELECT distinct(location[3]) FROM Users WHERE location[3] IN ('Russia', 'Moscow', 'Podolsk');

UPDATE Users 
  SET location[1] = 'Viet', location[2] = 'Hanoi', position = point('25', '75')
  WHERE nickName = 'mgrass' 
  RETURNING id;

SELECT nickName, position <@> (SELECT position FROM Users WHERE nickName = 'rkina') as distance 
from Users 
WHERE position <@> (SELECT position FROM Users WHERE nickName = 'rkina') < 2500
AND 
nickName != 'rkina';

