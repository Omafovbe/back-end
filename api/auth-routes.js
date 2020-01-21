//Import express web framework for node.js
const express = require('express');

//Initialize the router
const router = express.Router();

//Import auth controller
const AuthController = require('../controllers/authCtrl')

//Import Multer Configuration
const upload = require('../multerConfig')

//Import check-auth middleware
const checkAuth = require('../middleware/check-auth')

//This root route handle the submision of incoming registration data to the database
router.post('/signup', AuthController.signup);

//Handle login route
router.post('/login',AuthController.login);

//Handle get request for a single user based on their specific ID (PROTECTED)
router.get('/me/:userId', checkAuth, AuthController.me);

router.post('/profile-pic', upload.single('avatar'), AuthController.uploadPicture)

//Export the module for use in other modules
module.exports = router