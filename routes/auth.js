const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');

router.post('/signup', ctrl.auth.signUp);
router.post('/login', ctrl.auth.login);


module.exports = router;