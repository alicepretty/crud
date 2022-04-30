import mocha from 'mocha';
import { should, use, request } from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';
import Commentmodel from '../Models/commentsModel';

should();
use(chaiHttp);

const comment = {
	Name: 'ptr',
	Email: 'test@gmail.com',
	Message: 'anith adk ldksdmc',
};

const { it, describe, after } = mocha;
import { expect } from 'chai';
// const { after } = require('mocha');

describe('Testing comment endpoints', () => {
	it('it should get all the comments', async () => {
		const dummy = await request(app).post('/api/comments').send(comment);
		const res = await request(app).get('/api/comments');
		expect(res.status).to.be.equal(200);
		expect(res.body).to.be.a('object');
		expect(res.body).to.have.property(
			'message',
			'Successfully retrieved all comments',
		);
	});
	it('get single comment by id', async () => {
		const dummy = await request(app).post('/api/comments').send(comment);
		const id = dummy.body.data._id;
		const res = await request(app).get(`/api/comments/${id}`);
		expect(res.status).to.be.equal(200);
		expect(res.body).to.be.a('object');
		expect(res.body).to.have.property(
			'message',
			'Successfully retrieved comment',
		);
	});
	it('create a comment', async () => {
		const res = await request(app).post('/api/comments').send(comment);
		expect(res.status).to.be.equal(201);
		expect(res.body).to.be.a('object');
		expect(res.body).to.have.property(
			'message',
			'Successfully created comment',
		);
	});
	it('update comment', async () => {
		const dummy = await request(app).post('/api/comments').send(comment);
		const id = dummy.body.data._id;
		const res = await request(app)
			.put(`/api/comments/${id}`)
			.send({ Name: 'New Name' });
		expect(res.status).to.be.equal(200);
		expect(res.body).to.be.a('object');
		expect(res.body).to.have.property(
			'message',
			'Successfully updated comment',
		);
	});

	it('delete comment', async () => {
		const dummy = await request(app).post('/api/comments').send(comment);
		const id = dummy.body.data._id;
		const res = await request(app).delete(`/api/comments/${id}`);
		expect(res.status).to.be.equal(200);
		expect(res.body).to.be.a('object');
		expect(res.body).to.have.property(
			'message',
			'Successfully deleted comment',
		);
	});
	after(async () => {
		await Commentmodel.deleteMany({
			where: {},
			truncate: true,
		});
	});
});
