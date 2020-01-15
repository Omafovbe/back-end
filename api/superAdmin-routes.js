//Import express web framework for node.js
const express = require('express');

//Import bcrypt to hash password
const bcrypt = require('bcrypt');

//Import validator to valid incoming email address
const validator = require("email-validator");

//Initialize the router
const router = express.Router();

//Import users database schema
const User =  require('../models/userModel');

//Import check-auth middleware
const checkAuth = require('../middleware/check-auth')

//Let Super Admin get all users
router.get('/allusers', checkAuth, (req, res) => {
    User.find().select('firstname lastname username email age regDate regTime isLearner  isInstructor _id').then(
        docs => {
            const response = {
                count: docs.length,
                data: docs.map(doc => {
                    return {
                        _id: doc._id,
                        firstname: doc.firstname,
                        lastname: doc.lastname,
                        username: doc.username,
                        email: doc.email,
                        age: doc.age,
                        regDate: doc.regDate,
                        regTime: doc.regTime,
                        isLearner:doc.isLearner,
                        isInstructor: doc.isInstructor,
                        request: {
                            type: 'GET',
                            url: 'http://'+req.headers.host+'/users/'+doc._id
                        }
                    }
                })
            }
        res.status(200).json(response)
    })
    .catch(error => {
        res.status(500).json({
            error,
        })
    });
});

//Handling deleting of user
router.delete('/deleteuser/:userId', checkAuth, (req, res) => {
    const uID = req.params.userId;
    User.deleteOne({_id: uID})
        .then( result => {
            if(result.deletedCount > 0){
                res.status(200).json({
                    message: "User deleted",
                    request: {
                        type: 'POST',
                        url: 'http://'+req.headers.host+'auth/signup',
                        body : {
                            firstname: 'firstname',
                            lastname: 'lastname',
                            username: 'username',
                            age: 'age',
                            email: 'email',
                            password: 'password',
                        }
                    }
                })
            }else{
                res.status(422).json({
                    message: "User not found",
                })
            }
        })
        .catch( err => {
            res.status(500).json({
                err,
            })
        })
});

//Export the module for use in other modules
module.exports = router