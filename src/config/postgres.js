// src/config/postgres.js
const { Client } = require('pg');
const config = require('./config');
const logger = require('./logger');

let client;

async function initPostgres() {
  if (!client) {
    client = new Client({
      user: config.sqlDB.user,
      host: config.sqlDB.host,
      database: config.sqlDB.database,
      password: config.sqlDB.password,
      port: config.sqlDB.port,
    });

    try {
      await client.connect();
      logger.info('✅ Connected to PostgreSQL successfully');
    } catch (error) {
      logger.error('❌ Failed to connect to PostgreSQL:', error.message);
      throw error;
    }
  }
  return client;
}

module.exports = { initPostgres };
