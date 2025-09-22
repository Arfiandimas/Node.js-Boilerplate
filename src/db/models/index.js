/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
import config from '../../config/config.js';

const db = {};

// console.log('sqlDB config:', JSON.stringify(config.sqlDB, null, 2));

const sequelize = new Sequelize.Sequelize(
	config.sqlDB.database,
	config.sqlDB.username,
	config.sqlDB.password,
	{
		host: config.sqlDB.host,
		port: config.sqlDB.port,
		dialect: config.sqlDB.dialect,
		logging: false,
		dialectOptions: {
			dateStrings: true,
			typeCast: true,
		},
		pool: {
			max: config.sqlDB.pool.max,
			min: config.sqlDB.pool.min,
			idle: config.sqlDB.pool.idle,
			acquire: 60000,
		},
	}
);

const __dirname = path.dirname(new URL(import.meta.url).pathname);

for (const file of fs.readdirSync(__dirname)) {
	if (file.indexOf('.') === 0 || !file.endsWith('.model.js')) continue;
	const filePath = path.join(__dirname, file);
	// dynamic import requires file:// URL
	// eslint-disable-next-line no-await-in-loop
	const imported = await import(`file://${filePath}`);
	const modelDef = imported.default;
	const model = modelDef(sequelize, Sequelize.DataTypes);
	db[model.name] = model;
}

Object.keys(db).forEach((modelName) => {
	if (db[modelName].associate) {
		db[modelName].associate(db);
	}
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
