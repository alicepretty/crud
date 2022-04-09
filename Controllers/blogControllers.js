const asyncHandler = require('express-async-handler')

// descr get a blogs
// route api/getblogs
// access private

const getblogs = asyncHandler(async (req , res) => {
    res.status(200).json({ message: 'get a blog' });
})
// descr post a blogs
// route api/blogs
// access private

const setblogs =asyncHandler( async(req , res) => {

    if(!req.body.text){
        res.status(400)
        throw new Error('please add a text field')
    }
    res.status(200).json({ message: 'create  a blog' });
})
// descr get a blogs
// route api/getblogs
// access private

const Updateblogs =asyncHandler( async (req , res) => {
   res.status(200).json({ message: `update  a blog ${req.params.id}` });
})
// descr get a blogs
// route api/getblogs
// access private

const deleteblogs = asyncHandler(async (req , res) => {
  res.status(200).json({ message: `delete a blog ${req.params.id}` });
})
module.exports = {
	getblogs,
	setblogs,
	Updateblogs,
	deleteblogs,
};