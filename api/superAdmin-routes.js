//Import express web framework for node.js
const express = require('express');

//Initialize the router
const router = express.Router();

//Import check-auth middleware
const checkAuth = require('../middleware/check-auth')

//Import suAdmin controller
const SuperAdminController = require('../controllers/superAdminCtrl')

//Let Super Admin get all users (PROTECTED)
router.get('/allusers', checkAuth, SuperAdminController.getAllUsers);

//Handle get request for a single user of all user to be accessed  by the super admin (PROTECTED)
router.get('/getOneUser/:userId', checkAuth, SuperAdminController.getOneUser);

//Handling deleting of user (PROTECTED)
router.delete('/deleteuser/:userId', checkAuth, SuperAdminController.deleteOneUser);

//Export the module for use in other modules
module.exports = router