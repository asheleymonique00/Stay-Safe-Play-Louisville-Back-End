const mongoose = require('mongoose');

const productsSchema = mongoose.Schema({
    user_id: String,
    user_name: String,
    products_id: [],
    total_price: String
    

});

const products = mongoose.model('products', productsSchema);

module.exports = products;