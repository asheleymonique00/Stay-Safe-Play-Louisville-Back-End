const mongoose = require('mongoose');

const productsSchema = mongoose.Schema({
    products_name: String,
    price: String,
    descriptions: String

});

const thesisSchema = mongoose.Schema({
	products: String, 
	user: [{//Referenced
		type: mongoose.Schema.ObjectId, 
		ref: 'user'
	}], 
	orderDetails: [orderDetailsSchema]//Embedded
});

const products = mongoose.model('products', productsSchema);

module.exports = products;