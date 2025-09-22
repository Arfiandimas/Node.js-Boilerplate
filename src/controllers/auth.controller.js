import httpStatus from 'http-status';
import catchAsync from '../utils/catchAsync.js';
import {
	authService,
	userService,
	emailService,
	tokenService,
} from '../services/index.js';
import { verifyToken } from '../utils/auth.js';

const register = catchAsync(async (req, res) => {
	const user = await userService.createUser(req);
	const tokens = await tokenService.generateAuthTokens({
		userId: user.id,
		roleId: user.role_id,
	});
	delete user.password;
	res.status(httpStatus.CREATED).send({ user, tokens });
});

const login = catchAsync(async (req, res) => {
	const user = await authService.loginUserWithEmailAndPassword(req);
	const tokens = await tokenService.generateAuthTokens({
		userId: user.id,
		roleId: user.role_id,
	});
	res.send({ user, tokens });
});

const forgotPassword = catchAsync(async (req, res) => {
	const resetPasswordToken = await tokenService.generateResetPasswordToken(
		req.body.email,
	);
	await emailService.sendResetPasswordEmail(
		req.body.email,
		resetPasswordToken,
	);
	res.send({ success: true });
});

const resetPassword = catchAsync(async (req, res) => {
	const { id } = await verifyToken(req.query.token);
	req.body.id = id;
	await userService.updateUser(req);
	res.send({ success: true });
});

export { register, login, forgotPassword, resetPassword };

export default { register, login, forgotPassword, resetPassword };
