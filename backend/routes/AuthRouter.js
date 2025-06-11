const { Router } = require('express');
const { signupValidation, loginValidation, forgotValidation, changeValidation } = require('../middleware/AuthValidation');
const { signup, login, forgotPassword, changePassword } = require('../controllers/AuthController');
const { ensureAuthantication } = require('../middleware/Auth');

const router = Router();

router.post('/signup', signupValidation, signup)

router.post('/login', loginValidation, login)

router.post('/forgot-password', forgotValidation, forgotPassword)

router.post('/change-password', ensureAuthantication, changeValidation, changePassword)

module.exports = router