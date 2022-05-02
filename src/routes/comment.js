import { Router } from 'express';
import { commentvalidations } from '../validation/commentvalidation.js';
import { validate } from 'express-validation';
const router = Router();
const { createOrupdatecomment } = commentvalidations;
import {
	getComments,
	getSinglecomment,
	setcomment,
	updatecomment,
	deletecomment,
} from '../controllers/commentsControllers.js';
router.get('/', getComments);
router.get('/:id', getSinglecomment);
router.post('/', validate(createOrupdatecomment), setcomment);
router.put('/:id', validate(createOrupdatecomment), updatecomment);
router.delete('/:id', deletecomment);

export default router;
