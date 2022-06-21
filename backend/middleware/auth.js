const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.isAuthenticatedUser = catchAsyncErrors(
    async (req, res, next) => {


        const { token } = req.cookies;

        //console.log(token);
        if (!token) {
            return next(new ErrorHandler("Please Login to access this resource", 401));
        }

        const decoded = await jwt.verify(token, process.env.JWT_SECRET);

        req.user = await User.findById(decoded.id); 

        next();


    });

    exports.authorizedRoles = (...roles) => {
        return (req, res, next) => {
            if (!roles.includes(req.user.role)) {
                return next(new ErrorHandler("You are not authorized to access this resource", 403));
            }
            next();
        }
    }

