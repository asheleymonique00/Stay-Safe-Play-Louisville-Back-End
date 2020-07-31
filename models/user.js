const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: String,
    username: String,
    email: String,
    password: String,
    billing_address: String,
    phone: String,
    orders: [{
        type: mongoose.Schema.ObjectId,
        ref: 'OrderDetails'
    }]

});

const User = mongoose.model('User', userSchema);

module.exports = User;