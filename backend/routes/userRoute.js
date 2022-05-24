const express = require('express');
const { registerUser, loginUser, logout } = require('../controllers/userController');
const { isAuthenticatedUser } = require('../middleware/auth');
const router = express.Router();


router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/logout', isAuthenticatedUser, logout);
module.exports = router;