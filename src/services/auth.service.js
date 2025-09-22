import httpStatus from 'http-status';
import * as userService from './user.service.js';
import ApiError from '../utils/ApiError.js';
import { decryptData } from '../utils/auth.js';

async function loginUserWithEmailAndPassword(req) {
	const { email, password } = req.body;
	const user = await userService.getUserByEmail(email);
	if (!user) {
		throw new ApiError(
			httpStatus.UNAUTHORIZED,
			'Invalid email or password',
		);
	}
	const isPasswordMatch = await decryptData(password, user.password);
	if (!isPasswordMatch) {
		throw new ApiError(
			httpStatus.UNAUTHORIZED,
			'Invalid email or password',
		);
	}
	delete user.password;

	return user;
}

export { loginUserWithEmailAndPassword };
