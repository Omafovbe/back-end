//Import express web framework for node.js
const mongoose = require('mongoose')

//Declare the mongoose Schema
const Schema = mongoose.Schema

// Question schema showing how each doc would look like in collection
const testQuestionSchema = new Schema(
    {
        question: String,
        options: Object,
        answerKey: String,
        courseId: {type: mongoose.Schema.Types.ObjectId, ref: 'CourseDetail'},
        addedBy: {type: mongoose.Schema.Types.ObjectId, ref: 'Users'}
    },
    { timestamps: true },
)

//Export the module for use in other modules
module.exports = mongoose.model('TestQuestions', testQuestionSchema)