const mongoose = require("mongoose");
const Section = require("../model/SectionModel");
const SubSection = require("../model/SubSectionModel");
const CourseProgress = require("../model/CourseProgressModel");
const Course = require("../model/CourseModel");

// Get the subsection -> get the courseProgress schema for the user for this course -> IF not alrady completed,
// push the subsecion into the courseProgress
exports.updateCourseProgress = async (req, res) => {
    const { courseId, subsectionId } = req.body;
    const userId = req.user.id;

    try {
        // Check if the subsection is valid
        const subsection = await SubSection.findById(subsectionId);
        if (!subsection) {
            return res.status(404).json({ error: "Invalid subsection" });
        }

        // Find the course progress document for the user and course
        let courseProgress = await CourseProgress.findOne({
            courseID: courseId,
            userId: userId,
        });
        if (!courseProgress) {
            return res.status(404).json({
                success: false,
                message: "Course progress Does Not Exist",
            });
        } 
        else {
            // If course progress exists, check if the subsection is already completed
            if (courseProgress?.completedVideos?.includes(subsectionId)) {
                return res.status(400).json({ error: "Subsection already completed" });
            }

            // Push the subsection into the completedVideos array
            courseProgress.completedVideos.push(subsectionId);
        }

        // Save the updated course progress
        await courseProgress.save();

        return res.status(200).json({
            success: true,
            message: "Course progress updated",
        });
    } 
    catch (error) {
        console.error(error);
        return res.status(500).json({
            error: "Internal server error",
            message: error.message,
        });
    }
};