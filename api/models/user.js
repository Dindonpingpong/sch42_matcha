const config = require('config');
const connector = config.get('urlDb');
const pgp = require('pg-promise')();
const db = pgp(connector);

const sign = (params) => {
  const sql = 'INSERT INTO Users (firstName, lastName, email, password, about) VALUES ($1, $2, $3, $4, $5) RETURNING id';

  return db.one(sql, params);
};

const getPassword = (email) => {
  const sql = 'SELECT password FROM Users WHERE email=$1';

  return db.any(sql, email);
};

const getEmail = (email) => {
  const sql = 'SELECT id FROM Users WHERE email=$1';

  return db.any(sql, email);
}

const getLogin = (login) => {
  const sql = 'SELECT id FROM Users WHERE nickName=$1';

  return db.any(sql, login);
}

exports.sign = sign;
exports.getPassword = getPassword;
exports.getEmail = getEmail;
exports.getLogin = getLogin;