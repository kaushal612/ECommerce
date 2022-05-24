const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const erorrMiddleware = require('./middleware/error');
app.use(express.json());
app.use(cookieParser());


//Route Imports

const product = require('./routes/productRoute');
const user= require('./routes/userRoute');

app.use("/api/v1", product);
app.use("/api/v1", user);

// app.use(app.router);
// product.initialize(app);

//Middleware for Errors

app.use(erorrMiddleware);


module.exports = app;