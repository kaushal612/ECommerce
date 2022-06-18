const Order = require('../models/orderModel');
const Product = require('../models/productModel');
const ErrorHandler = require('../utils/errorhandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');




//create new order
exports.createOrder = catchAsyncErrors(async (req, res, next) => {


    const { shippingInfo, orderItems, paymentInfo, itemPrice, taxPrice, shippingPrice, totalPrice } = req.body;

    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        user: req.user._id,
        paidAt: new Date(),
    });


    res.status(201).json({
        success: true,
        order
    });




});


//get Single Order
exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {


    const order = await Order.findById(req.params.id).populate('user', "name email");

    if (!order) {
        return next(new ErrorHandler("order not found", 404));
    }


    res.status(200).json({
        success: true,
        order
    });

});

//get logged in user orders
exports.getUserOrders = catchAsyncErrors(async (req, res, next) => {


    const orders = await Order.find({ user: req.user._id });

    res.status(200).json({
        success: true,
        orders
    });




});


//get all orders --ADMIN

exports.getAllOrders = catchAsyncErrors(async (req, res, next) => {


    const orders = await Order.find();

    let totalAmount = 0;

    orders.forEach(order => {
        totalAmount += order.totalPrice;
    });


    res.status(200).json({
        success: true,
        orders,
        totalAmount
    });


});


//update order status --ADMIN

exports.updateOrderStatus = catchAsyncErrors(async (req, res, next) => {

    console.log(req.body);
    console.log(req.params.id);
    const order = await Order.findById(req.params.id);

    if (!order) {
        return next(new ErrorHandler("order not found", 404));
    }

    console.log(order);
    if (order.orderStatus === 'Delivered') {
        return next(new ErrorHandler("order already delivered", 400));
    }

    if (order.orderStatus === 'Processing') {

        order.orderItems.forEach(async (item) => {


            await updateStock(item.product, item.quantity);


        });
    }


    order.orderStatus = req.body.status;

    if (order.orderStatus === 'Delivered') {
        order.deliveredAt = new Date();
        console.log(order.deliveredAt);
    }

    console.log(order);
    await order.save();

    res.status(200).json({
        success: true,
        message: 'order status updated successfully',
        order
    });
});

async function updateStock(productId, quantity) {

    const product = await Product.findById(productId);

    product.stock -= quantity;

    await product.save();

}


//delete order --ADMIN
exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {

    const order = await Order.findById(req.params.id);

    if (!order) {
        return next(new ErrorHandler("order not found", 404));
    }

    await order.remove();

    res.status(200).json({
        success: true,
        message: 'order deleted successfully'
    });




});

