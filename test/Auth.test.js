import mocha from 'mocha';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/index.js';
import Authmodel from '../src/models/authModel.js';

chai.expect();
chai.use(chaiHttp);

const signup = {
	firstName: 'Ani',
	lastName: 'pol',
	Email: 'pppp@gmail.com',
	password: '12345',
	confirmPassword: '12345',
};
const { it, describe, after } = mocha;

describe('Testing  signup endpoints', async () => {
	after(async () => {
		await Authmodel.deleteMany({
			where: {},
			truncate: true,
		});
	});
	it('it should register ,login and get logged user', async () => {
		const res = await chai
			.request(app)
			.post('/api/auth/register')
			.send(signup);
		expect(res.status).to.be.equal(201);
		expect(res.body).to.have.property(
			'message',
			'User registered successfully',
		);
	});

	it('it should login user.', async () => {
		const res = await chai
			.request(app)
			.post('/api/auth/register')
			.send(signup);
		const res1 = await chai
			.request(app)
			.post('/api/auth/login')
			.send({ Email: signup.Email, password: signup.password });
		expect(res1.status).to.be.equal(201);
		expect(res1.body).to.have.property(
			'message',
			'User login successfully',
		);
	});
	it('it should get logged user', async () => {
		const res = await chai
			.request(app)
			.post('/api/auth/register')
			.send(signup);
		const res1 = await chai
			.request(app)
			.post('/api/auth/login')
			.send({ email: signup.Email, password: signup.password });

		const token = `Bearer ${res1.body.data}`;
		const res2 = await chai
			.request(app)
			.get('/api/auth/me')
			.set('Authorization', token);
		expect(res2.status).to.be.equal(200);
		expect(res2.body).to.have.property('message', 'User is logged in!');
	});
});
