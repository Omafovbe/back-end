//Import express web framework for node.js
const express = require('express');

//Initialize the router
const router = express.Router();

//Import auth controller
const RaveController = require('../controllers/raveCtrl')

//Import check-auth middleware
const checkAuth = require('../middleware/check-auth')

router.get('/pay', RaveController.initializePayment);

router.get('/verify', RaveController.verifyPayment);

//Export the module for use in other modules
module.exports = router