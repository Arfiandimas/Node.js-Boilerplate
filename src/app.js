import express from 'express';
import helmet from 'helmet';
import xss from 'xss-clean';
import compression from 'compression';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import httpStatus from 'http-status';
import { initPostgres } from './config/postgres.js';
import config from './config/config.js';
import morgan from './config/morgan.js';
import jwt from './config/jwt.js';
import { authLimiter } from './middlewares/rateLimiter.js';
import routes from './routes/v1/index.js';
import { errorConverter, errorHandler } from './middlewares/error.js';
import ApiError from './utils/ApiError.js';

const app = express();

if (config.env !== 'test') {
	app.use(morgan.successHandler);
	app.use(morgan.errorHandler);
}

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
// Some Node/Express configurations expose `req.query` as a getter-only property.
// `xss-clean` attempts to assign to `req.query` which can throw
// "Cannot set property query of #<IncomingMessage> which has only a getter".
// To avoid that, create a safe, writable shadow of `req.query` (and params/body
// if needed) before calling `xss()` so the sanitizer can assign without error.
app.use((req, res, next) => {
	try {
		if (req.query && typeof req.query === 'object') {
			Object.defineProperty(req, 'query', {
				value: { ...req.query },
				writable: true,
				configurable: true,
				enumerable: true,
			});
		}
		if (req.params && typeof req.params === 'object') {
			Object.defineProperty(req, 'params', {
				value: { ...req.params },
				writable: true,
				configurable: true,
				enumerable: true,
			});
		}
		if (req.body && typeof req.body === 'object') {
			Object.defineProperty(req, 'body', {
				value: { ...req.body },
				writable: true,
				configurable: true,
				enumerable: true,
			});
		}
	} catch (e) {
		// If we couldn't redefine the properties for any reason, swallow the error
		// and allow xss-clean to run; it may still fail, but we avoid crashing here.
	}
	next();
});

app.use(xss());

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
app.options(/.*/, cors());

app.use(cookieParser());

// jwt authentication
app.use(jwt());

// connect to postgres database
app.use((req, _, next) => {
	req.postgres = initPostgres;
	next();
});

// limit repeated failed requests to auth endpoints
if (config.env === 'production') {
	app.use('/v1/auth', authLimiter);
}

// v1 api routes
app.use('/v1', routes);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
	next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

export default app;
