const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(process.cwd(), '.env') });

module.exports = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE_NAME,
  dialect: process.env.DB_DIALECT || 'postgres',
  pool: {
    max: process.env.DB_MAX_POOL || 10,
    min: process.env.DB_MIN_POOL || 0,
    idle: process.env.DB_IDLE || 10000,
  },
};
