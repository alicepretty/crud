import asyncHandler from 'express-async-handler';
import uploadimage from '../middleware/photo.js';
import errorResponse from '../utils/error.js';
import {Blog} from '../models/blogsmodel.js';
// descr get a blogs
// route api/getblogs
// access private

const getblogs = asyncHandler(async (req, res) => {
	try {
		const blogs = await Blog.find();
	
		if (blogs.length === 0) {
			res.status(204).json({ message: 'They are no blogs yet!' });
		}
	
		res.status(200).json({ message: 'All blogs fetched successfully', blogs});
	} catch (error) {
		return errorResponse(res, 500, `Error while fetching data ${error.message}`)
	}
});

const getSingleBlog = asyncHandler(async (req, res) => {
	try {
		const blogs = await Blog.findOne({ _id: req.params.blogId });

		res.status(200).json({ message: 'Blog fetched successfully', blogs});
	} catch (error) {
		if (error.kind == 'ObjectId') {
			res.status(404).json({ message: 'No such blog found!' });
		} else {
			res.status(500).json({
				message:
					'Oops, problem while fetchig blog! Please check the server!',
			});
			console.log(error);
		}
	}
});

// descr post a blogs
// route api/blogs
// access private

const setblogs = asyncHandler(async (req, res) => {
	// if (!req.body) {
	// 	throw new Error(res.status(400), 'please fill all fields');
	// }
	const blogs = await Blog.create({
		...req.body,
		articleImageUrl: '',
	});
	if (req.files) {
		const image = await uploadimage(req);
		blogs.articleImageUrl = image.url;
		blogs.save();
	}

	return res
		.status(201)
		.json({ message: 'Blog created successfully', blogs });
});
// descr get a blogs
// route api/getblogs
// access private

const Updateblogs = asyncHandler(async (req, res) => {
	let blog = await Blog.findOne({ _id: req.params.blogId });

	if (!blog) {
		res.status(404).json({ message: 'No blog found with such id' });
	}

	const updatedBlog = await Blog.findOneAndUpdate(
		{ id: req.params.blogId },
		{ ...req.body },
	);

	const updated = await Blog.findOne({ _id: req.params.blogId });

	res.status(201).json({ message: `Successfuly updated blog`, updated });
});
// descr get a blogs
// route api/getblogs
// access private

const deleteblogs = asyncHandler(async (req, res) => {
	let blog = await Blog.findOne({ _id: req.params.blogId });

	if (!blog) {
		res.status(404).json({ message: 'No blog found with such id' });
	}

	const deletedBlog = await Blog.findOneAndDelete({
		_id: req.params.blogId,
	});

	res.status(200).json({
		message: `Successfully deleted a blog`
	});
});
export { getblogs, setblogs, Updateblogs, getSingleBlog, deleteblogs };
