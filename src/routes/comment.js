import { Router } from 'express';


const router = Router();
import {
	getComments,
	getSinglecomment,
	setcomment,
	deletecomment,
} from '../controllers/commentsControllers.js';
router.get('/', getComments);
router.get('/:commentId', getSinglecomment);
router.post('/', validate(createOrupdatecomment), setcomment);
router.delete('/:commentId', deletecomment);
export default router;
