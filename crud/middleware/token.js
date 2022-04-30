import { sign, verify } from 'jsonwebtoken';

import { config } from 'dotenv';
config();

        const signToken=(data)=> {
                const token = sign(data, process.env.Secret, { expiresIn: process.env.expire });
                return token;
        }

        const  verifyToken=(token) =>{
                const data = verify(token, process.env.Secret);
                return data;
        }


        export default {
            signToken , verifyToken
        }