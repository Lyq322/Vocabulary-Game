const { Pool } = require('pg');

const pool = new Pool({
  user: 'vocab_user',
  host: 'localhost',
  database: 'vocabulary_game',
  password: 'vocab_password',
  port: 5432,
});

module.exports = pool;