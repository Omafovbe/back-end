//Import bcrypt to hash password
const bcrypt = require('bcryptjs');

//Import validator to valid incoming email address
const validator = require("email-validator");

//Import jsonwebtoken to generate token when user login for authentication
const jwt = require("jsonwebtoken");

//Import multer middleware to upload files
const multer = require('multer');

//Import users database schema
const User =  require('../models/userModel');

//Handle signup without auth for all users
signup = (req, res) => {
    //Validate incoming email address before proceeding
    if(validator.validate(req.body.email)){
        //If email already exist do not create account
        User.findOne({ email: req.body.email, }).then(user => {
            if(user.email == req.body.email){
                res.status(400).json({
                    message: 'Email already exist'
                })
            }
        })

        //If username already exist do not create account
        User.findOne({ username: req.body.username, }).then(user => {
            if(user.username == req.body.username){
                res.status(400).json({
                    message: 'Username already exist'
                })
            }
        })

        //Create account if username and email aren't in db
        var hash = bcrypt.hashSync(req.body.password, 10);
        const userData = new User({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            username: req.body.username,
            age: req.body.age,
            email: req.body.email,
            password: hash,
        });
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
    } else{
        res.status(400).json({
            message: 'Invalid email address',
        })
    }
};

//Handle login and and generate token to be stored to the client and send back for verification when requesting for a protected route api
login = (req, res, next) => {
	let email = req.body.email
    let pswd = req.body.password
    User.findOne({ email: email }).then( user => { 

        if (user) {
            var compareHash = bcrypt.compareSync(pswd, user.password);
            if (compareHash) {
                const token = jwt.sign({
                    _id: user._id,
                    username: user.username,
                    regDate: user.regDate,
                    regTime: user.regTime,
                    isLearner: user.isLearner,
                    isInstructor: user.isInstructor,
                    isSuperAdmin: user.isSuperAdmin,
                    staffLevelStatus: user.staffLevelStatus
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
            } else{
                res.status(401).json({
                    message: "Auth failed"
                })
            }
        } else{
            res.status(401).json({
                message: "Auth failed"
            })
        }
         }).catch( err => {
            res.status(500).json({
                message: 'An error occured'
            })
        })
    
}

//Handle displaying of data of a single user based on their id (PROTECTED)
me = (req, res) => {
    const uID = req.authData._id;
    User.findById(uID).select('firstname lastname username email age regDate regTime isLearner isInstructor isSuperAdmin staffLevelStatus _id').then(
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

//Handling resetting of the password of the logged in user by checking the id of the user through the token 
//sent by the request header in which also pass through the check-auth middleware before coming here.
changePassword = (req, res) => {
    const userId = req.authData._id;
    const { newPassword } = req.body.newPassword

    User.findOne({_id: userId})
        .then( user => {
            let hash = bcrypt.hashSync(newPassword, 10)
            User.findOneAndUpdate({_id: userId}, {password: hash})
            .then(() => res.status(200).json({message: 'Password change Successful'}))
            .catch( err => res.status(500).json(err))
        })
        .catch(() => {
            res.status(401).json({message: 'Unauthorized access'})
        })
}

//Handle profile updating of each user

updateProfle = (req, res) => {
    const userData = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        age: req.body.age,
    });
}

module.exports = {
	signup,
	login,
	me,
    updateProfle,
    changePassword,
}