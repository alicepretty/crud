const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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

const Auth = mongoose.model('Auth', userSchema);
module.exports = Auth;
