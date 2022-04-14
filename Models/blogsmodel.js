const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
			required: true,
		},
	},
	{ timestamps: true },
);

const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;
