import { Router } from 'express';
import { commentvalidations } from '../validation/commentvalidation';
import { validate } from 'express-validation';
const router = Router();
const { createOrupdatecomment } = commentvalidations;
import {
	getComment,
	getSinglecomment,
	setcomment,
	updatecomment,
	deletecomment,
} from '../Controllers/commentsControllers';
router.get('/', getComment);
router.get('/:id', getSinglecomment);
router.post('/', validate(createOrupdatecomment), setcomment);
router.put('/:id', validate(createOrupdatecomment), updatecomment);
router.delete('/:id', deletecomment);

export default router;
