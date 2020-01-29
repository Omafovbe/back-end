//Import users database schema
const User =  require('../models/userModel');

//Let super admin get all users (PROTECTED)
getAllUsers = (req, res) => {
    if(req.authData.isSuperAdmin){
        User.find().select('firstname lastname username email age regDate regTime isLearner isInstructor isSuperAdmin staffLevelStatus _id').then(
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
    } else {
        res.status(500).json({
            message: "Permission denied!"
        })
    }
}

//Get one user details to b viewed by the super admin
getOneUser = (req, res) => {
    if(req.authData.isSuperAdmin){
    const uID = req.params.userId;
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
    } else {
        res.status(500).json({
            message: "Permission denied"
        })
    }
}

//Let super admin delete a specific user (PROTECTED)
deleteOneUser = (req, res) => {
    console.log(req.authData)
    if(req.authData.isSuperAdmin){
        const uID = req.params.userId;
        User.deleteOne({_id: uID}).then( result => {
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
    } else {
        res.status(500).json({
            message: "Permission denied"
        })
    }
}

//Let Super Admin register staffs
registerStaff = (req, res) => {

}

//let Super Admin and the authorized staff accept instructors
acceptInstructors = (req, res) => {

} 
//let super admin suspend active staff
suspendOneStaff = (req, res) => {

}

module.exports = {
	getAllUsers,
    getOneUser,
	deleteOneUser,
    registerStaff,
    acceptInstructors,
}