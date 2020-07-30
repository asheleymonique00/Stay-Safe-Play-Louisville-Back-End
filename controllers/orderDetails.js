const orderDetails = require('../models').orderDetails;
const user = require('../models').user;
const products = require('../models').products;

const createOrderDetails = (req, res) => {
    orderDetails.create(req.body, (err, createdOrderDetails) => {
        if(err){
                return res.status(500).json(err);
            }
        res.json(createdOrderDetails);
    })
}


const showOrderDetails = (req, res)=>{
	orderDetails.findById(req.params.id)
	.populate('products')
	.exec((err, foundOrder) => {
		if(err) {
			return res.status(500).json(err);
		}
		res.status(200).json(foundOrder);
	})
}

const showAllOrderDetails = (req, res)=>{
	orderDetails.find({}, (err, foundAllOrderDetails) => {
		if(err){
			return res.status(500).json(err);
		}
		res.status(200).json(foundAllOrderDetails);
	})
}

const deleteOrderdetails = (req, res)=>{
	orderDetails.findByIdAndRemove(req.params.id, (err, deletedOrderDetails) => {
		if(err){
			return res.status(500).json(err);
		}
		res.status(200).json(deletedOrderDetails);
	});
}

const editOrderDetails = (req, res)=>{
	orderDetails.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedOrderDetails) => {
		if(err){
			return res.status(500).json(err);
		}
		res.status(200).json(updatedOrderDetails);
	});
}

// const addAuthorToThesis = (req, res) => {
// 	Thesis.findById(req.body.thesisId, (err, foundThesis) => {
// 		if(err) {
// 			return res.status(500).json(err);
// 		}
// 		Author.findById(req.body.authorId, (err, foundAuthor) => {
// 			if(err) {
// 				return res.status(500).json(err);
// 			}
// 			foundThesis.authors.push(foundAuthor)

// 			//save method can only be called on an
// 			foundThesis.save((err, savedThesis) => {
// 				if(err) {
// 					return res.status(500).json(err);
// 				}
// 				res.status(200).json(savedThesis);
// 			})
// 		})
// 	})
// }

const findOderDetailsByUser = (req, res) => {
	orderDetails.find({"user.name" : req.params.name}, (err, foundOrderDetials) => {
		if(err) {
			return res.status(500).json(err);
		}
		res.status(200).json(foundOrderDetials)
	})
}

module.exports = {
    createOrderDetails,
    showOrderDetails,
    showAllOrderDetails,
    deleteOrderdetails,
	editOrderDetails,
	findOderDetailsByUser
}