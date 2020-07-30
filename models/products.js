const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    customers_id: String,
    products_id: String,
    orderDetails_id: String

});

const productsSchema = mongoose.Schema({
    products_name: String,
    price: String,
    descriptions: String,
	user: [{//Referenced
		type: mongoose.Schema.ObjectId, 
		ref: 'user'
	}], 
	order: [orderSchema]//Embedded
});

const products = mongoose.model('products', productsSchema);

module.exports = products;