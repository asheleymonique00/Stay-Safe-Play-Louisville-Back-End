const mongoose = require('mongoose');

const orderDetailsSchema = mongoose.Schema({
    user_id: String,
    user_name: String,
    products_id: [],
    total_price: String
    

});

const orderDetails = mongoose.model('orderDetails', orderDetailsSchema);

module.exports = orderDetails;