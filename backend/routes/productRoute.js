const express = require('express');
const { getAllproducts, createProduct, updateProduct, deleteProduct, getProduct, createReview, getAllReviews, deleteReview } = require('../controllers/productController');
const { isAuthenticatedUser, authorizedRoles } = require('../middleware/auth');

const router = express.Router();


// router.route('/products').get(getAllproducts)

router.get('/products', getAllproducts);
router.post('/admin/product/new', isAuthenticatedUser, createProduct);

router.put('/admin/product/:id', updateProduct);
router.delete('/admin/product/:id', deleteProduct);

router.get('/product/:id', getProduct);

router.put('/review', isAuthenticatedUser, createReview);

router.get('/reviews', getAllReviews);

router.delete('/review', isAuthenticatedUser, deleteReview);


module.exports = router;