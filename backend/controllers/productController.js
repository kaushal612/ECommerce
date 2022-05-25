const Product = require('../models/productModel');
const ErrorHandler = require('../utils/errorhandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const ApiFeatures = require("../utils/apifeatures");


//create product -Admin
exports.createProduct = catchAsyncErrors(
    async (req, res, next) => {


        req.body.user = req.user.id;

        const product = await Product.create(req.body);

        res.status(201).json({
            success: true,
            product
        });
    });



//get all products 
exports.getAllproducts = catchAsyncErrors(async (req, res) => {

    const resultPerPage = 10;
    const productCount = await Product.countDocuments();

    const features = new ApiFeatures(Product.find(), req.query).search();


    const products = await features.query;
    res.status(200).json({
        success: true,
        message: 'products fetched successfully',
        products,
        productCount,
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

        console.log("hello" + product);

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
exports.getProduct = catchAsyncErrors(
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


//create new Review or Update the rewiew

exports.createReview = catchAsyncErrors(
    async (req, res, next) => {


        const { rating, comment, productId } = req.body;


        const review = {
            user: req.user._id,
            name: req.user.name,
            rating: Number(rating),
            comment: comment,
        };

        const product = await Product.findById(productId);

        const isReviewd = product.reviews.find(rev => rev.user.toString() === req.user.id);

        if (isReviewd) {

            product.reviews.forEach(element => {
                if (element.user.toString() === req.user.id) {
                    element.rating = review.rating;
                    element.comment = review.comment;

                }
            });

            // res.status(200).json({
            //     success: true,
            //     message: 'review updated successfully'
            // });


        }
        else {
            product.reviews.push(review);
        }


        const totalReviews = product.reviews.length;

        console.log(totalReviews);
        let totalRating = 0;
        product.reviews.forEach(element => {
            totalRating += element.rating;
        });

        const averageRating = totalRating / totalReviews;

        product.ratings = averageRating;
        product.numofReviews = totalReviews;
        await product.save();

        res.status(200).json({
            success: true,
            message: 'review added successfully'
        });




    });






