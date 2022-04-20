const Joi = require('joi')


const blogCreate = Joi.object({
	title: Joi.string().min(2).required(),
	Email: Joi.string()
		.email()
		.regex(
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{2,5}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
		)
		.required(),
	articleImageUrl: Joi.string(),
	publishedby: Joi.string().required(),
	content: Joi.string().min(25).required(),
});

 class BlogValidation {
		static verifyCreate = (req, res) => {
			const { error } = blogCreate.validate(req.body);
			if (error) {
				throw new Error(
					res.status(400).json({
						error: error.details[0].message.replace(/["'`]+/g, ''),
					}),
				);
			}
		};
 }
 module.exports = BlogValidation;