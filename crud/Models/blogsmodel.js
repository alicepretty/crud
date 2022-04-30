import { Schema as _Schema, model } from 'mongoose';
const Schema = _Schema;

const blogSchema = new Schema(
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

const Blog = model('Blog', blogSchema);
export default Blog;
