//Import express web framework for node.js
const express = require('express');

//Initialize the router
const router = express.Router();

//Import check-auth middleware
const checkAuth = require('../middleware/check-auth')

//Import Cours Ccontroller
const CourseController = require('../controllers/courseCtrl')

//Import Multer Configuration
const upload = require('../middleware/multerConfig')

//handle creation of courses by the Super Admin and Education officer alone 
router.post('/createCourse', checkAuth, upload.single('coverpicture'), CourseController.createCourse);

//handle creation of course category by the Super Admin and Education officer alone 
router.post('/createCourseCategory', checkAuth, CourseController.createCourseCategory);

//handle suspention of courses
router.post('/suspendcourse/:course_id', checkAuth, CourseController.suspendCourse);

//handle suspendion of course categories
router.post('/suspendcoursecategory/:coursecat_id', checkAuth, CourseController.suspendCourseCategory);

//Export the module for use in other modules
module.exports = router