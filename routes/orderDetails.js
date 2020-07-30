const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');

router.post('/', ctrl.orderDetails.createOrderDetails);
router.get('/all', ctrl.orderDetails.showAllOrderDetails);
router.get('/topic/:name', ctrl.orderDetails.findOderDetailsByUser)
router.get('/:id', ctrl.orderDetails.showOrderDetails);
router.delete('/:id', ctrl.orderDetails.deleteOrderDetails);

router.put('/:id', ctrl.orderDetails.editOrderDetails);

module.exports = router;