import mocha from 'mocha';
import { should, use, request } from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';
import  Authmodel from '../models/authModel';

should();
use(chaiHttp);

const signup = {
	firstName: 'Ani',
	lastName: 'pol',
	Email: 'pppp@gmail.com',
	password: '12345',
	confirmPassword: '12345',
};
const { it, describe, after } = mocha;
import { expect } from 'chai';

describe('Testing  signup endpoints', async () => {
	after(async () => {
		await Authmodel.deleteMany({
			where: {},
			truncate: true,
		});
	});
	it('it should register ,login and get logged user', async () => {
		const res = await request(app)
			.post('/api/auth/register')
			.send(signup);
		expect(res.status).to.be.equal(201);
		expect(res.body).to.have.property('message', 'User login successfully');
	});

	it('it should login user.', async () => {
		const res = await request(app)
			.post('/api/auth/register')
			.send(signup);
		const res1 = await request(app)
			.post('/api/auth/login')
			.send({ email: signup.Email, password: signup.password });
		expect(res1.status).to.be.equal(201);
		expect(res1.body).to.have.property(
			'message',
			'User login successfully',
		);
	});
	it('it should get logged user', async () => {
		const res = await request(app)
			.post('/api/auth/register')
			.send(signup);
		const res1 = await request(app)
			.post('/api/auth/login')
			.send({ email: signup.Email, password: signup.password });

		const token = `Bearer ${res1.body.data}`;
		const res2 = await request(app)
			.get('/api/auth/me')
			.set('Authorization', token);
		expect(res2.status).to.be.equal(200);
		expect(res2.body).to.have.property('message', 'User is logged in!');
	});
});
