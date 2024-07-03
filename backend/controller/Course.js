const User = require("../model/UserModel");
const Category = require("../model/CategoryModel");
const Course = require("../model/CourseModel");
const { uploadImageToCloudinary } = require("../utils/imageUpload");
require("dotenv").config();
const Section = require("../model/SectionModel");
const { convertSecondsToDuration } = require("../utils/secToDuration");
const SubSection = require("../model/SubSectionModel");
const CourseProgress = require("../model/CourseProgressModel");

//**************************************To create a new Course******************************************************
exports.createCourse = async (req, res) => {
    try {
        //the id lies in the payload part of decode which was inserted into the db itself.
        const userID = req.user.id;
        let {
            courseName,
            courseDescription,
            whatYouWillLearn,
            price,
            category,
            tag: _tag,
            status,
            instructions: _instructions,
        } = req.body;
        let thumbnail;
        try {
            thumbnail = req.files.thumbnailImage;
        } catch (err) {
            console.log(err.message);
        }
        try {
            if (
                !courseName ||
                !courseDescription ||
                !whatYouWillLearn ||
                !price ||
                !_tag.length ||
                !thumbnail ||
                !thumbnail ||
                !_instructions.length
            ) {
                return res.status(404).json({
                    success: false,
                    message: "All are mandatory fields.",
                });
            }
        } catch (err) {
            console.log("try", err.message);
        }

        const alreadyExists = await Course.find({ courseName: courseName });
        if (alreadyExists?.length) {
            return res.status(403).json({
                message: "Already registered course in the databse.",
            });
        }

        // Convert the tag and instructions from stringified Array to Array
        const tag = JSON.parse(_tag);
        const instructions = JSON.parse(_instructions);

        if (!status || status === undefined) status = "Draft";

        //Get the instructor details
        const instructorDetails = await User.findById(userID, {
            accountType: "Instructor",
        });
        if (!instructorDetails) {
            return res.status(400).json({
                success: false,
                message: "Could not find the instructor details.",
            });
        }

        //Get the category details
        const categoryDetails = await Category.findById(category);
        if (!categoryDetails) {
            return res.status(400).json({
                success: false,
                message: "Could not find the tag details.",
            });
        }
        //Uploading image to the cloud
        const thumbnailImage = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME);
        //Now, create a new course entry in the database
        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor: instructorDetails._id,
            whatYouWillLearn: whatYouWillLearn,
            price,
            tag,
            category: categoryDetails._id,
            status: status,
            instructions,
            thumbnail: thumbnailImage.secure_url,
        });

        //Add this new course to the instructor schema
        await User.findByIdAndUpdate(
            { _id: instructorDetails._id },
            {
                $push: { courses: newCourse._id },
            },
            { new: true }
        );

        //Add the new course to the categories
        const categoryDetails2 = await Category.findByIdAndUpdate(
            { _id: category },
            {
                $push: { course: newCourse._id },
            },
            { new: true }
        );
        return res.status(200).json({
            success: true,
            message: "Course created succesfully.",
            data: newCourse,
        });
    } catch (err) {
        return res.status(400).json({
            success: false,
            message: "Somethiung occured while creating course. Try again.",
            description: err.message,
        });
    }
};

//*****************************************To get all courses****************************************************
exports.showAllCourses = async (req, res) => {
    try {
        const allCourses = await Course.find(
            {},
            {
                instructor: true,
                ratingAndReviews: true,
                courseName: true,
                studentsEnrolled: true,
                thumbnail: true,
                price: true,
            }
        )
            .populate("instructor")
            .exec();

        return res.status(200).json({
            success: true,
            message: "Fetching of all courses was done succesfully.",
            data: allCourses,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error in getting all courses.",
            description: err.message,
        });
    }
};

