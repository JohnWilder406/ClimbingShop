const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const CustomerSchema = new mongoose.Schema({

}, {timestamps: true});

CustomerSchema.plugin(uniqueValidator, {message: 'Error, name must be unique'});

module.exports = mongoose.model('Customers', CustomerSchema)