// import { object, string } from 'joi'
import Joi from 'joi';

const signupvalidate = Joi.object({
	firstName: Joi.string().required(),
	lastName: Joi.string().required(),
	Email: Joi.string().required().email(),
	password: Joi.string().required(),
	confirmPassword: Joi.string().required(),
});
const loginValidate = Joi.object({
	Email: Joi.string().required().email(),
	password: Joi.string().required(),
});

class AuthValidation {
	static verifySignup = (req, res) => {
		const { error } = signupvalidate.validate(req.body);
		if (error) {
			throw new Error(
				res.status(400).json({
					error: error.details[0].message.replace(/["'`]+/g, ''),
				}),
			);
		}
	};
	static verifyLogin = (req, res) => {
		const { error } = loginValidate.validate(req.body);
		if (error) {
			throw new Error(
				res.status(400).json({
					error: error.details[0].message.replace(/["'`]+/g, ''),
				}),
			);
		}
	};
}
export default AuthValidation;
