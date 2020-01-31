//Import express web framework for node.js
const express = require('express');

//Initialize the router
const router = express.Router();

//Import check-auth middleware
const checkAuth = require('../middleware/check-auth')

//Import suAdmin controller
const ExamQuestion = require('../controllers/examCtrl')

//Add question to collection
router.post('/new-question', checkAuth, ExamQuestion.addExamQuestion)

//Update question
router.post('/update-question', checkAuth, ExamQuestion.updateExamQuestion)

//Delete a question

router.post('/delete-question', checkAuth, ExamQuestion.deleteExamQuestion)


//Retrieve questions from the database

router.get('/:courseId', ExamQuestion.getExamQuestions)
