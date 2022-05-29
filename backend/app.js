const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const erorrMiddleware = require('./middleware/error');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());


//Route Imports
const product = require('./routes/productRoute');
const user= require('./routes/userRoute');
const order = require('./routes/orderRoute');

app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);

// app.use(app.router);
// product.initialize(app);

//Middleware for Errors

app.use(erorrMiddleware);


module.exports = app;