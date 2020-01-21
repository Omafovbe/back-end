//Import express web framework for node.js
const mongoose = require('mongoose')

//Declare the mongoose Schema
const Schema = mongoose.Schema

//Get the date and time here
const today = new Date;
const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

// Construct the staffSchema for how each document will look like in the database "Staffs" collection
const courseCategorySchema = new Schema(
    {
        title: {type: String, unique: true},
        description: String,
        status: {type: String, default: 'active'},
        regDate: {type: String, default: date},
        regTime: {type: String, default:time},
        createdBy: {type: String, ref: 'Users'},
    },
    { timestamps: true },
)

//Export the module for use in other modules
module.exports = mongoose.model('CourseCategory', courseCategorySchema)