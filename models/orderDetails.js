const mongoose = require('mongoose');

const orderDetailsSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    products: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Product'
    }],
    total_price: String
    

});

const OrderDetails = mongoose.model('OrderDetails', orderDetailsSchema);

module.exports = OrderDetails;