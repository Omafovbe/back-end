//Import express web framework for node.js
const express = require('express');

//Initialize the router
const router = express.Router();

//Import auth controller
const AuthController = require('../controllers/authCtrl')

//Import check-auth middleware
const checkAuth = require('../middleware/check-auth')

//This root route handle the submision of incoming registration data to the database
router.post('/signup', AuthController.signup);

//Handle login route
router.post('/login',AuthController.login);

//Handle get request for a single user based on their specific ID (PROTECTED)
router.get('/me/:userId', checkAuth, AuthController.me);

//Handle resetting of the log in user and (PROTECTED) based on the logged in user to be able to access it
router.get('/changePassword', checkAuth, AuthController.changePassword);


//Export the module for use in other modules
module.exports = router