import jsonwebtoken from 'jsonwebtoken';

import { config } from 'dotenv';
config();

const { sign, verify } = jsonwebtoken;

        export const signToken=(data)=> {
                const token = sign(data, process.env.Secret, { expiresIn: process.env.expire });
                return token;
        }

        export const  verifyToken=(token) =>{
                const data = verify(token, process.env.Secret);
                return data;
        }
