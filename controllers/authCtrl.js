//Import bcrypt to hash password
const bcrypt = require('bcryptjs');

//Import validator to valid incoming email address
const validator = require("email-validator");

//Import jsonwebtoken to generate token when user login for authentication
const jwt = require("jsonwebtoken");

//Import users database schema
const User =  require('../models/userModel');

//Handle signup without auth for all users
signup = (req, res) => {
    //If email already exist do not create account
    if (User.findOne({ email: req.body.email })) {
        res.status(400).json({
            message: 'Email already exist'
        })
    }

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

//Handle login and and generate token to be stored to the client and send back for verification when requesting for a protected route api
login = (req, res) => {
	console.log(req.body)
	let email = req.body.email
    let pswd = req.body.password
    User.findOne({ email: email }).then( user => { 
        console.log(user._id) 

        if (user) {
            var compareHash = bcrypt.compareSync(pswd, user.password);
            if (compareHash) {
                const token = jwt.sign({
                    _id: user._id,
                    username: user.username,
                    regDate: user.regDate,
                    regTime: user.regTime,
                },
                    process.env.JWT_SECRET,
                    {
                        expiresIn: "1h"
                    })
                const { password, ...userWithoutPassword } = user.toObject()
                
                res.status(200).json({
                    message: 'Authentication successful',
                    user: userWithoutPassword,
                    token: token
                })
            }
        }
        
    }).catch( err => {
        res.status(500).json({
            message: 'An error occured'
        })
    })
    
}

//Handle displaying of data of a single user based on their id (PROTECTED)
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