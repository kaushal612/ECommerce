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

    res.status(err.statusCode).json({
        success: false,
        message: err.message,
    });

}