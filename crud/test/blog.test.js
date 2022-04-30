import mocha from 'mocha';
import { should, use, request } from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';
import Blogmodel from '../models/blogsmodel';

should();
use(chaiHttp);

const blog = {
	title: 'Test blog',
	Email: 'test@gmail.com',
	publishedby: 'Pretty',
	content: 'Lorem ipsum dolor emet bla bla bla bla',
};

const { it, describe, after } = mocha;
import { expect } from 'chai';
// const { after } = require('mocha');

describe('Testing blog endpoints', () => {
	after(async () => {
		await Blogmodel.deleteMany({
			where: {},
			truncate: true,
		});
	});
	it('it should get all the blogs', async () => {
		const res = await request(app).get('/api/blogs');
		expect(res.status).to.be.equal(200);
		expect(res.body).to.be.a('object');
		expect(res.body).to.have.property('message', 'They are no blogs yet!');
	});
	it('get single blog by id', async () => {
		const dummy = await request(app).post('/api/blogs').send(blog);
		const id = dummy.body.blogs._id;
		const res = await request(app).get(`/api/blogs/${id}`);
		expect(res.status).to.be.equal(200);
		expect(res.body).to.be.a('object');
	});
	it('create a blog', async () => {
		const res = await request(app).post('/api/blogs').send(blog);
		expect(res.status).to.be.equal(201);
		expect(res.body).to.be.a('object');
		expect(res.body).to.have.property(
			'message',
			'Blog created successfully',
		);
	});
	it('update blog', async () => {
		const dummy = await request(app).post('/api/blogs').send(blog);
		const id = dummy.body.blogs._id;
		const res = await request(app)
			.put(`/api/blogs/${id}`)
			.send({ title: 'New title' });
		expect(res.status).to.be.equal(201);
		expect(res.body).to.be.a('object');
		expect(res.body).to.have.property(
			'message',
			'Successfuly updated blog',
		);
	});

	it('delete blog', async () => {
		const dummy = await request(app).post('/api/blogs').send(blog);
		const id = dummy.body.blogs._id;
		const res = await request(app).delete(`/api/blogs/${id}`);
		expect(res.status).to.be.equal(200);
		expect(res.body).to.be.a('object');
		expect(res.body).to.have.property(
			'message',
			'Successfully deleted a blog',
		);
	});
});
