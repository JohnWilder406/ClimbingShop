const Products = require("../models/product.model");

module.exports.createProduct = (req,res) => {
    const {name, price, description, number} = req.body;
    Products.create({
        name,
        price,
        description,
        number
    })
        .then(product=> res.json(product))
        .catch(err => res.json(err))
}

module.exports.getAllProducts = (req,res) => {
    Products.find({})
        .then(products => res.json(products))
        .catch(err => res.json(err))
}

module.exports.getProduct = (req,res) => {
    Products.findOne({_id: req.params.id})
        .then(product => res.json(product))
        .catch(err => res.json(err))
}

module.exports.updateProduct= (req, res) => {
    Products.findByIdAndUpdate(req.params.id, req.body, {
        new:true,
        runValidators: true,
        context: "query"
    })
        .then(updatedProduct => res.json(updatedProduct))
        .catch(err => res.json(err))
}

module.exports.deleteProduct = (req,res) => {
    Products.deleteOne({_id: req.params.id})
        .then(deleteConfirmation => res.json(deleteConfirmation))
        .catch(err => res.json(err))
}