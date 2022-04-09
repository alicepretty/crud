const express = require('express')
const router = express.Router()
const {
	getblogs,
	setblogs,
	Updateblogs,
	deleteblogs,
} = require('../Controllers/blogControllers');

router.get('/', getblogs)
	
router.post('/', setblogs)
router.put('/:id', Updateblogs) 
router.delete('/:id', deleteblogs) 


module .exports = router