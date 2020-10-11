const config = require('config');
const connector = config.get('urlDb');
const pgp = require('pg-promise')();
const db = pgp(connector);

const sign = (params) => {
  const sql = 'INSERT INTO Users (firstName, lastName, email, password, about) VALUES ($1, $2, $3, $4, $5) RETURNING user_id';

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