/**********************************************To edit a course*****************************************************/
exports.editCourse = async (req, res) => {
    try {
        const { courseId } = req.body;
        const updates = req.body;
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ error: "Course not found" });
        }

        // If Thumbnail Image is found, update it
        if (req.files) {
            const thumbnail = req.files.thumbnailImage;
            const thumbnailImage = await uploadImageToCloudinary(
                thumbnail,
                process.env.FOLDER_NAME
            );
            course.thumbnail = thumbnailImage.secure_url;
        }

        // Update only the fields that are present in the request body
        for (const key in updates) {
            if (updates.hasOwnProperty(key)) {
                if (key === "tag" || key === "instructions") {
                    course[key] = JSON.parse(updates[key]);
                } else {
                    course[key] = updates[key];
                }
            }
        }

        await course.save();

        const updatedCourse = await Course.findById(courseId)
            .populate({
                path: "instructor",
                populate: {
                    path: "additionalDetails",
                },
            })
            .populate("category")
            .populate("ratingAndReviews")
            .populate({
                path: "courseContent",
                populate: {
                    path: "subSection",
                },
            })
            .exec();

        res.json({
            success: true,
            message: "Course updated successfully",
            data: updatedCourse,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
};

/*********************************************To get Course Detials************************************************/
exports.getCourseDetails = async (req, res) => {
    try {
        const { courseId } = req.body;
        let courseDetails;
        try {
            courseDetails = await Course.find({
                _id: courseId,
            })
                .populate({
                    path: "instructor",
                    populate: {
                        path: "additionalDetails",
                    },
                })
                .populate("category")
                .populate({
                    path: "courseContent",
                    populate: {
                        path: "subSection",
                        select: "-videoUrl",
                    },
                })
                .exec();
        } catch (err) {
            return res.status(400).json({
                message: err.message,
            });
        }

        if (!courseDetails) {
            return res.status(400).json({
                success: false,
                message: `Could not find course with id: ${courseId}`,
            });
        }
        //TODO: The course content fied is not getting populated hance the the total duration cant' be done
        /* console.log('Course Content : ', courseDetails.courseContent);
        let totalDurationInSeconds = 0
        courseDetails.courseContent.forEach((content) => {
            content.subSection.forEach((subSection) => {
                const timeDurationInSeconds = parseInt(subSection.timeDuration)
                totalDurationInSeconds += timeDurationInSeconds
            })
        })
    
        const totalDuration = convertSecondsToDuration(totalDurationInSeconds) */

        return res.status(200).json({
            success: true,
            data: {
                courseDetails,
            },
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

/**************************************To get Full Course Details*************************************************/
exports.getFullCourseDetails = async (req, res) => {
    try {
        const { courseId } = req.body;
        const userId = req.user.id;
        const courseDetails = await Course.find({ _id: courseId })
            .populate({
                path: "instructor", //Populate the instructor field and the profile details that lies in the
                populate: { path: "additionalDetails" }, //additionalDetails part of it.
            })
            .populate("category")
            .populate({
                path: "courseContent", //Populate the courseContent part and the subSection that refers to it
                populate: { path: "subSection" },
            })
            .populate("ratingAndReviews")
            .exec();

        if (!courseDetails) {
            return res.status(400).json({
                success: false,
                message: "Couldn't find course Details",
            });
        }
        if (courseDetails.status === "Draft") {
            return res.status(403).json({
                success: false,
                message: `Accessing a draft course is forbidden`,
            });
        }
        let courseProgressCount = await CourseProgress.findOne({
            courseID: courseId,
            userId: userId,
        });

        if (!courseDetails) {
            return res.status(400).json({
                success: false,
                message: `Could not find course with id: ${courseId}`,
            });
        }

        let totalDurationInSeconds = 0;
        courseDetails?.courseContent?.forEach((content) => {
            content?.subSection?.forEach((subSection) => {
                const timeDurationInSeconds = parseInt(subSection.timeDuration);
                totalDurationInSeconds += timeDurationInSeconds;
            });
        });

        const totalDuration = convertSecondsToDuration(totalDurationInSeconds);

        return res.status(200).json({
            success: true,
            data: {
                courseDetails,
                totalDuration,
                completedVideos: courseProgressCount?.completedVideos
                    ? courseProgressCount?.completedVideos
                    : [],
            },
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

/**************************************************To get courses of an Insructor**********************************/
exports.getInstructorCourses = async (req, res) => {
    try {
        // Get the instructor ID from the authenticated user or request body
        const instructorId = req.user.id;

        // Find all courses belonging to the instructor
        const instructorCourses = await Course.find({
            instructor: instructorId,
        }).sort({ createdAt: -1 });

        // Return the instructor's courses
        res.status(200).json({
            success: true,
            data: instructorCourses,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Failed to retrieve instructor courses",
            error: error.message,
        });
    }
};

/********************************************To delete a course****************************************************/
exports.deleteCourse = async (req, res) => {
    try {
        const { courseId } = req.body;

        // Find the course
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        // Unenroll students from the course
        const studentsEnrolled = course.studentsEnrolled;
        for (const studentId of studentsEnrolled) {
            await User.findByIdAndUpdate(studentId, {
                $pull: { courses: courseId },
            });
        }

        // Delete sections and sub-sections
        const courseSections = course.courseContent;
        for (const sectionId of courseSections) {
            // Delete sub-sections of the section
            const section = await Section.findById(sectionId);
            if (section) {
                const subSections = section.subSection;
                for (const subSectionId of subSections) {
                    await SubSection.findByIdAndDelete(subSectionId);
                }
            }

            // Delete the section
            await Section.findByIdAndDelete(sectionId);
        }

        // Delete the course
        await Course.findByIdAndDelete(courseId);

        return res.status(200).json({
            success: true,
            message: "Course deleted successfully",
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        });
    }
};
