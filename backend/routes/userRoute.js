const express = require('express');
const { registerUser, loginUser, logout, forgotPassword, resetPassword } = require('../controllers/userController');
const { isAuthenticatedUser } = require('../middleware/auth');
const router = express.Router();


router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/password/forgot', forgotPassword);

router.put('/password/reset/:token', resetPassword);
router.get('/logout', isAuthenticatedUser, logout);
module.exports = router;