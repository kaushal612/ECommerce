const ErrorHandler = require('../utils/errorhandler');


module.exports = (err, req, res, next) => {

    // const error = new ErrorHandler(err.message, err.statusCode);

    err.statusCode = err.statusCode || 500;

    err.message = err.message || 'Internal Server Error';


    //wrong Mongodb ID error

    if(err.name === 'CastError'){
        const message=`Resource not found with id ${err.value}`;
        err = new ErrorHandler(message, 400);
    }

    //mongoose duplicate key error
    if(err.code === 11000){
        const message=`Duplicate ${Object.keys(err.keyValue)} Entered`;
        err = new ErrorHandler(message, 400);
    }

    //wrong JWT error
    if(err.name === 'JsonWebTokenError'){
        const message=`Json Web Token is invalid, Try Agian`; 
        err = new ErrorHandler(message, 401);
            
    }


    //JWT Expired error
    if(err.name === 'TokenExpiredError'){
        const message=`Json Web Token is expired, Try Agian`;
        err = new ErrorHandler(message, 401);
    }


    res.status(err.statusCode).json({
        success: false,
        message: err.message,
    });

}