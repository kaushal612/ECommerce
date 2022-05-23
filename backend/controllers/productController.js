exports.getAllproducts = (req, res) => {

    res.status(200).json({
        message: 'Handling GET requests to /products'
    });
};