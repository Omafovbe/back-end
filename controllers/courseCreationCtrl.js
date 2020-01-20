//Import users database schema
const User =  require('../models/courseDetailsModel');

//Handling creation of courses JUST only by the user with the level of clearance required!
createcourse = (req, res) => {
	//Create if clearance (isSuperAdmin or staff is education officer)
	if(req.authData.isSuperAdmin || req.authData.staffLevelStatus == "education officer"){

	} else {
        res.status(500).json({
            message: "Permission denied!"
        })
    }
}