import { Router } from 'express';
import BlogValidation from '../validation/validator.js';
import {isAdmin} from '../middleware/admin.js';

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

router.post('/',verifyCreate, setblogs);
router.get('/:blogId', getSingleBlog);
router.put('/:blogId', Updateblogs);
router.delete('/:blogId', deleteblogs);
export default router;
