import asyncHandler from 'express-async-handler';
import Authmodel from '../Models/authModel';
import errorResponse from '../utils/error';
import successResponse from '../utils/success';
import { hashPassword, checkPassword } from '../middleware/hash';
import { signToken, verifyToken } from '../middleware/token';
import { config } from 'dotenv';
config();

// descr register a user
// route api/auth/register
// access public

const signup = async (req, res, next) => {
	try {
		if (!req.body) {
			return errorResponse(res, 400, 'please fill all fields');
		}
		const password = req.body.password;
		const user = await Authmodel.create({
			...req.body,
			password: hashPassword(password),
			confirmPassword: hashPassword(password),
		});

		const token = signToken({ user });
		return successResponse(res, 201, 'User login successfully', token);
	} catch (error) {
		console.log(error);
		return errorResponse(
			res,
			500,
			`Internal server error ${error.message}`,
		);
	}
};

// @descr login a user
// @route api/auth/login
// @access public

const login = asyncHandler(async (req, res) => {
	try {
		if (!req.body) {
			return errorResponse(res, 400, 'please fill all fields');
		}
		const { email, password } = req.body;
		let foundUser = await Authmodel.findOne({ email });
		if (!foundUser) {
			return errorResponse(res, 400, 'Invalid email or password');
		}
		let userPassword = checkPassword(password, foundUser.password);
		if (!userPassword) {
			return errorResponse(res, 400, 'Invalid email or password');
		}
		const { _id, Email } = foundUser;
		const token = signToken({ _id, Email });
		res.header('Authorization', `Bearer ${token}`);
		return successResponse(res, 201, 'User login successfully', token);
	} catch (error) {
		console.log(error);
		res.status(500);
		throw new Error(`Internal server error ${error.message}`);
	}
});
// @desc     Get current logged in user
// @route    GET /api/auth/me
// access    Private,

const logged = async (req, res, next) => {
	try {
		const token = req.headers.authorization.replace('Bearer ', '');
		const newtoken = verifyToken(token, process.env.Secret);
		const { _id, Email } = newtoken;
		return successResponse(res, 200, 'User is logged in!', { _id, Email });
	} catch (err) {
		console.log(err);
		return errorResponse(
			res,
			500,
			'Error getting user! Please provide sign in or check the provided credentials!',
		);
	}
};
export { signup, login, logged };
