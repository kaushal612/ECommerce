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
exports.getAllproducts = catchAsyncErrors(async (req, res, next) => {



    const resultPerPage = 10;

    const productCount = await Product.countDocuments();

    let features = new ApiFeatures(Product.find(), req.query).search().filter();


    let products = await features.query;

    const filteredProductsCount = products.length;


    features.pagination(resultPerPage);


    products = await features.query.clone();



    res.status(200).json({
        success: true,
        message: 'products fetched successfully',
        products,
        productCount,
        resultPerPage,
        filteredProductsCount
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


// get All reviews of a product
exports.getAllReviews = catchAsyncErrors(
    async (req, res, next) => {

        const product = await Product.findById(req.query.productId);

        if (!product) {
            return next(new ErrorHandler("product not found", 404));
        }

        res.status(200).json({
            success: true,
            reviews: product.reviews
        });


    });


//Delete review
exports.deleteReview = catchAsyncErrors(
    async (req, res, next) => {



        const product = await Product.findById(req.query.productId);


        if (!product) {
            return next(new ErrorHandler("product not found", 404));

        }

        const review = product.reviews.filter(rev => rev._id.toString() !== req.query.reviewId.toString());

        if (product.reviews.length === review.length) {
            return next(new ErrorHandler("review not found", 404));
        }


        product.reviews = review;



        const totalReviews = product.reviews.length;

        console.log("before");

        if (totalReviews === 0) {

            product.ratings = 0;
            product.numofReviews = 0;
            await product.save();

            return res.status(200).json({
                success: true,
                message: 'review deleted successfully'
            });
        }
        console.log("after");
        let totalRating = 0;
        product.reviews.forEach(ele => {

            totalRating += ele.rating;
        }
        )

        product.ratings = totalRating / totalReviews;
        product.numofReviews = totalReviews;

        await product.save();

        res.status(200).json({
            success: true,
            message: 'review deleted successfully'
        });




    });






