require('dotenv').config();

const User = require('../models').user;

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const signUp = (req, res) => {
    bcrypt.genSalt(10, (err, salt) => {
        if(err){
            res.status(500).send(`ERROR: ${err}`);
        }
        bcrypt.hash(req.body.password, salt, (err, hashedPwd) => {
            if(err){
                res.status(500).send(`ERROR: ${err}`);
            }
            req.body.password = hashedPwd;

            User.create(req.body, (err, createdUser) => {
                if(err){
                    res.status(500).send(`ERROR: ${err}`);
                } //error object return back to client
                console.log(createdUser);
                const token = jwt.sign(
                    {
                        username: createdUser.username,
                        id: createdUser._id
                    },
                    process.env.JWT_SECRET,
                    {
                        expiresIn: "30 days"
                    }
                )
               
                res.status(200).json({
                    "token" : token,
                    user: createdUser
                });
            })            
        })
    })
}

const login = (req, res) => {
    User.findOne({username: req.body.username}, (err, foundUser) => {
        if(err){
            res.status(500).send(`ERROR: ${err}`);
        }
        if(foundUser){
            bcrypt.compare(req.body.password, foundUser.password, (err, match) => {
                if(match){

                    const token = jwt.sign(
                        {
                            username: foundUser.username,
                            id: foundUser._id
                        },
                        process.env.JWT_SECRET,
                        {
                            expiresIn: "30 days"
                        }
                    )
                    res.status(200).json({
                        "token" : token,
                        user: foundUser
                    });
                } else {
                    res.status(500).send(`ERROR: Incorrect Username/Password`);//json here?
                }
            })
        }  
        else{
            res.status(500).send(`ERROR: Incorrect Username/Password`);
        }    
    })
    
}

// const verifyUser = (req, res) => {
//     User.findOne(req.user.id, {
//         attributes: ['id', 'username', 'updatedAt', 'email', 'name', 'img']
//     })
//     .then(foundUser => {
//         res.status(constants.SUCCESS).json(foundUser);
//     })
//     .catch(err => {
//         res.status(constants.INTERNAL_SERVER_ERROR).send(`ERROR: ${err}`);
//     }) 
// }


module.exports = {
    signUp,
    login
    // verifyUser
    
}