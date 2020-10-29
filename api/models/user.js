const config = require('config');
const connector = config.get('urlDb');
const pgp = require('pg-promise')();
const db = pgp(connector);

const sign = (params) => {
  const sql =
    `INSERT INTO Users (nickName, firstName, lastName, email, password, dateBirth) 
  VALUES ($1, $2, $3, $4, $5, $6) 
  RETURNING nickName`;

  return db.one(sql, params);
};

const getPassword = (login) => {
  const sql =
    `SELECT nickName, firstName, lastName, email, 
    (SELECT array_agg(t.tag) FROM Tags t JOIN User_Tags ut ON ut.idTag = t.id WHERE ut.idUser = (SELECT id FROM Users WHERE nickName = $1)) AS tags,
    dateBirth, sexPreferences, 
  sex, rate, about, photos, location, password 
  FROM Users WHERE nickName=$1`;

  return db.any(sql, login);
};

const getOnlyPass = (login) => {
  const sql = `SELECT password FROM Users WHERE nickName=$1`;

  return db.any(sql, login);
}

const getEmail = (email) => {
  const sql = 'SELECT id FROM Users WHERE email=$1';

  return db.any(sql, email);
}

const getLogin = (login) => {
  const sql = 'SELECT id FROM Users WHERE nickName=$1';

  return db.any(sql, login);
}

const getProfile = (nickname) => {
  const sql = `SELECT nickName, firstName, lastName, email, date_part('year', age(dateBirth::date)) AS age,
  sexPreferences, sex, rate, about, photos, location[1] AS country, location[3] AS city,
  (SELECT array_agg(t.tag) FROM Tags t JOIN User_Tags ut ON ut.idTag = t.id WHERE ut.idUser = (SELECT id FROM Users WHERE nickName = $1)) AS tags
  FROM Users WHERE nickName=$1`;

  return db.any(sql, nickname);
}

const getViews = (nickname) => {
  const sql =
    `SELECT u.nickName, date_part('year', age(u.dateBirth::date)) AS age, u.photos[1][2], u.about 
    FROM Users u JOIN History h ON u.id = h.idvisitor 
    WHERE h.idvisited = 
    (SELECT id FROM Users WHERE nickName=$1)
    ORDER BY h.visiTime DESC`;

  return db.any(sql, nickname);
}

const getLikes = (nickname) => {
  const sql =
    `SELECT u.nickName, date_part('year', age(u.dateBirth::date)) AS age, u.photos[1][2], u.about, c.createdAt AS time
  FROM Users u JOIN Connections c ON u.id = c.idFrom
  WHERE c.idTo = 
  (SELECT id FROM Users WHERE nickName=$1)
  AND status='like'
  ORDER BY c.createdAt DESC`;

  return db.any(sql, nickname);
}

const sendMessage = (params) => {
  const sql = `INSERT INTO Chat (idFrom, idTo, message) VALUES
  ( 
      (SELECT id FROM Users WHERE nickName = $1),
      (SELECT id FROM Users WHERE nickName = $2),
      $3
  )
  RETURNING id`;

  return db.one(sql, params);
}

const getMessage = (params) => {
  const sql = `SELECT a.nickName, b.nickName, c.message FROM Chat c
  JOIN Users a ON a.id = c.idFrom
  JOIN Users b ON b.id = c.idTo
  WHERE (a.nickName = $1 AND b.nickName = $2) OR (a.nickName = $2 AND b.nickName = $1)`;

  return db.any(sql, params);
}

const getStatus = (params) => {
  const sql = `SELECT status FROM Connections
  WHERE idFrom = (SELECT id FROM Users WHERE nickName = $1)
  AND idTo = (SELECT id FROM Users WHERE nickName = $2)`;

  return db.any(sql, params);
}

const updateStatus = (params) => {
  const sql = `UPDATE Connections SET status = $3
  WHERE idFrom = (SELECT id FROM Users WHERE nickName = $1)
  AND idTo = (SELECT id FROM Users WHERE nickName = $2) RETURNING id`;

  return db.one(sql, params);
}

