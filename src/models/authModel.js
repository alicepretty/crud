import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
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

export default mongoose.model('Auth',userSchema);
