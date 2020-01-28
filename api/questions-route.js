//Import express web framework for node.js
const express = require('express');

//Initialize the router
const router = express.Router();

//Import check-auth middleware
const checkAuth = require('../middleware/check-auth')

//Import suAdmin controller
const TestQuestion = require('../controllers/testCtrl')

//Add question to collection
router.post('/new-question', checkAuth, TestQuestion.addQuestion)

//Update question
router.post('/update-question', checkAuth, TestQuestion.updateQuestion)

//Delete a question

router.post('/delete-question', checkAuth, TestQuestion.deleteQuestion)


//Retrieve questions from the database

router.get('/:courseId', TestQuestion.getQuestions)
