const asyncHandler = require('express-async-handler')
 const uploadimage = require('../middleware/photo')
 const errorResponse = require('../utils/error')
const Blog = require('../models/blogsmodel')
// descr get a blogs
// route api/getblogs
// access private

const getblogs = asyncHandler(async (req , res) =>{
   
    const blogs = await Blog.find()

	if(blogs.length === 0){
		res.status(200).json({message: 'They are no blogs yet!'})
	}

    res.status(200).json(blogs)
})

const getSingleBlog = asyncHandler(async (req, res) => {
	
	try {
		const blogs = await Blog.findOne({ _id: req.params.id });

		if (!blogs) {
			res.status(404).json({ message: 'No such blog found!' });
		}

		res.status(200).json(blogs);		
	} catch (error) {
		if (error.kind == "ObjectId") {
			res.status(404).json({ message: 'No such blog found!' });
		}else{		res.status(500).json({
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

const setblogs =asyncHandler( async(req , res) => {

	    // if (!req.body) {
		// 	throw new Error(res.status(400), 'please fill all fields');
		// }
		const blogs = await Blog.create({
			...req.body,
			articleImageUrl: '',
		});
		const image = await uploadimage(req);
		if (req.files) {
			blogs.articleImageUrl = image;
			blogs.save();
		}

		return res.status(201).json({ message: 'Blog created successfully', blogs });


})
// descr get a blogs
// route api/getblogs
// access private

const Updateblogs =asyncHandler( async (req , res) => {

	let blog = await Blog.findOne({ _id: req.params.id}) 
	
	if(!blog){
		res.status(404).json({message: 'No blog found with such id'})
	}
	
	const updatedBlog = await Blog.findOneAndUpdate({ id: req.params.id}, {...req.body})
	
   res.status(200).json({ message: `Successfuly updated blog`, updatedBlog });
})
// descr get a blogs
// route api/getblogs
// access private

const deleteblogs = asyncHandler(async (req , res) => {
	let blog = await Blog.findOne({ _id: req.params.id });

	if (!blog) {
		res.status(404).json({ message: 'No blog found with such id' });
	}

	const deletedBlog = await Blog.findOneAndDelete(
		{ _id: req.params.id }
	);
	

  res.status(200).json({ message: `Successfully deleted a blog`, deletedBlog });
})
module.exports = {
	getblogs,
	setblogs,
	Updateblogs,
	getSingleBlog,
	deleteblogs,
};