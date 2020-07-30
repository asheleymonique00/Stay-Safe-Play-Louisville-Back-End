const mongoose = require('mongoose');

// const orderSchema = mongoose.Schema({
//     customers_id: String,
//     products_id: String,
//     orderDetails_id: String

// });

const productsSchema = mongoose.Schema({
    products_name: String,
    price: String,
    descriptions: String,
	// user: [{//Referenced
	// 	type: mongoose.Schema.ObjectId, 
	// 	ref: 'user'
	// }], 
	// order: [orderSchema]//Embedded
});

const Product = mongoose.model('Product', productsSchema);

module.exports = Product;