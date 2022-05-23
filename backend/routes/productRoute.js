const express = require('express');
const { getAllproducts } = require('../controllers/productController');

const router = express.Router();


// router.route('/products').get(getAllproducts)

router.get('/products', getAllproducts);

module.exports = router;