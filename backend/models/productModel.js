const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
    },
    description:
    {
        type: String,
        required: [true, 'Please add a description'],
    },
    price:
    {
        type: Number,
        required: [true, 'Please add a price'],
        maxlength: [8, 'Price cannot be more than 8 digits'],

    },
    rating :
    {
        type: Number,
        default: 0,

    },
    images:
    [{
        public_id: {
            type: String,
            required: [true, 'Please add an image']

        },
        url: {
            type: String,
            required: [true, 'Please add an image']

        }
    }],

    category:
    {
        type: String,
        required: [true, 'Please add a category'],
    },

    stock:
    {
        type: Number,
        required: [true, 'Please add a stock'],
        maxlength: [4, 'Stock cannot be more than 4 digits'],
        default :  1
    },

    numofReviews:
    {
        type: Number,
        default: 0,
    },
    reviews:
    [{
        name: {
            type: String,
            required: [true, 'Please add a name'],
        },
        rating:
        {
            type: Number,
            required: [true, 'Please add a rating'],
            maxlength: [1, 'Rating cannot be more than 1 digit'],
        },
        comment:
        {
            type: String,
            required: [true, 'Please add a comment'],
        }  }],

       
        createdAt:
        {
            type: Date,
            default: Date.now,
        },
  




});

module.exports = mongoose.model('Product', productSchema);