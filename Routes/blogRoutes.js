const express = require('express')
const  BlogValidator = require('../validation/validator')

const router = express.Router()
const {
	getblogs,
	getSingleBlog,
	setblogs,
	Updateblogs,
	deleteblogs,
} = require('../Controllers/blogControllers');

router.get('/', getblogs)
	
router.post('/', BlogValidator.verifyCreate, setblogs);
router.get('/:id', getSingleBlog) 
router.put('/:id', Updateblogs) 
router.delete('/:id', deleteblogs)
module .exports = router