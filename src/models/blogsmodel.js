import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},

		Email: {
			type: String,
			required: true,
		},
		articleImageUrl: {
			type: String,
		},
		publishedby: {
			type: String,
			required: true,
		},
		content: {
			type: String,
			required: true,
		},
		releasedate: {
			type: Date,
			default: Date.now,
		},
	},
	{ timestamps: true },
);

export default mongoose.model('Blog', blogSchema);
