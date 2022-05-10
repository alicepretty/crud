import asyncHandler from 'express-async-handler';
import {Blog, Comment} from '../models/blogsmodel.js';
import successResponse from '../utils/success.js';
import errorResponse from '../utils/error.js'

const getComments = async (req, res) => {
	try {
	const {blogId} = req.params;
	const blog = await Blog.findById(blogId);
	if (!blog) {
		res.status(404).json({ message: 'No such blog found!' });
		const comment = await Comment.find();
		if (!comment) {
			res.status(200).json({ message: 'They are no comments yet!' });
		}
	}else {

		
		return successResponse(
			res,
			200,
			'Successfully retrieved all comments',
			blog.Comment,
			);
		}
		} catch (error) {
		console.log(error);
	}
};

//   @descr  getSinglecomment
// route api/comments
// access public

const getSinglecomment = asyncHandler(async (req, res) => {
	try {
		const blogId = req.params.blogId;
		const id = req.params.commentId;
		const blog = await Blog.findById(blogId);
		if (blog) {
			const comment = await Comment.findById(id);
			if (!comment) {
				return errorResponse(res, 404, 'No such comment found!')
			}
		 return successResponse(
			 res,
			 200,
			 'Successfully retrieved comment',
			 comment,
			 );
			}
       else{
		res.status(404).json({ message: 'No such blog found!' })};
	} catch (error) {
		if (error.kind == 'ObjectId') {
			res.status(404).json({ message: 'No such comment found!' });
		} else {
			res.status(500).json({
				message:
					'Oops, problem while getting a comment! Please check the server!',
			});
			console.log(error);
		}
	}
});

// descr post a comment
// route api/comments
// access public

const setcomment = asyncHandler(async (req, res) => {
	try {
		if (!req.body) {
			res.status(400);
			throw new Error('please fill all fields');
		}
		const {blogId} = req.params;
		const comment = {
			blogId,
			Name: req.body.Name,
			Email: req.body.Email,
			Message: req.body.Message,
		};

		 const blog = await Blog.findById(blogId)

		 if(!blog){
			 return errorResponse(res ,404 , 'no such blog')
			}
			else{
				const newComment = await Comment.create(comment);
				blog.Comment.push(newComment),
				blog.save();
			}
    
		return successResponse(
			res,
			201,
			'Successfully created comment',
			blog,
		);
	} catch (error) {
		console.log(error);
		res.status(500).json({
			message: `Internal server error ${error.message}`,
		});
	}
});

//  @descrip edit comment
// route api/comment
// access public


const deletecomment = asyncHandler(async (req, res) => {
	try {
		const id = req.params.commentId;
		const blogId = req.params.blogId;
		const blog = await Blog.findById(blogId);
		if (!blog) {
			res.status(404).json({ message: 'No such blog found!' });
		} else {
			const comment = await Comment.findById(id);
			if (!comment) {
				res.status(404).json({
					message: 'There is no such comment found with such id',
				});
			}
			
			await Comment.deleteOne({_id: id});
		}

		return successResponse(res, 200, 'Successfully deleted comment');
	} catch (error) {
		res.status(500).json({
			message: `Internal server error ${error.message}`,
		});
		console.log(error);
	}
});

export {
	getComments,
	getSinglecomment,
	setcomment,
	deletecomment,
};
