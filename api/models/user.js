const config = require('config');
const connector = config.get('urlDb');
const pgp = require('pg-promise')();
const db = pgp(connector);

const sign = (params) => {
  const sql =
    `INSERT INTO Users (nickName, firstName, lastName, email, password, dateBirth, sex) 
  VALUES ($1, $2, $3, $4, $5, $6, $7) 
  RETURNING nickName`;

  return db.one(sql, params);
};

const getPassword = (login) => {
  const sql =
    `SELECT nickName, firstName, lastName, email, count_reports, 
    (SELECT array_agg(t.tag) FROM Tags t JOIN User_Tags ut ON ut.idTag = t.id WHERE ut.idUser = (SELECT id FROM Users WHERE nickName = $1)) AS tags,
    dateBirth, sexPreferences, 
  sex, position, rate, about, photos, location, confirm, password 
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
  const sql = `SELECT nickName, firstName, lastName, email, date_part('year', age(dateBirth::date)) AS age, count_reports,
  sexPreferences, sex, rate, about, photos, location[1] AS country, location[2] AS city, 
  (SELECT array_agg(t.tag) FROM Tags t JOIN User_Tags ut ON ut.idTag = t.id WHERE ut.idUser = (SELECT id FROM Users WHERE nickName = $1)) AS tags
  FROM Users WHERE nickName=$1`;

  return db.any(sql, nickname);
}

const getViews = (nickname) => {
  const sql =
    `SELECT u.nickName, date_part('year', age(u.dateBirth::date)) AS age, u.photos[1][2], u.about, h.visiTime 
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
  WHERE (a.nickName = $1 AND b.nickName = $2) OR (a.nickName = $2 AND b.nickName = $1)
  ORDER BY createdAt DESC
  LIMIT 10 OFFSET $3`;

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
  const sql = `UPDATE Users SET ${que} WHERE nickName = $${i} RETURNING nickName`;

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
  sex, position, rate, about, photos, location 
  FROM Users WHERE nickName=$1`;

  return db.any(sql, params);
}

