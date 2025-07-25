const Profile = require("../model/ProfileModel");
const User = require("../model/UserModel");
const Course = require("../model/CourseModel");
const CourseProgress = require("../model/CourseProgressModel");
const { convertSecondsToDuration } = require("../utils/secToDuration");
const { uploadImageToCloudinary } = require("../utils/imageUpload");
// Since a profile object is already there in the schema, that was created during signup. So we need not create a
// profile, just updating the existing one would do.

//*******************************************To update a profile**************************************************
exports.updateProfile = async (req, res) => {
    try {
        const { firstName = "", lastName = "", dateOfBirth = "", about = "",
            contactNumber = "", gender = "",} = req.body;
        
        // console.log(req);
        // Getting the userID from the user(decode) part that user put in the token part.
        const userID = req.user.id;
        if (!userID) {
            return res.status(400).json({
                success: false,
                message: "User ID not found.",
            });
        }
        // Finding the user and updating the first name and last name
        const userDetails = await User.findById(userID);
        userDetails.firstName = firstName;
        userDetails.lastName = lastName;
        await userDetails.save();
        //     console.log("User Details : ", userDetails);

        // Finding the user's profile and updating the additional details
        const profileID = userDetails.additionalDetails;
        const profileDetails = await Profile.findById(profileID);
        profileDetails.gender = gender;
        profileDetails.about = about;
        profileDetails.contactNumber = contactNumber;
        profileDetails.dateOfBirth = dateOfBirth;
        await profileDetails.save();

        const updatedUserDetails = await User.findById(userID).populate("additionalDetails").exec();
        //     console.log("Updated User Details : ", updatedUserDetails);

        return res.status(200).json({
            success: true,
            message: "Profile updation was succesful.",
            updatedUserDetails,
        });
    } 
    catch (err) {
        return res.status(400).json({
            success: false,
            message: "Profile Updation was unsuccessful",
            description: err.message,
        });
    }
};

//****************************************To delete account*******************************************************
exports.deleteProfile = async (req, res) => {
    try {
        const id = req.user.id;
        const userDetails = await User.findById(id);
        if (!userDetails) {
            return res.status(404).json({
                succes: false,
                message: "Unable to fetch user.",
            });
        }
        // first we remove the profile linked to the user, then we delete the user.
        // The profile is stored in the additional details part of User schema
        await Profile.findByIdAndDelete({ _id: userDetails.additionalDetails });
        // Deleting the user
        await User.findByIdAndDelete({ _id: id });

        return res.status(200).json({
            success: true,
            message: "Deletion of user was successful. ",
        });
    } 
    catch (err) {
        return res.status(400).json({
            success: false,
            message: "Profile Deletion was undsuccesful",
            description: err.message,
        });
    }
};

//*************************************To get all user Detials****************************************************
exports.getAllUserDetails = async (req, res) => {
    try {
        const id = req.user.id;
        const userDetails = await User.findById(id).populate("additionalDetails").exec();
        return res.status(200).json({
            success: true,
            message: "Getting all user details was succesful. ",
            userDetails,
        });
    } 
    catch (err) {
        return res.status(400).json({
            success: false,
            message: "Attempt to get all the user details was unsuccesful",
            description: err.message,
        });
    }
};

//********************************************************update display picture************************************* */
exports.updateDisplayPicture = async (req, res) => {
    try {
        const displayPicture = req.files.displayPicture;
        const userId = req.user.id;
        const image = await uploadImageToCloudinary(
            displayPicture,
            process.env.FOLDER_NAME, 1000, 1000
        );

        try {
            const updatedProfile = await User.findByIdAndUpdate(
                { _id: userId },
                { image: image.secure_url },
                { new: true }
            );
        } 
        catch (err) {
            console.log(err);
        }
        return res.status(200).json({
            success: true,
            message: "Image updated successfully.",
        });
    } 
    catch (err) {
        return res.status(400).json({
            success: false,
            message: err.message,
            description: err,
        });
    }
};

//************************************************Get Enrolled Courses**********************************************
exports.getEnrolledCourses = async (req, res) => {
    try {
        const userId = req.user.id;
        let userDetails = await User.findOne({ _id: userId })
            .populate({
                path: "courses",
                populate: {
                    path: "courseContent",
                    populate: {
                        path: "subSection",
                    },
                },
            })
            .exec();

        userDetails = userDetails.toObject(); // Mongoose document to regular JS object

        if (!userDetails) {
            return res.status(400).json({
                success: false,
                message: `Could not find user with id: ${userId}`,
            });
        }

        for (const course of userDetails.courses) {
            let totalDurationInSeconds = 0;
            let subsectionLength = 0;

            // Get the total duration over all the section to be displayed on the enrolled courses for each course
            for (const courseContent of course.courseContent) {
                totalDurationInSeconds += courseContent.subSection.reduce(
                    (acc, curr) => acc + parseInt(curr.timeDuration),
                    0
                );
                course.totalDuration = convertSecondsToDuration(totalDurationInSeconds);
                subsectionLength += courseContent.subSection?.length;
            }

            // Now we get the amount of lectures that have been completed by the user.
            let courseProgressCount = await CourseProgress.findOne({
                courseID: course._id,
                userId: userId,
            });
            courseProgressCount = courseProgressCount?.completedVideos?.length;

            // Now representing the course progress in terms of percentage to display the progress bar
            if (subsectionLength === 0) {
                course.progressPercentage = 100;
            } 
            else {
                const multiplier = Math.pow(10, 2);
                course.progressPercentage =
                    Math.round((courseProgressCount / subsectionLength) * 100 * multiplier) /
                    multiplier;
            }
        }

        return res.status(200).json({
            success: true,
            data: userDetails.courses,
        });
    } 
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

//*********************************************For instructor dashboard*******************************************
exports.instructorDashboard = async (req, res) => {
    try {
        const courseDetails = await Course.find({ instructor: req.user.id });

        // Compute the statistics for every course of that instructor.
        const courseData = courseDetails.map((course) => {
            const totalStudentsEnrolled = course.studentsEnrolled.length;
            const totalAmountGenerated = totalStudentsEnrolled * course.price;

            // Create a new object with the additional fields
            const courseDataWithStats = {
                _id: course._id,
                courseName: course.courseName,
                courseDescription: course.courseDescription,
                totalStudentsEnrolled,
                totalAmountGenerated,
            };

            return courseDataWithStats;
        });

        res.status(200).json({ courses: courseData });
    } 
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
