import 'dotenv/config';
import { compareSync, hashSync, genSaltSync  } from 'bcrypt';
import { sign, verify } from 'jsonwebtoken';

class Protection {
	static async signToken(data) {
		const token = sign(data, process.env.Secret, {
			expiresIn: process.env.expire,
		});
		return token;
	}

	static async verifyToken(token) {
		const data = verify(token, process.env.Secret);
		return data;
	}

	static hashPassword(password) {
		return hashSync(password, genSaltSync(10));
	}

	static checkPassword(password, hashed) {
		return compareSync(password, hashed);
	}
}

export default Protection;