const insertLocation = (params) => {
  const sql = `UPDATE Users 
  SET location[1] = $1, location[2] = $2, position = point($3, $4)
  WHERE nickName = $5 
  RETURNING id`;

  return db.any(sql, params);
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

const getCards = (params, sort, sortTags, sqlFilter) => {
  const sql = `
  SELECT * FROM (
    SELECT nickName, firstName, lastName, date_part('year', age(dateBirth::date)) AS age, rate, location[2] AS city, position <@> myPosition($1) as distance, photos[1][2], sex, sexpreferences, count_reports,
    (SELECT array_agg(t.tag) FROM Tags t JOIN User_Tags ut ON ut.idTag = t.id WHERE ut.idUser = Users.id) AS tags,
    (SELECT COUNT(u) - COUNT(DISTINCT u) FROM 
    (SELECT UNNEST (array_cat( 
    (SELECT array_agg(idTag) FROM User_Tags WHERE idUser = (SELECT id FROM Users WHERE nickName = $1)),
    (SELECT array_agg(idTag) FROM User_Tags WHERE idUser = id))) AS u) t) count,
    CASE
    WHEN (sex = 'female' AND sexpreferences = 'heterosexual' OR sex = 'female' AND sexpreferences = 'bisexual')
        AND ($2 = 'male' AND $3 = 'heterosexual')
        THEN true
    WHEN (sex = 'male' AND sexpreferences = 'heterosexual' OR sex = 'male' AND sexpreferences = 'bisexual')
        AND ($2 = 'female' AND $3 = 'heterosexual')
        THEN true
    WHEN (sex = 'male' AND sexpreferences = 'homosexual' OR sex = 'male' AND sexpreferences = 'bisexual')
        AND ($2 = 'male' AND $3 = 'homosexual')
        THEN true
    WHEN (sex = 'female' AND sexpreferences = 'homosexual' OR sex = 'female' AND sexpreferences = 'bisexual')
        AND ($2 = 'female' AND $3 = 'homosexual')
        THEN true
    ELSE NULL
    END AS contact
    FROM Users
    WHERE nickName != $1
    AND id != (coalesce((SELECT idTo FROM Connections WHERE idFrom = (SELECT id FROM Users WHERE nickName = $1) 
    AND status = 'ignore'), 0))
    AND count_reports < 3
    ORDER BY ${sort}
) t WHERE contact IS NOT NULL ${sqlFilter} ${sortTags} LIMIT 6 OFFSET ($4 - 6)`;

  return db.any(sql, params);
}

const getCountCards = (params, sqlFilter) => {
  const sql = `
  SELECT * FROM (
    SELECT nickName, date_part('year', age(dateBirth::date)) AS age, rate, location[2] AS city, position <@> myPosition($1) as distance, sex, sexpreferences,
    (SELECT array_agg(t.tag) FROM Tags t JOIN User_Tags ut ON ut.idTag = t.id WHERE ut.idUser = Users.id) AS tags, count_reports,
    CASE
    WHEN (sex = 'female' AND sexpreferences = 'heterosexual' OR sex = 'female' AND sexpreferences = 'bisexual')
        AND ($2 = 'male' AND $3 = 'heterosexual')
        THEN true
    WHEN (sex = 'male' AND sexpreferences = 'heterosexual' OR sex = 'male' AND sexpreferences = 'bisexual')
        AND ($2 = 'female' AND $3 = 'heterosexual')
        THEN true
    WHEN (sex = 'male' AND sexpreferences = 'homosexual' OR sex = 'male' AND sexpreferences = 'bisexual')
        AND ($2 = 'male' AND $3 = 'homosexual')
        THEN true
    WHEN (sex = 'female' AND sexpreferences = 'homosexual' OR sex = 'female' AND sexpreferences = 'bisexual')
        AND ($2 = 'female' AND $3 = 'homosexual')
        THEN true
    ELSE NULL
    END AS contact
    FROM Users
    WHERE nickName != $1
    AND id != (coalesce((SELECT idTo FROM Connections WHERE idFrom = (SELECT id FROM Users WHERE nickName = $1) 
    AND status = 'ignore'), 0))
    AND location[2] = (SELECT location[2] FROM Users WHERE nickName = $1)
) t WHERE contact IS NOT NULL ${sqlFilter}`;

  return db.any(sql, params);
}

const addConfirmHash = (params) => {
  const sql = `UPDATE Users
  SET confirmHash = $1
  WHERE nickName = $2
  RETURNING id`;

  return db.any(sql, params);
}

const getConfirmHash = (params) => {
  const sql = `SELECT confirmHash, created_at_user FROM Users
  WHERE nickName = $1`;

  return db.any(sql, params);
}

const userDel = (params) => {
  const sql = `DELETE FROM Users WHERE nickName = $1 RETURNING id`;

  return db.any(sql, params);
}

const confirmUser = (params) => {
  const sql = `UPDATE Users 
  SET confirm = true
  WHERE nickName = $1
  RETURNING id`;

  return db.any(sql, params);
}

const updateGeo = (params) => {
  const sql = `UPDATE Users
  SET location[1] = $1,
  location[2] = $2,
  location[3] = $3
  WHERE nickname = $4
  RETURNING id`;

  return db.any(sql, params);
}

const getCountires = () => {
  const sql = `SELECT DISTINCT(location[1])
  FROM Users`;

  return db.any(sql);
}

const getCities = (params) => {
  const sql = `SELECT DISTINCT(location[3]) 
  FROM Users
  WHERE location[1] = ANY($1)`;

  return db.any(sql, params);
}

const getCountMessage = (params) => {
  const sql = `SELECT COUNT(c.message) FROM Chat c
  JOIN Users a ON a.id = c.idFrom
  JOIN Users b ON b.id = c.idTo
  WHERE (a.nickName = $1 AND b.nickName = $2) OR (a.nickName = $2 AND b.nickName = $1)`;

  return db.any(sql, params);
}

const insertReport = (params) => {
  const sql = `INSERT INTO User_Reports (idFrom, idTo, idReport, message)
  VALUES (
    myId($1),
    myId($2), 
    (SELECT id FROM Reports WHERE report = $3), 
    $4) 
  RETURNING id`;

  return db.one(sql, params);
}

const updateCountReports = (params) => {
  const sql = `UPDATE Users 
  SET count_reports = (count_reports + 1),
  rate = rate - 50
  WHERE nickName = $1
  RETURNING count_reports`;

  return db.one(sql, params);
}

const updateRate = (params) => {
  const sql = `UPDATE Users 
  SET rate = rate + $1
  WHERE nickname = $2
  RETURNING id`;

  return db.one(sql, params);
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
exports.getCountCards = getCountCards;
exports.addConfirmHash = addConfirmHash;
exports.getConfirmHash = getConfirmHash;
exports.userDel = userDel;
exports.confirmUser = confirmUser;
exports.updateGeo = updateGeo;
exports.getCountires = getCountires;
exports.getCities = getCities;
exports.getCountMessage = getCountMessage;
exports.insertReport = insertReport;
exports.updateCountReports = updateCountReports;
exports.updateRate = updateRate;