// import { object, string } from 'joi'
import Joi from 'joi';
export const commentvalidations = {
	createOrupdatecomment: {
		body: Joi.object({
			Name: Joi.string(),
			Email: Joi.string(),
			Message: Joi.string(),
		}),
	},
};
