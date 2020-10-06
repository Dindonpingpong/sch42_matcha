const { Pool } = require('pg');
const config = require('config');
const connector = config.get('urlDb');

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

module.exports = sign;