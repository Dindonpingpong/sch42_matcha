const config = require('config');
const connector = config.get('urlDb');
const pgp = require('pg-promise')();
const db = pgp(connector);

const sign = (params) => {
  const sql =
    `INSERT INTO Users (nickName, firstName, lastName, email, password, dateBirth) 
  VALUES ($1, $2, $3, $4, $5, $6) 
  RETURNING id`;

  return db.one(sql, params);
};

const getPassword = (email) => {
  const sql =
    `SELECT nickName, firstName, lastName, email, dateBirth, sexPreferences, 
  sex, rate, about, photos, location, password 
  FROM Users WHERE email=$1`;

  return db.any(sql, email);
};

const getEmail = (email) => {
  const sql = 'SELECT id FROM Users WHERE email=$1';

  return db.any(sql, email);
}

const getProfile = (nickname) => {
  const sql = `SELECT nickName, firstName, lastName, email, date_part('year', age(dateBirth::date)) AS age,
  sexPreferences, sex, rate, about, photos, location 
  FROM Users WHERE nickName=$1`;

  return db.any(sql, nickname);
}

const getViews = (nickname) => {
  const sql =
    `SELECT u.nickName, date_part('year', age(u.dateBirth::date)) AS age, u.photos[1], u.about 
    FROM Users u JOIN History h ON u.id = h.idvisitor 
    WHERE h.idvisited = 
    (SELECT id FROM Users WHERE nickName=$1)`;

  return db.any(sql, nickname);
}

const getLikes = (nickname) => {
  const sql = 
  `SELECT u.nickName, date_part('year', age(u.dateBirth::date)) AS age, u.photos[1], u.about
  FROM Users u JOIN Connections c ON u.id = c.idFrom
  WHERE c.idTo = 
  (SELECT id FROM Users WHERE nickName=$1)
  AND status='like'`;

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

exports.sign = sign;
exports.getPassword = getPassword;
exports.getEmail = getEmail;
exports.getProfile = getProfile;
exports.getViews = getViews;
exports.getLikes = getLikes;
exports.sendMessage = sendMessage;
exports.getMessage = getMessage;