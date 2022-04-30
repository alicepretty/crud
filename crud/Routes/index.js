import { Router } from 'express';
import auth from './auth';
import blogs from './blogRoutes';
import comments from './comment';

const router = Router();

router.use('/auth', auth);
router.use('/blogs', blogs);
router.use('/comments', comments);

export default router;

