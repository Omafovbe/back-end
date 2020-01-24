//Import express web framework for node.js
const express = require('express');

//Initialize the router
const router = express.Router();

//Import suAdmin controller
const PublicController = require('../controllers/publicCtrl')

//handle showing courses to the public with the option to paid before accessing 
router.get('/showCourse', PublicController.showCourse);

//handle showing courses to the public by category
router.get('/showCourseByCategory', PublicController.showCourseByCategory);

//Export the module for use in other modules
module.exports = router