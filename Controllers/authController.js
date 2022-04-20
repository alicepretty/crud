
const asyncHandler = require('express-async-handler');
const Auth = require('../models/authModel');
const errorResponse = require('../utils/error');
const successResponse = require('../utils/success');
const {hashPassword ,checkPassword} = require('../middleware/hash')
const {signToken ,verifyToken} = require('../middleware/token')

// descr register a user
// route api/auth/register
// access public

const signup = async (req, res, next) => {
try {
			
			if (!req.body) {
				return errorResponse(res, 400, 'please fill all fields');
			}
			const password = req.body.password
		const user = await Auth.create({
			...req.body,
			password: hashPassword(password),
			confirmPassword: hashPassword(password),
		});

			const token = signToken({user});
			return successResponse(res, 201, 'User login successfully', token);
		} catch (error) {
			console.log(error);
			return errorResponse(res,500,`Internal server error ${error.message}`);
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
	const { email, password } = req.body
	let foundUser = await Auth.findOne({ email });
	if (!foundUser) {
		return errorResponse(res, 400, 'Invalid email or password' );
	}
	let userPassword = checkPassword(password, foundUser.password)
	if(!userPassword){
		return errorResponse(res, 400, 'Invalid email or password');
	}
		const { _id, Email } = foundUser;
			const token = signToken({_id, Email});
			return successResponse(res,201,'User login successfully',token);
	

	} catch (error) {
		console.log(error);
		res.status(500);
		throw new Error(`Internal server error ${error.message}`);
	}
});
module.exports = {
	signup,
    login
};
