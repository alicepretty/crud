import { Router } from 'express';
import auth from './Auth.js';
import blogs from './blogRoutes.js';
import docs from '../documentation/index.doc.js';
import comments from './comment.js';

const router = Router();

router.use('/auth', auth);
router.use('/blogs', blogs);
router.use('/docs', docs);
router.use('/comments', comments);

export default router;

