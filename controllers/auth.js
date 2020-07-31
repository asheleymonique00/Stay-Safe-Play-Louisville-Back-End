require('dotenv').config();

const User = require('../models').User;

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const signUp = (req, res) => {
    bcrypt.genSalt(10, (err, salt) => {
        if(err){
            res.status(constants.INTERNAL_SERVER_ERROR).send(`ERROR: ${err}`);
        }
        bcrypt.hash(req.body.password, salt, (err, hashedPwd) => {
            if(err){
                res.status(constants.INTERNAL_SERVER_ERROR).send(`ERROR: ${err}`);
            }
            req.body.password = hashedPwd;

            User.create(req.body, (err, createdUser)//does fx go here?)
            .then(newUser => {
                const token = jwt.sign(
                    {
                        username: newUser.username,
                        id: newUser.id
                    },
                    process.env.JWT_SECRET,
                    {
                        expiresIn: "30 days"
                    }
                )
               
                res.status(200).json({
                    "token" : token,
                    createdUser
                });
            })
            .catch(err => {
                res.status(500).json(err);
            }))
        })
    })
}

const login = (req, res) => {
    User.findById(req.params.id, (err, foundUser))//fx here like above?
    //({
    //     where: {
    //         username: req.body.username
    //     }
    // })
    .then(foundUser => {
        if(foundUser){
            bcrypt.compare(req.body.password, foundUser.password, (err, match) => {
                if(match){

                    const token = jwt.sign(
                        {
                            username: foundUser.username,
                            id: foundUser.id
                        },
                        process.env.JWT_SECRET,
                        {
                            expiresIn: "30 days"
                        }
                    )
                    res.status(200).json({
                        "token" : token,
                        foundUser
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
    .catch(err => {
        res.status(constants.INTERNAL_SERVER_ERROR).send(`ERROR: ${err}`);
    })
}

const verifyUser = (req, res) => {
    User.findByPk(req.user.id, {
        attributes: ['id', 'username', 'email', 'name']
    })
    .then(foundUser => {
        res.status(200).json(foundUser);
    })
    .catch(err => {
        res.status(constants.INTERNAL_SERVER_ERROR).send(`ERROR: ${err}`);
    }) 
}

module.exports = {
    signUp,
    login,
    verifyUser
}