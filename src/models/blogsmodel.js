import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
	blogId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Post',
		required: true,
	},
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
});

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
		Comment: [ commentSchema],
		releasedate: {
			type: Date,
			default: Date.now,
		},
	},
	{ timestamps: true },
);

export const Comment = mongoose.model('Comment', commentSchema);
export const Blog = mongoose.model('Blog', blogSchema);
