const mongoose = require('mongoose');

const connectionString = 'mongodb://localhost/backend-updated';

mongoose.connect(connectionString, { useNewUrlParser: true,
                                     useUnifiedTopology: true,
                                     useCreateIndex: true,
                                     useFindAndModify: false
                                    });


mongoose.connection.on('connected', () => {
  console.log(`Mongoose connected to ${connectionString}`);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});

mongoose.connection.on('error', (err) => {
  console.log('Mongoose error: ', err);
});

const user = require('./user');
exports.user = user;

const products = require('./products');
exports.products = products;

const orderDetails = require('./orderdetails');
exports.orderDetails = orderDetails;