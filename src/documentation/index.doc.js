import { Router } from 'express';
import { serve, setup } from 'swagger-ui-express';

const docrouter = Router();

const local = process.env.LOCAL_HOST;
const remote = process.env.REMOTE_HOST;

const options = {
	openapi: '3.0.1',
	info: {
		title: 'My Portfolio website',
		version: '1.0.0',
		description: 'Nodejs API for my portfolio app.',
	},
	host: process.env === 'production' ? remote : local,
	basePath: '/api',
	security: [
		{
			bearerAuth: [],
		},
	],
	tags: [
		{ name: 'Auth', description: 'Authentication routes' },
		{ name: 'Blog', description: 'Blog article routes' },
		{ name: 'Comment', description: 'Comments routes' },
	],
	paths: {
		'/api/auth/register': {
			post: {
				tags: ['Auth'],
				summary: 'Register User',
				description: 'User registration',
				security: [],
				parameters: [],
				requestBody: {
					content: {
						'application/json': {
							schema: {
								$ref: '#/components/schemas/User',
							},
							example: {
								firstName: 'Jane',
								lastName: 'Doe',
								Email: 'jane.doe@gmail.com',
								password: 'Password@2022',
								confirmPassword: 'Password@2022',
							},
						},
					},
					required: true,
				},
				responses: {
					201: {
						description: 'User registered successfully',
					},
					400: {
						description: 'Please fil allfields!',
					},
					500: {
						description: 'Internal Server Error',
					},
				},
			},
		},
		'/api/auth/login': {
			post: {
				tags: ['Auth'],
				summary: 'Login Admin',
				description: 'User login',
				security: [],
				parameters: [],
				requestBody: {
					content: {
						'application/json': {
							schema: {
								$ref: '#/components/schemas/User',
							},
							example: {
								Email: 'john.doe@gmail.com',
								password: 'Password@2022',
							},
						},
					},
					required: true,
				},
				responses: {
					200: {
						description: 'User registered successfully',
					},
					400: {
						description: 'Please fill all fields!',
					},
					401: {
						description: 'Invalid email or password',
					},
					500: {
						description: 'Internal Server Error',
					},
				},
			},
		},
		'/api/auth/me': {
			get: {
				tags: ['Auth'],
				summary: 'User logged in',
				description: 'Get logged user',
				parameters: [],
				requestBody: [],
				responses: {
					200: {
						description: 'User is logged in!',
					},
					500: {
						description:
							'Error getting user! Please provide sign in or check the provided credentials!',
					},
				},
			},
		},
		'/api/blogs': {
			get: {
				tags: ['Blog'],
				summary: 'Get all posted blogs',
				description: 'Retrieve all blog articles',
				security: [],
				parameters: [],
				requestBody: [],
				responses: {
					200: {
						description: 'Blog retrieved successfully',
					},
					401: {
						description: 'No such blog found!',
					},
					500: {
						description: 'Internal Server Error',
					},
				},
			},
			post: {
				tags: ['Blog'],
				summary: 'create a blog post',
				description: 'Create blog',
				security: [],
				parameters: [],
				requestBody: {
					content: {
						'multipart/form-data': {
							schema: {
								$ref: '#/components/schemas/Blog',
							},
						},
					},
					required: true,
				},
				responses: {
					200: {
						description: 'Blog created successfully',
					},
					400: {
						description: 'Validation Error',
					},
					500: {
						description: 'Error while creating blog',
					},
				},
			},
		},
		'/api/blogs/{blogId}': {
			get: {
				tags: ['Blog'],
				summary: 'Get a blog post by Id',
				description: 'Retrieve single blog articles',
				security: [],
				parameters: [
					{
						name: 'blogId',
						in: 'path',
						required: true,
					},
				],
				requestBody: [],
				responses: {
					200: {
						description: 'Blog retrieved successfully',
					},
					404: {
						description: 'No such blog found!',
					},
					500: {
						description: 'Internal Server Error',
					},
				},
			},
			put: {
				tags: ['Blog'],
				summary: 'modify a blog post',
				description: 'Update blog',
				security: [],
				parameters: [
					{
						name: 'blogId',
						in: 'path',
						required: true,
					},
				],
				requestBody: {
					content: {
						'multipart/form-data': {
							schema: {
								type: 'object',

								properties: {
									title: {
										type: 'string',
										description: 'Blog title',
									},
									Email: {
										type: 'string',
										description: "Blog publisher's email",
									},
									content: {
										type: 'string',
										description: 'Blog content',
									},
									imageUrl: {
										type: 'string',
										description: 'Blolg image url',
										format: 'binary',
									},
									publishedby: {
										type: 'string',
										description: 'Blog publisher names ',
									},
								},
							},
						},
					},
				},
				responses: {
					201: {
						description: 'Blog updated successfully',
					},
					400: {
						description: 'Validation Error',
					},
					500: {
						description: 'Error while updating blog',
					},
				},
			},
			delete: {
				tags: ['Blog'],
				summary: 'delete a blog',
				description: 'Delete blog',
				security: [],
				parameters: [
					{
						in: 'path',
						name: 'blogId',
						required: true,
					},
				],
				requestBody: [],
				responses: {
					200: {
						description: 'Blog deleted successfully',
					},
					500: {
						description: 'Error while creating blog',
					},
				},
			},
		},
		'/api/blog/{blogId}/comments': {
			get: {
				tags: ['Comment'],
				summary: 'get comments of a blog',
				description: 'Getting all comments',
				security: [],
				parameters: [
					{
						name: 'blogId',
						in: 'path',
						required: true,
					},
				],
				responses: {
					200: {
						description: 'successfully',
					},
					500: {
						description: 'Internal Server Error',
					},
				},
			},
			post: {
				tags: ['Comment'],
				summary: 'create comments of a blog',
				security: [],
				description: 'Creating comment',
				parameters: [
					{
						name: 'blogId',
						in: 'path',
						required: true,
					},
				],
				requestBody: {
					content: {
						'application/json': {
							schema: {
								$ref: '#/components/schemas/Comment',
							},
							example: {
								Name: 'John Doe',
								Email: 'john@gmail.com',
								Message: 'testing message',
							},
						},
					},
					required: true,
				},
				responses: {
					200: {
						description: 'successfully',
					},
					500: {
						description: 'Internal Server Error',
					},
				},
			},
		},
		'/api/blog/{blogId}/{commentId}': {
			get: {
				tags: ['Comment'],
				description: 'Getting single comment by id',
				security: [],
				parameters: [
					{
						in: 'path',
						name: 'blogId',
						required: true,
					},
					{
						in: 'path',
						name: 'commentId',
						required: true,
					},
				],
				responses: {
					200: {
						description: 'successfully',
					},
					500: {
						description: 'Internal Server Error',
					},
				},
			},
			delete: {
				tags: ['Comment'],
				description: 'Delete comment by id',
				security: [],
				parameters: [
					{
						in: 'path',
						name: 'blogId',
						required: true,
					},
					{
						in: 'path',
						name: 'commentId',
						required: true,
					},
				],
				responses: {
					200: {
						description: 'successfully',
					},
					500: {
						description: 'Internal Server Error',
					},
				},
			},
		},
	},
	components: {
		schemas: {
			User: {
				type: 'object',

				properties: {
					id: {
						type: 'string',
						description: 'The auto-generated id of the user',
					},
					firstName: {
						type: 'string',
						description: "User's firstname",
					},
					lastName: {
						type: 'string',
						description: "User's lastname",
					},
					password: {
						type: 'string',
						description: "User's password",
					},
					confirmPassword: {
						type: 'string',
						description: "User's password",
					},
					Email: {
						type: 'string',
						description: "User's email",
					},
				},
			},
			Blog: {
				type: 'object',

				properties: {
					id: {
						type: 'string',
						description: 'The auto-generated id of the blog',
					},
					title: {
						type: 'string',
						description: 'Blog title',
					},
					Email: {
						type: 'string',
						description: "Blog publisher's email",
					},
					content: {
						type: 'string',
						description: 'Blog content',
					},
					imageUrl: {
						type: 'string',
						description: 'Blolg image url',
						format: 'binary',
					},
					publishedby: {
						type: 'string',
						description: 'Blog publisher names ',
					},
					createdAt: {
						type: 'string',
						description: 'Blog creation date',
						format: 'date',
					},
				},
			},
			Comment: {
				type: 'object',

				properties: {
					blogId: {
						type: 'string',
						description: 'The auto-generated id of the message',
					},
					Name: {
						type: 'string',
						description: "Commentator's name",
					},
					Email: {
						type: 'string',
						description: "Commentator's email",
					},
					Message: {
						type: 'string',
						description: 'Comment message',
					},
				},
			},
		},

		securitySchemes: {
			bearerAuth: {
				type: 'http',
				scheme: 'bearer',
				bearerFormat: 'JWT',
			},
		},
	},
};

docrouter.use('/', serve, setup(options));

export default docrouter;
