const {sign , verify} = require('jsonwebtoken')

const { config } = require('dotenv');
config();

        const signToken=(data)=> {
                const token = sign(data, process.env.Secret, { expiresIn: process.env.expire });
                return token;
        }

        const  verifyToken=(token) =>{
                const data = verify(token, process.env.Secret);
                return data;
        }


        module.exports = {
            signToken , verifyToken
        }