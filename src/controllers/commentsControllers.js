import asyncHandler from 'express-async-handler';
import Commentmodel from '../models/commentsModel.js';
import successResponse from '../utils/success.js';

const getComment = asyncHandler(async (req, res) => {
	const comment = await Commentmodel.find();
	try {
		if (comment.length === 0) {
			res.status(200).json({ message: 'They are no comment yet!' });
		}

		return successResponse(
			res,
			200,
			'Successfully retrieved all comments',
			comment,
		);
	} catch (error) {
		console.log(error);
	}
});

//   @descr  getSinglecomment
// route api/comments
// access public

const getSinglecomment = asyncHandler(async (req, res) => {
	try {
		const comment = await Commentmodel.findOne({ _id: req.params.id });

		if (!comment) {
			res.status(404).json({ message: 'No such comment  found!' });
		}

		return successResponse(
			res,
			200,
			'Successfully retrieved comment',
			comment,
		);
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
		const comment = await Commentmodel.create({
			Name: req.body.Name,
			Email: req.body.Email,
			Message: req.body.Message,
		});

		return successResponse(
			res,
			201,
			'Successfully created comment',
			comment,
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

const updatecomment = asyncHandler(async (req, res) => {
	try {
		let comment = await Commentmodel.findOne({ _id: req.params.id });

		if (!comment) {
			res.status(404).json({ message: 'No comments found with such id' });
		}

		await Commentmodel.updateOne({ id: req.params.id }, { ...req.body });

		const updatedComment = await Commentmodel.findOne({
			_id: req.params.id,
		});

		return successResponse(
			res,
			200,
			'Successfully updated comment',
			updatedComment,
		);
	} catch (error) {
		res.status(500).json({
			message: `Internal server error ${error.message}`,
		});
		console.log(error);
	}
});

const deletecomment = asyncHandler(async (req, res) => {
	try {
		let comment = await Commentmodel.findOne({ _id: req.params.id });

		if (!comment) {
			res.status(404).json({
				message: 'There is no such comment found with such id',
			});
		}

		await Commentmodel. deleteOne({ _id: req.params.id });

		return successResponse(res, 200, 'Successfully deleted comment');
	} catch (error) {
		res.status(500).json({
			message: `Internal server error ${error.message}`,
		});
		console.log(error);
	}
});

export {
	getComment,
	getSinglecomment,
	setcomment,
	updatecomment,
	deletecomment,
};
