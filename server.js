const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const routes = require('./routes');

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Homepage');
})

app.use('/user', routes.user);
app.use('/products', routes.products);
app.use('/orderdetails', routes.orderDetails);

app.listen(3001, ()=>{
	console.log('listening....');
});