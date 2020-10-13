const config = require('config');
const connector = config.get('urlDb');
const pgp = require('pg-promise')();
const db = pgp(connector);

const sign = (params) => {
  const sql = 'INSERT INTO Users (nickName, firstName, lastName, email, password, dateBirth) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id';

  return db.one(sql, params);
};

const getPassword = (email) => {
  const sql = 'SELECT password FROM Users WHERE email=$1';

  return db.any(sql, email);
};

const getEmail = (email) => {
  const sql = 'SELECT user_id FROM Users WHERE email=$1';

  return db.any(sql, email);
}

const getProfile = (nickname) => {
  const sql = 'SELECT firstname, lastname, sex, about FROM Users WHERE firstname=$1';
  // const sql = 'SELECT firstname, lastname, nickname, age, sex, orientation, about, location FROM Users WHERE nickname=$1';

  return db.any(sql, nickname);
}

exports.sign = sign;
exports.getPassword = getPassword;
exports.getEmail = getEmail;

exports.getProfile = getProfile;
