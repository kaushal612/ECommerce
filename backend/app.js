const express = require('express');

const app = express();

app.use(express.json());
//Route Imports

const product = require('./routes/productRoute');

app.use("/api/v1", product);

// app.use(app.router);
// product.initialize(app);

module.exports = app;