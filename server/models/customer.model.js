const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const OrderSchema = new mongoose.Schema({
    item: {
        type: String,
        required: [true, "Item is required"]
    },
    quantity: Number,
    price: Number,
    shipped: Boolean,
    favorite: Boolean
})

const CustomerSchema = new mongoose.Schema({
    firstName: {
        type: String,
        unique: true,
        uniqueCaseInsensitive: true,
        required: [true, "First name is required"],
        minLength: [5, "First name must be at least five characters"]
    },
    lastName: {
        type: String,
        required: [true, "Last name is required"],
        minLength: [5, "Last name must be at least five characters"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        validate: {
            validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
            message: "Please enter a valid email"
        }
    },
    address: {
        type: String,
        required: [true, "Address is required"],
        minLength: [10, "Address must be at least 10 characters"]

    },
    orders: [OrderSchema]
}, {timestamps: true});

CustomerSchema.plugin(uniqueValidator, {message: 'Error, name must be unique'});

module.exports = mongoose.model('Customers', CustomerSchema)