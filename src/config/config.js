import dotenv from 'dotenv';
import path from 'path';
import Joi from '@hapi/joi';

dotenv.config({ path: path.join(process.cwd(), '.env') });

const envVarsSchema = Joi.object()
	.keys({
		NODE_ENV: Joi.string()
			.valid('production', 'development', 'test')
			.required(),
		PORT: Joi.number().default(3000),

		JWT_SECRET: Joi.string().required().description('JWT secret key'),
		JWT_ACCESS_EXPIRATION_MINUTES: Joi.number()
			.default(30)
			.description('minutes after which access tokens expire'),
		JWT_REFRESH_EXPIRATION_DAYS: Joi.number()
			.default(30)
			.description('days after which refresh tokens expire'),

		COOKIE_EXPIRATION_HOURS: Joi.number()
			.default(24)
			.description('hours after which httpOnly cookie expire'),

		DB_USERNAME: Joi.string().description('sqldb username'),
		DB_HOST: Joi.string().description('sqldb host'),
		DB_DATABASE_NAME: Joi.string().description('sqldb database name'),
		DB_PASSWORD: Joi.string().description('sqldb password'),
		DB_DIALECT: Joi.string()
			.default('postgres')
			.description('type of sqldb'),
		DB_MAX_POOL: Joi.number()
			.default(10)
			.min(5)
			.description('sqldb max pool connection'),
		DB_MIN_POOL: Joi.number()
			.default(0)
			.min(0)
			.description('sqldb min pool connection'),
		DB_IDLE: Joi.number()
			.default(10000)
			.description('sqldb max pool idle time in miliseconds'),

		SMTP_HOST: Joi.string().description('server that will send the emails'),
		SMTP_PORT: Joi.number().description(
			'port to connect to the email server',
		),
		SMTP_USERNAME: Joi.string().description('username for email server'),
		SMTP_PASSWORD: Joi.string().description('password for email server'),
		EMAIL_FROM: Joi.string().description(
			'the from field in the emails sent by the app',
		),
	})
	.unknown();

const { value: envVars, error } = envVarsSchema
	.prefs({ errors: { label: 'key' } })
	.validate(process.env);

if (error) {
	throw new Error(`Config validation error: ${error.message}`);
}

export default {
	env: envVars.NODE_ENV,
	port: envVars.PORT,
	pagination: {
		limit: 10,
		page: 1,
	},
	jwt: {
		secret: envVars.JWT_SECRET,
		accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
		refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
		resetPasswordExpirationMinutes: 10,
	},
	cookie: {
		cookieExpirationHours: envVars.COOKIE_EXPIRATION_HOURS,
	},
	sqlDB: {
		host: envVars.DB_HOST,
		port: envVars.DB_PORT,
		user: envVars.SQL_USERNAME,
		username: envVars.DB_USERNAME,
		password: envVars.DB_PASSWORD,
		database: envVars.DB_DATABASE_NAME,
		dialect: envVars.DB_DIALECT,
		pool: {
			max: envVars.DB_MAX_POOL,
			min: envVars.DB_MIN_POOL,
			idle: envVars.DB_IDLE,
		},
		define: {
			/**
			 * All tables won't have "createdAt" and "updatedAt" Auto fields.
			 * References: https://sequelize.org/master/manual/model-basics.html#timestamps
			 */
			timestamps: false,
			// Table names won't be pluralized.
			freezeTableName: true,
			// Column names will be underscored.
			underscored: true,
		},
	},
	email: {
		smtp: {
			host: envVars.SMTP_HOST,
			port: envVars.SMTP_PORT,
			auth: {
				user: envVars.SMTP_USERNAME,
				pass: envVars.SMTP_PASSWORD,
			},
		},
		from: envVars.EMAIL_FROM,
	},
};
