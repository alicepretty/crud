import asyncHandler from 'express-async-handler';
import Authmodel from '../models/authModel.js';
import errorResponse from '../utils/error.js';
import successResponse from '../utils/success.js';
import encryption from '../middleware/hash.js';
import { config } from 'dotenv';
config();

const { hashPassword, checkPassword, signToken, verifyToken } = encryption;


// descr register a user
// route api/auth/register
// access public

const signup = async (req, res, next) => {
	try {
		const password = req.body.password;
		const user = await Authmodel.create({
			...req.body,
			password: hashPassword(password),
			confirmPassword: hashPassword(password),
		});

		const token = await signToken({ user });
		return successResponse(res, 201, 'User registered successfully', token);
	} catch (error) {
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

const login = async (req, res) => {
	try {
		const { Email, password } = req.body;
		let foundUser = await Authmodel.findOne({ Email });
		if (!foundUser) {
			return errorResponse(res, 400, 'Invalid email or password');
		}
		let userPassword = checkPassword(password, foundUser.password);
		if (!userPassword) {
			return errorResponse(res, 409, 'Invalid email or password');
		}
		const { _id } = foundUser;
		const token = await signToken({ _id, email:foundUser.Email });
		res.header('Authorization', `Bearer ${token}`);
		return successResponse(res, 201, 'User login successfully', token);
	} catch (error) {
		console.log(error);
		res.status(500);
		throw new Error(`Internal server error ${error.message}`);
	}
};
// @desc     Get current logged in user
// @route    GET /api/auth/me
// access    Private,

const logged = async (req, res, next) => {
	try {
		const token = req.headers.authorization.replace('Bearer ', '');
		const newtoken = await verifyToken(token, process.env.Secret);
		const { _id, email } = newtoken;
		return successResponse(res, 200, 'User is logged in!', { _id, email });
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
