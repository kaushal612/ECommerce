const express = require('express');
const { registerUser, loginUser, logout, forgotPassword, resetPassword, getUserDetails, updateUserPassword, updateUserDetails, getAllUsers, getSingleUser, updateUserRole, deleteUser } = require('../controllers/userController');
const { isAuthenticatedUser, authorizedRoles } = require('../middleware/auth');
const router = express.Router();


router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/password/forgot', forgotPassword);

router.put('/password/reset/:token', resetPassword);
router.get('/logout', isAuthenticatedUser, logout);

router.get('/me', isAuthenticatedUser, getUserDetails);
router.put('/password/update', isAuthenticatedUser, updateUserPassword);
router.put('/me/update', isAuthenticatedUser, updateUserDetails);

router.get('/admin/users', isAuthenticatedUser, authorizedRoles('admin'), getAllUsers);

router.get('/admin/user/:id', isAuthenticatedUser, authorizedRoles('admin'), getSingleUser);

router.put('/admin/user/:id', isAuthenticatedUser, authorizedRoles('admin'), updateUserRole);

router.delete('/admin/user/:id', isAuthenticatedUser, authorizedRoles('admin'), deleteUser);



module.exports = router;