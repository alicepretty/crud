
const asyncHandler = require('express-async-handler');
const Comment = require('../Models/commentsModel')

const getComment = asyncHandler(async (req, res) => {
	const comment = await Comment.find();

	if (comment.length === 0) {
		res.status(200).json({ message: 'They are no comment yet!' });
	}

	res.status(200).json(comment);
});


//   @descr  getSinglecomment
// route api/comments
// access public

const getSinglecomment = asyncHandler(async (req, res) => {
	try {
		const comment = await Comment.findOne({ _id: req.params.id });

		if (!comment) {
			res.status(404).json({ message: 'No such comment  found!' });
		}

		res.status(200).json(comment);
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
		const comment = await Comment.create({
			Name: req.body.Name,
			Email: req.body.Email,
			Message: req.body.Message,
		});

		res.status(201).json({ message: 'Blog created successfully', comment });
	} catch (error) {
		console.log(error);
	}
});

//  @descrip edit comment
// route api/comment
// access public

const updatecomment = asyncHandler(async (req , res)=>{
let comment = await Comment.findOne({ _id: req.params.id}) 
	
	if(!comment){
		res.status(404).json({message: 'No comments found with such id'})
	}
	
	const updatedComment = await Comment.findOneAndUpdate({ id: req.params.id}, {...req.body})
	
   res.status(200).json({ message: `Successfuly updated comment`, updatedComment });
})

 const deletecomment = asyncHandler(async (req, res)=>{
	 let comment = await Comment.findOne({ _id: req.params.id });

	if (!comment) {
		res.status(404).json({ message: 'There is no such comment found with such id' });
	}

	const deletedcomment = await Comment.findOneAndDelete(
		{ _id: req.params.id }
	);
	

  res.status(200).json({ message: `Successfully deleted a blog`, deletedcomment});
})
 
   
module.exports = {
	getComment,
	getSinglecomment,
	setcomment,
	updatecomment,
	deletecomment,
};
    
