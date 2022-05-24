const express = require('express');

const app = express();
const erorrMiddleware = require('./middleware/error');
app.use(express.json());



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