const insertStatus = (params) => {
  const sql = `INSERT INTO Connections (idFrom, idTo, status)
  VALUES ((SELECT id FROM Users WHERE nickName = $1),
  (SELECT id FROM Users WHERE nickName = $2), $3) RETURNING id`;

  return db.one(sql, params);
}

const putImage = (position, type, src, login) => {
  const params = [position, type, src, login];

  const sql =
    `UPDATE Users SET photos[$1][1] = $2, photos[$1][2] = $3 
  WHERE nickName = $4 RETURNING id`;

  return db.one(sql, params);
};

const getImage = (login, position) => {
  const params = [position, login];

  const sql =
    `SELECT photos[$1][1] FROM Users WHERE nickName = $2`

  return db.any(sql, params);
}

const getTimeView = (params) => {
  const sql =
    `SELECT visiTime FROM History
  WHERE idvisitor = (SELECT id FROM Users WHERE nickName = $1)
  AND idvisited = (SELECT id FROM Users WHERE nickName = $2)`;

  return db.any(sql, params);
}

const updateViewFailed = (params) => {
  const sql =
    `UPDATE History SET visiTime = CURRENT_TIMESTAMP
  WHERE idVisitor = (SELECT id FROM Users WHERE nickName = $1)
  AND idVisited = (SELECT id FROM Users WHERE nickName = $2) RETURNING id`;

  return db.one(sql, params);
}

const insertViewFailed = (params) => {
  const sql =
    `INSERT INTO History (idVisitor, idVisited, visiTime)
  VALUES(
    (SELECT id FROM Users WHERE nickName = $1),
  (SELECT id FROM Users WHERE nickName = $2),
  CURRENT_TIMESTAMP) RETURNING id`;

  return db.one(sql, params);
}

const editProfile = (que, params, i) => {
  const sql = `UPDATE Users SET ${que} WHERE nickName = $${i} RETURNING id`;

  return db.one(sql, params);
}

const deleteTags = (login) => {
  const sql = `DELETE FROM User_Tags WHERE idUser = (SELECT id FROM Users WHERE nickName=$1) RETURNING idUser`;

  return db.any(sql, login);
}

const insertTags = (params) => {
  const sql = `
  INSERT INTO User_Tags
  (idTag, idUser) 
  SELECT id, (SELECT id FROM Users WHERE nickName=$1) FROM Tags WHERE tag IN (SELECT unnest($2))
  RETURNING idUser`;

  return db.any(sql, params);
}

const getInfoLogin = (params) => {
  const sql =
    `SELECT nickName, firstName, lastName, email, 
    (SELECT array_agg(t.tag) FROM Tags t JOIN User_Tags ut ON ut.idTag = t.id WHERE ut.idUser = (SELECT id FROM Users WHERE nickName = $1)) AS tags,
    dateBirth, sexPreferences, 
  sex, rate, about, photos, location 
  FROM Users WHERE nickName=$1`;

  return db.any(sql, params);
}

const insertLocation = (params) => {
  const sql = `UPDATE Users 
  SET location[1] = $1, location[2] = $2, location[3] = $3 
  WHERE nickName = $4 RETURNING id`;

  return db.one(sql, params);
}

const insertRemind = (params) => {
  const sql = `UPDATE Users 
  SET remindHash = $1, 
  remindtime = $2
  WHERE email = $3
  RETURNING id`;

  return db.one(sql, params);
}

const getRemind = (params) => {
  const sql = `SELECT remindHash, 
  EXTRACT(HOUR FROM remindtime) AS hours,
  EXTRACT(MINUTE FROM remindtime) AS minutes 
  FROM Users
  WHERE email=$1`;

  return db.any(sql, params);
}

const delRemind = (params) => {
  const sql = `UPDATE Users 
  SET remindHash = null, 
  remindtime = null
  WHERE email = $1
  RETURNING id`;

  return db.any(sql, params);
}

const changePass = (params) => {
  const sql = `UPDATE Users
  SET password = $1
  WHERE email = $2
  RETURNING id`;

  return db.any(sql, params);
}

