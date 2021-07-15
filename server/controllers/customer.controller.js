const Customers = require("../models/customer.model");

module.exports.createCustomer = (req,res) => {
    const {firstName, lastName, email, address, orders, number} = req.body;
    Customers.create({
        firstName,
        lastName,
        email,
        address,
        orders, 
        number
    })
        .then(customer => res.json(customer))
        .catch(err => res.json(err))
}

module.exports.getAllCustomers = (req,res) => {
    Customers.find({})
        .then(customers => res.json(customers))
        .catch(err => res.json(err))
}

module.exports.getCustomer = (req,res) => {
    Customers.findOne({_id: req.params.id})
        .then(customer => res.json(customer))
        .catch(err => res.json(err))
}

module.exports.updateCustomer = (req, res) => {
    Customers.findByIdAndUpdate(req.params.id, req.body, {
        new:true,
        runValidators: true,
        context: "query"
    })
        .then(updatedCustomer => res.json(updatedCustomer))
        .catch(err => res.json(err))
}

//controller to directly push into order array in Customer Schema rather than using state and spread operator on the front end to replace the array with a copy + new order

module.exports.createOrder = (req, res) => {
    Customers.updateOne({'_id': req.params.id},
        {$push: {
            orders: req.body.order
        }})
        .then(updatedOrder => res.json(updatedOrder))
        .catch(err => res.json(err))
}

// controller that runs the favorite/unfavorite for each order 

module.exports.updateCustomerOrder = (req, res) => {
    Customers.updateOne({'orders._id': req.params.orderid},
        {'$set': {
            'orders.$.favorite': req.body.favorite
        }})
        .then(updatedOrder => res.json(updatedOrder))
        .catch(err => res.json(err))
}

module.exports.deleteCustomer = (req,res) => {
    Customers.deleteOne({_id: req.params.id})
        .then(deleteConfirmation => res.json(deleteConfirmation))
        .catch(err => res.json(err))
}