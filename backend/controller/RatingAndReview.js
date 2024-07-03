const RatingAndReview = require("../model/RatingModel");
const Course = require("../model/CourseModel");
const mongoose = require("mongoose");

//*************************************Create a Rating************************************************************/
exports.createRating = async (req, res) => {
    try {
        const userId = req.user.id;
        const { rating, review, courseId } = req.body;
        //     console.log("req.body ->", req.body);
        //Getting the corresponding courseDeails to check whether the user is alrady enrolled or not
        const courseDetails = await Course.findOne({
            _id: courseId,
            studentsEnrolled: { $elemMatch: { $eq: userId } },
        });
        if (!courseDetails) {
            return res.status(503).json({
                success: false,
                message: "User is not enrolled in the specified course. ",
            });
        }
        //Check if user already reviewed the course
        const alreadyReviewed = await RatingAndReview.findOne({
            user: userId,
            course: courseId,
        });
        if (alreadyReviewed) {
            return res.status(400).json({
                success: false,
                message: "User has already reviewed the specified course. ",
            });
        }

        //Create a new rating and review
        const ratingReview = await RatingAndReview.create({
            rating,
            review,
            user: userId,
            course: courseId,
        });
        //     console.log("Created Rating ->", ratingReview);
        //     console.log(typeof courseId);
        //Update the course with the rating
        const updatedCourseDetails = await Course.findByIdAndUpdate(
            courseId,
            {
                $push: { ratingAndReviews: ratingReview._id },
            },
            { new: true }
        ).populate("ratingAndReviews");
        //     console.log("Updated Course Details :-----------------> ", updatedCourseDetails);
        //Return success response
        return res.status(200).json({
            success: true,
            message: "Rating and Review successfully created",
            ratingReview,
        });
    } catch (err) {
        return res.status(400).json({
            success: false,
            message: "Something went wrong while trying to create a Review.",
            description: err.message,
        });
    }
};

//****************************************Get Average Ratimg***************************************************/
exports.getAverageRating = async (req, res) => {
    try {
        const courseId = req.body.courseId;
        //Get the average rating
        const result = await RatingAndReview.aggregate([
            //Returns an array
            {
                //Find that entry in rating and review wherein course has the courseId
                $match: { course: new mongoose.Types.ObjectId(courseId) }, //Converting to object
            },
            {
                $group: { _id: null, averageRating: { $avg: "$rating" } }, //group by no specific id and average out rating
            },
        ]);

        if (result.length === 0) {
            return res.status(200).json({
                success: true,
                message: "Course has not reviewed yet. ",
                averageRating: 0,
            });
        }

        return res.status(200).json({
            status: true,
            message: "Fetch of average rating was succesful.",
            averageRating: result[0].averageRating,
        });
    } catch (err) {
        return res.status(400).json({
            success: false,
            message: "Something went wrong while trying to get average Rating.",
            description: err.message,
        });
    }
};

//*************************************Get all rating****************************************************************/
exports.getAllRating = async (req, res) => {
    try {
        const allReviews = await RatingAndReview.find({})
            .sort({ rating: "desc" })
            .populate({
                path: "user",
                select: "firstName lastname email image",
            })
            .populate({
                path: "User",
                select: "courseName",
            })
            .exec();
        //     console.log("All Reviews : ", allReviews);

        return res.status(200).json({
            success: true,
            message: "Fetching of all the reviews of a course was succesful. ",
            date: allReviews,
        });
    } catch (err) {
        return res.status(400).json({
            success: false,
            message: "Something went wrong while trying to get all Rating.",
            description: err.message,
        });
    }
};
