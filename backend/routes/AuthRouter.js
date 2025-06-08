const { Router } = require('express');
const { signupValidation, loginValidation } = require('../middleware/AuthValidation');
const { signup, login } = require('../controllers/AuthController');

const router = Router();

router.post('/signup', signupValidation, signup)

router.post('/login', loginValidation, login)

module.exports = router