const getCards = (params, sort) => {
  const sql = `
  SELECT * FROM (
    SELECT nickName, firstName, lastName, date_part('year', age(dateBirth::date)) age, rate, location[3] AS city, photos[1][2], sex, sexpreferences,
    (SELECT array_agg(t.tag) FROM Tags t JOIN User_Tags ut ON ut.idTag = t.id WHERE ut.idUser = Users.id) AS tags ,
    (SELECT COUNT(u) - COUNT(DISTINCT u) FROM 
    (SELECT UNNEST (array_cat( 
    (SELECT array_agg(idTag) FROM User_Tags WHERE idUser = (SELECT id FROM Users WHERE nickName = $1)),
    (SELECT array_agg(idTag) FROM User_Tags WHERE idUser = id))) AS u) t) count,
    CASE
    WHEN (sex = 'female' AND sexpreferences = 'heterosexual' OR sex = 'female' AND sexpreferences = 'bisexual')
        AND ((SELECT sex FROM Users WHERE id = (SELECT id FROM Users WHERE nickName = $1)) = 'male' AND (SELECT sexpreferences FROM Users WHERE id = (SELECT id FROM Users WHERE nickName = $1)) = 'heterosexual')
        THEN true
    WHEN (sex = 'male' AND sexpreferences = 'heterosexual' OR sex = 'male' AND sexpreferences = 'bisexual')
        AND ((SELECT sex FROM Users WHERE id = (SELECT id FROM Users WHERE nickName = $1)) = 'female' AND (SELECT sexpreferences FROM Users WHERE id = (SELECT id FROM Users WHERE nickName = $1)) = 'heterosexual')
        THEN true
    WHEN (sex = 'male' AND sexpreferences = 'homosexual' OR sex = 'male' AND sexpreferences = 'bisexual')
        AND ((SELECT sex FROM Users WHERE id = (SELECT id FROM Users WHERE nickName = $1)) = 'male' AND (SELECT sexpreferences FROM Users WHERE id = (SELECT id FROM Users WHERE nickName = $1)) = 'homosexual')
        THEN true
    WHEN (sex = 'female' AND sexpreferences = 'homosexual' OR sex = 'female' AND sexpreferences = 'bisexual')
        AND ((SELECT sex FROM Users WHERE id = (SELECT id FROM Users WHERE nickName = $1)) = 'female' AND (SELECT sexpreferences FROM Users WHERE id = (SELECT id FROM Users WHERE nickName = $1)) = 'homosexual')
        THEN true
    ELSE NULL
    END AS contact
    FROM Users
    WHERE nickName != $1
    AND id != (coalesce((SELECT idTo FROM Connections WHERE idFrom = (SELECT id FROM Users WHERE nickName = $1) 
    AND status = 'ignore'), 0))
    AND location[3] = (SELECT location[3] FROM Users WHERE nickName = $1)
    ORDER BY ${sort}
) t WHERE contact IS NOT NULL`;

  return db.any(sql, params);
}

exports.sign = sign;
exports.getPassword = getPassword;
exports.getOnlyPass = getOnlyPass;
exports.getEmail = getEmail;
exports.getLogin = getLogin;
exports.getProfile = getProfile;
exports.getViews = getViews;
exports.getLikes = getLikes;
exports.sendMessage = sendMessage;
exports.getMessage = getMessage;
exports.getCards = getCards;
exports.getStatus = getStatus;
exports.updateStatus = updateStatus;
exports.insertStatus = insertStatus;
exports.putImage = putImage;
exports.getImage = getImage;
exports.getTimeView = getTimeView;
exports.updateViewFailed = updateViewFailed;
exports.insertViewFailed = insertViewFailed;
exports.editProfile = editProfile;
exports.deleteTags = deleteTags;
exports.insertTags = insertTags;
exports.getInfoLogin = getInfoLogin;
exports.insertLocation = insertLocation;
exports.insertRemind = insertRemind;
exports.getRemind = getRemind;
exports.delRemind = delRemind;
exports.changePass = changePass;