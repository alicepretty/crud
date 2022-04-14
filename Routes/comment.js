const express = require('express')
const router = express.Router();

 const {
		createcomment,
		updatecomment,
		deleteComments,
 } = require('../Controllers/commentsControllers');
 router.route('/').post(createcomment);
  router.route('/:id').put(updatecomment);
  router.route('/:id').delete(deleteComments);




 module.exports= router