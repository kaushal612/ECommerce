const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendMail");
const crypto = require("crypto");
const cloudinary = require("cloudinary");

//Register User

exports.registerUser = catchAsyncErrors(
    async (req, res, next) => {

        // console.log(req.body);

        // console.log(req.body);
        // const myCloud = cloudinary.v2.uploader.upload(req.body.avatar, {
        //     folder: "ProfilePics",
        //     width: 150,
        //     crop: "scale"
        // });

        const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
            folder: "user-pic",
            width: 150,
            crop: "scale",
          });

        console.log(myCloud);
        console.log(myCloud.secure_url);
        const { name, email, password } = req.body;


        const newUser = await User.create({
            name,
            email,
            password,
            avatar: {
                public_id: myCloud.public_id,
                url: myCloud.secure_url,
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


//Logout User
exports.logout = catchAsyncErrors(
    async (req, res, next) => {

        console.log(req.user);

        res.cookie("token", "none", {
            expires: new Date(Date.now()),
            httpOnly: true
        });

        res.status(200).json({
            success: true,
            message: 'Logout Successfully'
        });


    });


//forgot password
exports.forgotPassword = catchAsyncErrors(
    async (req, res, next) => {

        console.log(req.body);
        const user = await User.findOne({ email: req.body.email });

        console.log(user);
        if (!user) {
            return next(new ErrorHandler("User not found", 404));
        }

        //get ResetPassword Token

        const resetToken = await user.getResetPasswordToken();

        console.log(resetToken);


        await user.save({ validateBeforeSave: false });

        const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;


        const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;

        try {
            await sendEmail({
                email: user.email,
                subject: `Ecommerce Password Recovery`,
                message,
            });

            res.status(200).json({
                success: true,
                message: `Email sent to ${user.email} successfully`,
            });
        } catch (error) {
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;

            await user.save({ validateBeforeSave: false });

            console.log(error);
            return next(new ErrorHandle(error.message, 500));
        }






    });

//reset password
exports.resetPassword = catchAsyncErrors(
    async (req, res, next) => {

        const hashedToken = crypto.createHash("sha256").update(req.params.token).digest("hex");


        const user = await User.findOne({
            resetPasswordToken: hashedToken,
            resetPasswordExpire: { $gt: Date.now() }
        });

        if (!user) {
            return next(new ErrorHandler("Invalid Token", 400));
        }

        if (req.body.password != req.body.confirmPassword) {
            return next(new ErrorHandler("Password and Confirm Password should be same", 400));
        }

        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;


        await user.save();

        sendToken(user, 200, res);
    });

//get user details
exports.getUserDetails = catchAsyncErrors(
    async (req, res, next) => {

        const user = await User.findById(req.user.id).select("-password");

        res.status(200).json({
            success: true,
            user
        });

    }
);

//update user password
exports.updateUserPassword = catchAsyncErrors(
    async (req, res, next) => {

        const user = await User.findById(req.user.id).select("+password");

        if (!user) {
            return next(new ErrorHandler("User not found", 404));
        }

        const isPasswordMatched = await user.comparePassword(req.body.oldPassword);


        if (!isPasswordMatched) {
            return next(new ErrorHandler("Old Password is Incorrect", 400));
        }

        if (req.body.newPassword != req.body.confirmPassword) {
            return next(new ErrorHandler("Password and Confirm Password should be same", 400));
        }

        user.password = req.body.newPassword;

        await user.save();

        sendToken(user, 200, res);





    }

);

//update user details
exports.updateUserDetails = catchAsyncErrors(
    async (req, res, next) => {


        const newUserData = {
            name: req.body.name,
            email: req.body.email,
        };

        console.log(newUserData);

        const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
            new: true,
            runValidators: true,
            useFindAndModify: false,


        });


        res.status(200).json({
            success: true,
            user
        });

    });


//get all users(Admin)
exports.getAllUsers = catchAsyncErrors(
    async (req, res, next) => {


        const users = await User.find();


        res.status(200).json({
            success: true,
            users
        });



    });

//get single user(Admin)
exports.getSingleUser = catchAsyncErrors(

    async (req, res, next) => {

        const user = await User.findById(req.params.id);

        if (!user) {
            return next(new ErrorHandler("User not found", 404));
        }

        res.status(200).json({
            success: true,
            user
        });

    });


//update user role(Admin)
exports.updateUserRole = catchAsyncErrors(
    async (req, res, next) => {


        const newUserData = {
            role: req.body.role,
        };

        const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
            new: true,
            runValidators: true,
            useFindAndModify: false,


        });


        res.status(200).json({
            success: true,
            user
        });

    });

//Delete User (Admin)
exports.deleteUser = catchAsyncErrors(
    async (req, res, next) => {


        // we will remove cloudinary

        const user = await User.findByIdAndDelete(req.params.id);

        // console.log(user);
        if (!user) {
            return next(new ErrorHandler("User not found", 404));
        }

        res.status(200).json({
            success: true,
            message: "User Deleted Successfully"
        });

    });

