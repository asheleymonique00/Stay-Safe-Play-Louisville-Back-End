const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
	name: String,
    email: String,
    password: String,
    billing_address: String,
    phone: String,
    order_id: []

});

const user = mongoose.model('user', userSchema);

module.exports = user;