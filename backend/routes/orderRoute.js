const express = require('express');
const { createOrder, getUserOrders, getSingleOrder, getAllOrders, deleteOrder, updateOrderStatus } = require('../controllers/orderController');
const { isAuthenticatedUser, authorizedRoles } = require('../middleware/auth');
const router = express.Router();


router.post('/order/new', isAuthenticatedUser, createOrder);
router.get('/order/:id', isAuthenticatedUser, getSingleOrder);

router.get('/orders/me', isAuthenticatedUser, getUserOrders);

router.get('/admin/orders', isAuthenticatedUser, authorizedRoles('admin'), getAllOrders);

router.put('/admin/order/:id', isAuthenticatedUser, authorizedRoles('admin'), updateOrderStatus);

router.delete('/admin/order/:id', isAuthenticatedUser, authorizedRoles('admin'), deleteOrder);

module.exports = router;