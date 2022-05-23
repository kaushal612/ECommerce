const express = require('express');

const app = express();
const erorrMiddleware = require('./middleware/error');
app.use(express.json());
//Route Imports

const product = require('./routes/productRoute');

app.use("/api/v1", product);

// app.use(app.router);
// product.initialize(app);

//Middleware for Errors

app.use(erorrMiddleware);


module.exports = app;