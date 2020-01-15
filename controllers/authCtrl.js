//Import bcrypt to hash password
const bcrypt = require('bcrypt');

//Import validator to valid incoming email address
const validator = require("email-validator");

//Import jsonwebtoken to generate token when user login for authentication
const jwt = require("jsonwebtoken");

//Import users database schema
const User =  require('../models/userModel');

signup = (req, res) => {
	var hash = bcrypt.hashSync(req.body.password, 10);
    const userData = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        age: req.body.age,
        email: req.body.email,
        password: hash,
    });
    if(validator.validate(req.body.email)){
        userData.save().then(
        saved => {
            console.log("Saved to database with a unique ID of: " + saved._id)
            res.status(200).json({
                success: true,
                id: saved._id,
                message: 'User created successfully!',
            })
        })
        .catch(error => {
            res.status(500).json({
                error,
            })
        })
    }else{
        res.status(400).json({
            message: 'Invalid email address',
        })
    }
};

login = (req, res) => {
	console.log(req.body)
	let email = req.body.email
    let pswd = req.body.password
    User.find({ email: email })
        .then(user => {
            if(user.length < 1){
                res.status(401).json({
                    message: "Auth failed"
                })
            }else{
                var compareHash = bcrypt.compareSync(pswd, user[0].password);
                if(compareHash){
                    const token = jwt.sign({
                        _id: user[0]._id,
                        username: user[0].username,
                        regDate: user[0].regDate,
                        regTime: user[0].regTime, 
                    }, 
                    process.env.JWT_SECRET,
                    {
                        expiresIn: "1h"   
                    },)
                    res.status(200).json({
                        message: "Auth successful",
                        token: token
                    })
                } else {
                    res.status(401).json({
                        message: "Auth failed"
                    })
                }
            }
        })
        .catch(err => {
            res.status(500).json({
                err,
            })
        })
}

me = (req, res) => {
	const uID = req.params.userId;
    User.findById(uID).select('firstname lastname username email age regDate regTime isLearner  isInstructor _id').then(
        result => {
        res.status(200).json({
            result: result,
            request: {
                type: "GET",
                url: 'http://'+req.headers.host+'/users'
            }
        })
    })
    .catch(err => {
        console.log(err)
        res.status(400).json({
            err,
        })
    })
}

module.exports = {
	signup,
	login,
	me,
}