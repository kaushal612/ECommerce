const Product = require('../models/productModel');



//create product -Admin
exports.createProduct = async (req, res, next) => {

    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        product
    });
};



//get all products 
exports.getAllproducts = async (req, res) => {

    const products = await Product.find();

    res.status(200).json({
        message: 'products fetched successfully',
        products
    });
};


//update product --Admin

exports.updateProduct = async (req, res, next) => {

    try {

        console.log(req.params.id);
        
        console.log(req.body);

        let product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: 'product not found'
            });

        }

        product = await Product.findByIdAndUpdate(req.params.id, req.body,
            {
                new: true
            }
            );
        
        console.log("hello"+product);

        res.status(200).json({
            success: true,
            product
        });
    }
    catch (err) {
        console.log(err);

        res.status(500).json({
            message: 'product not updated'
        });
    }

};

//delete product --Admin
exports.deleteProduct = async (req, res, next) => {

    try {

        let product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: 'product not found'
            });

        }

         await Product.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: 'product deleted successfully'
        });
    }
    catch (err) {
        console.log(err);

        res.status(500).json({
            message: 'product not deleted'
        });
    }

}



