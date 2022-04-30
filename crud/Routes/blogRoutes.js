import { Router } from 'express';
import BlogValidation from '../validation/validator';

const router = Router();
const { verifyCreate } = BlogValidation;
import {
	getblogs,
	getSingleBlog,
	setblogs,
	Updateblogs,
	deleteblogs,
} from '../Controllers/blogControllers';

router.get('/', getblogs);

router.post('/', verifyCreate, setblogs);
router.get('/:id', getSingleBlog);
router.put('/:id', Updateblogs);
router.delete('/:id', deleteblogs);
export default router;
