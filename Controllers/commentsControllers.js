const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');
const Comment = require('../Models/commentsModel')

exports.createcomment = asyncHandler (async(req, res) => {
 const {Name,Email,Message} = req.body
 const comment = await Comment.create({Name,Email,Message});
  res.status(201).json({
	  success:true,
	  data:comment,
	  Message:'comment created',
  })
})

// for update

exports.updatecomment = asyncHandler(async(req, res)=>{
	const { Name, Email, Message } = req.body;
	const existcomment= await Comment.findOne({_id:req.params.id})
	if(existcomment){
		existcomment.Name = Name;
		existcomment.Email = Email;
		existcomment.Message = Message;
		const updatedcomment = await existcomment.save();
		res.status(201).json({
			success: true,
			data: updatedcomment,
			Message: 'comment updated',
		});
	}else{
		res.status(401).json({
			success: false,
			data: null,
			Message: 'not found',
		});
	}
     
	// delete
	exports.deletecomment = asyncHandler(async(req, res)=>{
	// const { Name, Email, Message } = req.body;
	const existcomment= await Comment.findOne({_id:req.params.id});
	if(existcomment){
		 await existcomment.remove();
		res.status(201).json({
			success: true,
			data: null,
			Message: 'comment deleted successfully',
		});
	}else{
		res.status(401).json({
			success: false,
			data: null,
			Message: 'not found',
		});
	}
})

})
