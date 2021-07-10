const mongoose = require('mongoose');
const {conn2} = require('../config/mongoose.config')
const uniqueValidator = require('mongoose-unique-validator');

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        uniqueCaseInsensitive: true,
        required: [true, "Product Name is required"],
        minLength: [4, "Product Name must be at least four characters"]
    },

    price: {
        type: Number,
        required: [true, "Product must have a price"]
    },

    description: {
        type: String,
        required: [true, "Product description is required"],
        minLength: [10, "Description must be at least 10 characters"]
    },
    number: Number
}, {timestamps: true});

ProductSchema.plugin(uniqueValidator, {message: 'Error: product name must be unique'})

const productModel = conn2.model('Products', ProductSchema);

module.exports = productModel;
