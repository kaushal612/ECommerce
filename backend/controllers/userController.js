const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");


//Register User

exports.registerUser = catchAsyncErrors(
    async (req, res, next) => {

        console.log(req.body);


        const { name, email, password } = req.body;


        const newUser = await User.create({
            name,
            email,
            password,
            avatar: {
                public_id: "dfvdfvd",
                url: "dfvfdv"
            }
        });


        sendToken(newUser, 201, res);

    });


//Login User

exports.loginUser = catchAsyncErrors(
    async (req, res, next) => {
        const { email, password } = req.body;

        if (!email || !password) {
            return next(new ErrorHandler("Please provide email and password", 400));
        }

        const user = await User.findOne({ email }).select("+password");

        if (!user) {
            return next(new ErrorHandler("Invalid Email or Password", 401));
        }

        const isPasswordMatched = await user.comparePassword(password);

        if (!isPasswordMatched) {
            return next(new ErrorHandler("Invalid Email or Password", 401));
        }
        sendToken(user, 200, res);

    });


