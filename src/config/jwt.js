import { expressjwt } from 'express-jwt';
import config from './config.js';

async function isRevoked(_req, payload) {
  return false;
}

function jwt() {
	const { secret } = config.jwt;
	return expressjwt({
		secret,
		getToken: function fromHeaderOrQuerystring(req) {
			const token = req.headers.authorization
				? req.headers.authorization.split(' ')[1]
				: req.query.token;
			return token || null;
		},
		algorithms: ['HS256'],
		isRevoked,
	}).unless({
		path: [/\/v[1-9]\d*\/(auth|docs)(\/.*)?/],
	});
}

export default jwt;
