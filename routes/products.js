const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');

router.post('/', ctrl.products.createProducts);
router.get('/all', ctrl.products.showAllProducts);
router.get('/:id', ctrl.products.showProducts);

module.exports = router;