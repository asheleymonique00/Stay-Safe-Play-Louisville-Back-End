const mongoose = require('mongoose');

const productsSchema = mongoose.Schema({
    name: String,
    price: String,
    descriptions: String

});

const products = mongoose.model('products', productsSchema);

module.exports = products;