const User = require('../models').user;

const createUser = (req, res) => {
	User.create(req.body, (err, createdUser) => {
		if(err){
			return res.status(500).json(err);
		}
		res.status(200).json(createdUser);
	});
}

const showUser = (req, res)=>{
	User.findById(req.params.id, (err, foundUser) => {
		if(err){
			return res.status(500).json(err);
		}
		res.status(200).json(foundUser);
	})
}

const deleteUser = (req, res)=>{
	User.findByIdAndRemove(req.params.id, (err, deletedUser) => {
		if(err){
			return res.status(500).json(err);
		}
		res.status(200).json(deletedUser);
	});
}

const editUser = (req, res)=>{
	console.log(req.params.id);
	console.log(req.body);
	User.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedUser) => {
		if(err){
			return res.status(500).json(err);
		}
		res.status(200).json(updatedUser);
	});
}

module.exports = {
	createUser,
	showUser,
	deleteUser,
	editUser
}