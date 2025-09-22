import fs from 'fs';
import path from 'path';
import config from '../config/config.js';

const pkg = JSON.parse(
	fs.readFileSync(path.resolve(process.cwd(), 'package.json'), 'utf8'),
);
const { version } = pkg;

const swaggerDef = {
	openapi: '3.0.0',
	info: {
		title: 'node-express-postgresql-boilerplate API documentation',
		version,
		license: {
			name: '',
			url: '',
		},
	},
	servers: [
		{
			url: `http://localhost:${config.port}/v1`,
		},
	],
};

export default swaggerDef;
