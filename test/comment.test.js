import mocha from 'mocha';
import chai, { expect, use } from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/index.js';
import {Blog, Comment} from '../src/models/blogsmodel.js';

expect();
use(chaiHttp);

const blog = {
title:
"BICT",
Email:
"test@gmail.com",
publishedby:
"Pretty",
content:
"Lorem ipsum dolor emet bla bla bla bla"
};


const { it, describe, after,before } = mocha;


describe('Testing comment endpoints', () => {
	before(async () => {
		await Blog.deleteMany({
			where: {},
			truncate: true,
		});
	});
	it('it should get all the comments', async () => {
		const Blog = await chai.request(app).post('/api/blogs').send(blog);
		const dummy = await chai
			.request(app)
			.post(`/api/blog/${Blog.body.blogs._id}/comments`)
			.send({
				Name: 'ptr',
				Email: 'test@gmail.com',
				Message: 'anith adk ldksdmc',
			});
		const res = await chai
			.request(app)
			.get(`/api/blog/${Blog.body.blogs._id}/comments`);
		// console.log(res);
		expect(res.status).to.be.equal(200);
		expect(res.body).to.be.a('object');
		expect(res.body).to.have.property(
			'message',
			'Successfully retrieved all comments',
		);
	});
	it('get single comment by id', async () => {
		const Blog = await chai.request(app).post('/api/blogs').send(blog);
		const dummy = await chai
			.request(app)
			.post(`/api/blog/${Blog.body.blogs._id}/comments`)
			.send({
			Name: 'ptr',
			Email: 'test@gmail.com',
			Message: 'anith adk ldksdmc',
		});
		const res = await chai.request(app).get(`/api/blog/${Blog.body.blogs._id}/${dummy.body.data.Comment[0]._id}`);
		expect(res.status).to.be.equal(200);
		expect(res.body).to.be.a('object');
		expect(res.body).to.have.property(
			'message',
			'Successfully retrieved comment',
		);
	});
	it('create a comment', async () => {
	const dummyBlog = await chai.request(app).post('/api/blogs').send(blog);
	const comment = {
		Name: 'ptr',
		Email: 'test@gmail.com',
		Message: 'anith adk ldksdmc',
	};
		const res = await chai.request(app).post(`/api/blog/${dummyBlog.body.blogs._id}/comments`).send(comment);
		expect(res.status).to.be.equal(201);
		expect(res.body).to.be.a('object');
		expect(res.body).to.have.property(
			'message',
			'Successfully created comment',
		);
	});

	it('delete comment', async () => {
		const dummyBlog = await chai.request(app).post('/api/blogs').send(blog);
		const dummy = await chai
			.request(app)
			.post(`/api/blog/${dummyBlog.body.blogs._id}/comments`)
			.send({
				Name: 'ptr',
				Email: 'test@gmail.com',
				Message: 'anith adk ldksdmc',
			});
		const id = dummy.body.data.Comment[0]._id;
		const res = await chai.request(app).delete(`/api/blog/${dummyBlog.body.blogs._id}/${id}`);
		expect(res.status).to.be.equal(200);
		expect(res.body).to.be.a('object');
		expect(res.body).to.have.property(
			'message',
			'Successfully deleted comment',
		);
	});
	after(async () => {
		await Comment.deleteMany({
			where: {},
			truncate: true,
		});
	});
});
