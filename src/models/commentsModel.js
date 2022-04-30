import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema(
	{
		Name: {
			type: String,
			required: true,
		},

		Email: {
			type: String,
			required: true,
		},

		Message: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true },
);

export default mongoose.model('comment', commentSchema);
