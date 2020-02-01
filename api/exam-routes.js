//Import express web framework for node.js
const express = require('express');

//Initialize the router
const router = express.Router();

//Import check-auth middleware
const checkAuth = require('../middleware/check-auth')

//Import Exam Questions controller
const ExamController = require('../controllers/examCtrl')

//Add question to collection
router.post('/new-question', checkAuth, ExamController.addExamQuestion)

//Update question
router.post('/update-question', checkAuth, ExamController.updateExamQuestion)

//Delete a question
router.post('/delete-question', checkAuth, ExamController.deleteExamQuestion)

//Retrieve questions from the database
router.get('/get-exam/:courseId', checkAuth, ExamController.getExamQuestions)

//Export the module for use in other modules
module.exports = router