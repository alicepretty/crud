import 'dotenv/config'
import errorResponse from "../utils/error";
import Protection from './hash.js';
import Authmodel from '../models/authModel.js';

const { verifyToken } = Protection;

export const isAdmin = async(req, res, next) => {
    try {
    const token = req.header('Authorization')
		? req.header('Authorization').replace('Bearer ', '')
		: req.params.token;
    // console.log(req.headers);
        if(!token){
            return errorResponse(res , 400 , 'please log in to access the page')
        }
        const info = await verifyToken(token, process.env.Secret);
        if (!info){
            return errorResponse(res , 401 ,'expired token')
        }
        const {_id } = info;
			const user = await Authmodel.findOne({ _id });

			if (!user) {
				return errorResponse(res, 404, 'User not found ');
			}

            if (user.Role !== 'admin') {
                return errorResponse(res, 403, 'Only admins are allowed to access this route')
            }
            	req.user = user;

			return next();
    } catch (error) {
        
        
			return errorResponse(
				res,
				500,
				`Error while checking token! ${error.message}`,
			);
    }
}