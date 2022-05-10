import { Router } from 'express';
import auth from './Auth.js';
import blogs from './blogRoutes.js';
import docs from '../documentation/index.doc.js';
import { commentvalidations } from '../validation/commentvalidation.js';
import { validate } from 'express-validation';

const { createOrupdatecomment } = commentvalidations;
import {
	getComments,
	getSinglecomment,
	setcomment,
	deletecomment,
} from '../controllers/commentsControllers.js';

const router = Router();

router.use('/auth', auth);
router.use('/blogs', blogs);
router.use('/docs', docs);
router.get('/blog/:blogId/comments', getComments);
router.post(
	'/blog/:blogId/comments',
	validate(createOrupdatecomment),
	setcomment,
);
router.get('/blog/:blogId/:commentId', getSinglecomment);
router.delete('/blog/:blogId/:commentId', deletecomment);

export default router;

