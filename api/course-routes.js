//Import express web framework for node.js
const express = require('express');

//Initialize the router
const router = express.Router();

//Import check-auth middleware
const checkAuth = require('../middleware/check-auth')

//Import suAdmin controller
const CourseController = require('../controllers/courseCtrl')

//handle 
router.post('/createCourse', checkAuth, AuthController.createCourse);

router.post('/createCourseCategory', checkAuth, AuthController.signup);

//Export the module for use in other modules
module.exports = router