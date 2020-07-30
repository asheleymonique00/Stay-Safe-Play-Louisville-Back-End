const products = require('../models').products;
const orderDetails = require('../models').orderDetails;

const createProducts = (req, res) => {
    products.create(req.body, (err, createdUser) => {
        if(err){
                return res.status(500).json(err);
            }
        res.json(createdProducts);
    })
}

const showProducts = (req, res)=>{
	products.findById(req.params.id)
	.populate('orderDetails')
	.exec((err, foundProducts) => {
		if(err) {
			return res.status(500).json(err);
		}
		res.status(200).json(foundProducts);
	})
}

const showAllProducts = (req, res)=>{
	products.find({}, (err, foundAllProducts) => {
		if(err){
			return res.status(500).json(err);
		}
		res.status(200).json(foundAllProducts);
	})
}

// const findThesisByTopic = (req, res) => {
// 	Thesis.find({"topics.name" : req.params.name}, (err, foundThesis) => {
// 		if(err) {
// 			return res.status(500).json(err);
// 		}
// 		res.status(200).json(foundThesis)
// 	})
// }

module.exports = {
    createProducts,
    showProducts,
    showAllProducts
 	// findThesisByTopic
}