//Import users database schema
const Course =  require('../models/courseDetailsModel');

//Import users database schema
const CourseCategory =  require('../models/courseCategoryModel')

//Handling creation of courses JUST only by the user with the level of clearance required!
createCourse = (req, res) => {
	//Create if clearance (isSuperAdmin or staff is education officer)
	if(req.authData.isSuperAdmin || req.authData.staffLevelStatus == "education officer"){
		Course.findOne({ title: req.body.title, }).then(course => {
            if(course){
                res.status(400).json({
                    message: 'Course title already exist'
                })
            }else{
            	if (!req.file){
			        res.status(400).json({
			            message: 'Please select an image for upload'
			        })
			    }

			    if (req.fileValidationError) {
			        res.status(400).json({
			            message: req.fileValidationError
			        })
			    }
            	const courseData = new Course({
		            title: req.body.title,
		            description: req.body.description,
		            price: req.body.price,
		            outline: req.body.outline,
		            linkToCoursePDF: req.body.linkToCoursePDF,
			        linkToCourseVideo: req.body.linkToCourseVideo,
			        instructors: [req.body.instructors],
			        duration: req.body.duration,
			        linkToTestBoard: req.body.linkToTestBoard,
			        linkToExam: req.body.linkToExam,
			        linkToCourseEvaluation: req.body.linkToCourseEvaluation,
			        createBy: req.authData._id
		        });
		        courseData.save()
		        .then(
		        saved => {
		        	User.findOneAndUpdate({_id: saved._id}, {
			            coverPicture: req.file
			        })
		            console.log("Saved to database with a unique ID of: " + saved._id)
		            res.status(200).json({
		                success: true,
		                id: saved._id,
		                message: 'Course created successfully!',
		            })
		        })
		        .catch(error => {
		            res.status(500).json({
		                error,
		            })
		        })
            }
        })
	} else {
        res.status(500).json({
            message: "Permission denied!"
        })
    }
}

//Handling creation of course categories if any is to be added JUST only by the user with the level of clearance required!
createCourseCategory = (req, res) => {
	//Create if clearance (isSuperAdmin or staff is education officer)
	if(req.authData.isSuperAdmin || req.authData.staffLevelStatus == "education officer"){
		console.log(req.body)
		CourseCategory.findOne({ title: req.body.title, }).then(course => {
			console.log(course)
            if(course){
                res.status(400).json({
                    message: 'Course Category title already exist'
                })
            }else{
            	const courseCategoryData = new CourseCategory({
		            title: req.body.title,
		            description: req.body.description,
			        createBy: req.authData._id
		        });
		        courseCategoryData.save()
		        .then(
		        saved => {
		            console.log("Saved to database with a unique ID of: " + saved._id)
		            res.status(200).json({
		                success: true,
		                id: saved._id,
		                message: 'Course category created successfully!',
		            })
		        })
		        .catch(error => {
		            res.status(500).json({
		                error,
		            })
		        })
            }
        })
	} else {
        res.status(500).json({
            message: "Permission denied!"
        })
    }
}

//Allow the cleared user to suspend am active course if they wanted
suspendCourse = (req, res) => {

}

module.exports = {
	createCourse,
	createCourseCategory,
	suspendCourse
}