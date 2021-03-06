// import { object, string } from 'joi'
import Joi from 'joi';

const schema = {
signupvalidate: 
	Joi.object().keys({
		firstName: Joi.string().required(),
		lastName: Joi.string().required(),
		Email: Joi.string().required().email(),
		password: Joi.string().required(),
		confirmPassword: Joi.string().required(),
}),
loginValidate: Joi.object().keys({
	Email: Joi.string().required().email(),
	password: Joi.string().required(),
}),
};

const { signupvalidate, loginValidate } = schema;

class AuthValidation {
	static verifySignup = async(req, res, next) => {
		const { error } = signupvalidate.validate(req.body);
		if (error) {
			throw new Error(
				res.status(400).json({
					error: error.details[0].message.replace(/["'`]+/g, ''),
				}),
			);
		}
		return next();
	};
	static verifyLogin = async(req, res, next) => {
		const { error } = loginValidate.validate(req.body);
		if (error) {
			throw new Error(
				res.status(400).json({
					error: error.details[0].message.replace(/["'`]+/g, ''),
				}),
			);
		}
		return next();
	};
	
}
export default AuthValidation;
