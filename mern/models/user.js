const { Pool } = require('pg');
const config = require('config');
const connector = config.get('urlDb');
const bcrypt = require('bcrypt');

const sign = (params) => {
  const pool = new Pool({
    connectionString: connector
  });
  pool.connect(function (err, client, done) {
    const sql = 'INSERT INTO Users (firstName, lastName, email, password, about) VALUES ($1, $2, $3, $4, $5)';

    if (err) {
      return console.error('error fetching client from pool', err)
    }
    client.query(sql, params, function (err, result) {
      done()
      if (err) {
        return console.error('error happened during query', err)
      }
      console.log(result.rows[0])
      pool.end();
    })
  })
};

const auth = (email, password) => {
  const pool = new Pool({
    connectionString: connector
  });

  pool.connect(function (err, client, done) {
    const sql = 'SELECT password FROM Users WHERE email=$1';
    const params = [ email ];

    if (err) {
      return false
    }

    client.query(sql, params, function (err, result) {
      done()

      if (err){
        return false
      }

      pool.end();

      const trueHash = result.rows[0].password;
      console.log(bcrypt.compareSync(password, trueHash))

      return bcrypt.compareSync(password, trueHash)
    })
  })
};

exports.sign = sign;
exports.auth = auth;