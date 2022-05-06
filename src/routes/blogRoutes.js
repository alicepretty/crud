import { Router } from 'express';
import BlogValidation from '../validation/validator.js';

const router = Router();
const { verifyCreate } = BlogValidation;
import {
	getblogs,
	getSingleBlog,
	setblogs,
	Updateblogs,
	deleteblogs,
	
} from '../controllers/blogControllers.js';

router.get('/', getblogs);

router.post('/', verifyCreate, setblogs);
router.get('/:id', getSingleBlog);
router.put('/:id', Updateblogs);
router.delete('/:id', deleteblogs);
export default router;
