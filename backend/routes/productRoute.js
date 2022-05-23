const express = require('express');
const { getAllproducts, createProduct, updateProduct, deleteProduct } = require('../controllers/productController');

const router = express.Router();


// router.route('/products').get(getAllproducts)

router.get('/products', getAllproducts);
router.post('/product/new',createProduct);

router.put('/product/:id',updateProduct);
router.delete('/product/:id',deleteProduct);



module.exports = router;