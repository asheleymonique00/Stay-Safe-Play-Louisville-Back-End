require('dotenv').config();//added 7.30.20

const express = require('express');
const bodyParser = require('body-parser');

//added in 7.3020
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
const routes = require('./routes');

//added in 7.30.20
const corsOptions = {
    origin: ['http://localhost:3001'],
    methods: "GET,POST,PUT,DELETE",
    credentials: true, //allows session cookies to be sent back and forth
    optionsSuccessStatus: 200 //legacy browsers
  }

app.use(cors(corsOptions))
app.use(bodyParser.json());//already in

// added in 7.30.20
const verifyToken = (req, res, next) => {
    let token = req.headers['authorization'];
    if(token){
        token = token.substring(constants.BEARER_START_INDEX) 
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decodedUser) => {
        if(err || !decodedUser){
            return res.status(constants.UNAUTHORIZED).send(`ERROR: ${err}`);
        }
        req.user = decodedUser;

        next();
    })
}

app.use('/auth', routes.auth);

app.get('/', (req, res) => {
    res.send('Homepage');
})

app.use('/user', routes.user);
app.use('/products', routes.products);
app.use('/orderdetails', routes.orderDetails);

app.listen(3001, ()=>{
	console.log('listening....');
});