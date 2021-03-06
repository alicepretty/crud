import { Router } from 'express';
import AuthValidation from '../validation/auth.validation.js';

const router = Router();
import { signup, login, logged } from '../controllers/authController.js';
const { verifySignup, verifyLogin} = AuthValidation;

router.post('/register', verifySignup, signup);
router.post('/login', verifyLogin, login);
router.get('/me' ,logged)
export default router;
