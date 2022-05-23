const Product = require('../models/productModel');
const ErrorHandler = require('../utils/errorhandler');
const catchAsyncErrors =require('../middleware/catchAsyncErrors');


//create product -Admin
exports.createProduct = catchAsyncErrors(
    async (req, res, next) => {

    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        product
    });
});



//get all products 
exports.getAllproducts = catchAsyncErrors(async (req, res) => {

    const products = await Product.find();

    res.status(200).json({
        message: 'products fetched successfully',
        products
    });
});


//update product --Admin

exports.updateProduct = catchAsyncErrors(
    async (req, res, next) => {

 
        console.log(req.params.id);
        
        console.log(req.body);

        let product = await Product.findById(req.params.id);

        if (!product) {
            return next(new ErrorHandler("product not found", 404));

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
    


});

//delete product --Admin
exports.deleteProduct = catchAsyncErrors(
    async (req, res, next) => {


        let product = await Product.findById(req.params.id);

        if (!product) {
            return next(new ErrorHandler("product not found", 404));

        }

         await Product.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: 'product deleted successfully'
        });
    }
  

);

// get single product
exports.getProduct =catchAsyncErrors(
     async (req, res, next) => {

        let product = await Product.findById(req.params.id);

        if (!product) {
            return next(new ErrorHandler("product not found", 404));

        }

        res.status(200).json({
            success: true,
            product
        });
   
    }
);






