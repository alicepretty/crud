const express = require('express')
const CommentValidator = require('../validation/commentvalidation')
 const {validate} = require('express-validation')
const router = express.Router();

 const {
		getComment,
		getSinglecomment,
		setcomment,
		updatecomment,
		deletecomment,
 } = require('../Controllers/commentsControllers');
router.get('/',  getComment);
router.get('/:id', getSinglecomment); 
router.post('/', validate( CommentValidator.createOrupdatecomment) , setcomment);
router.put('/:id', validate( CommentValidator.createOrupdatecomment) , updatecomment);
router.delete('/:id', deletecomment);

 module.exports= router