const express = require('express');
const AuthValidation = require('../validation/auth.validation');

const router = express.Router();
const { signup, login} = require('../Controllers/authController');
const { verifySignup, verifyLogin} = AuthValidation;

router.post('/register', signup);
router.post('/login', login);
module.exports = router;
