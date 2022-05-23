const express = require('express');
const { getAllproducts, createProduct, updateProduct, deleteProduct, getProduct } = require('../controllers/productController');

const router = express.Router();


// router.route('/products').get(getAllproducts)

router.get('/products', getAllproducts);
router.post('/product/new',createProduct);

router.put('/product/:id',updateProduct);
router.delete('/product/:id',deleteProduct);

router.get('/product/:id',getProduct);




module.exports = router;