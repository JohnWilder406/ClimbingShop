const Customers = require("../models/customer.model");

module.exports.createCustomer = (req,res) => {
    const {firstName, lastName, email, address, orders} = req.body;
    Customers.create({
        firstName,
        lastName,
        email,
        address,
        orders
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

module.exports.deleteCustomer = (req,res) => {
    Customers.deleteOne({_id: req.params.id})
        .then(deleteConfirmation => res.json(deleteConfirmation))
        .catch(err => res.json(err))
}