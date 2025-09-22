// src/config/postgres.js
import { Client } from 'pg';
import config from './config.js';
import logger from './logger.js';

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

export { initPostgres };
