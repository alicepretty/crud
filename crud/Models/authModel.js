import { Schema as _Schema, model } from 'mongoose';
const Schema = _Schema;

const userSchema = new Schema(
	{
		firstName: {
			type: String,
			required: true,
		},

		lastName: {
			type: String,
			required: true,
		},
		Email: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		confirmPassword: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true },
);

const Auth = model('Auth', userSchema);
export default Auth;
