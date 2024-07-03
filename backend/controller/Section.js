const Course = require("../model/CourseModel");
const Section = require("../model/SectionModel");
const SubSection = require("../model/SubSectionModel");

//**********************************************To create a section**************************************************
const getCourseIDFromURL = () => {
    const path = window.location.pathname;
    const pathParts = path.split("/");
    return pathParts[pathParts.length - 1]; // Assuming courseID is the last part of the path
};
exports.createSection = async (req, res) => {
    try {
        //     console.log("req -> ", req.body);
        const { sectionName, courseID } = req.body;

        if (!sectionName || !courseID) {
            return res.status(400).json({
                success: false,
                message: "Empty fields. All fields are required.",
            });
        }
        //Creating a new section
        const newSection = await Section.create({ sectionName });
        //     console.log("New secion -> ", newSection);
        //Updating the section in the course schema
        const updatedCourse = await Course.findByIdAndUpdate(
            courseID,
            {
                $push: { courseContent: newSection._id },
            },
            { new: true }
        )
            .populate({
                path: "courseContent",
                populate: {
                    path: "subSection",
                },
            })
            .exec();

        //     console.log("Updated Course : ", updatedCourse);
        return res.status(200).json({
            success: true,
            message: "Section created succesfully and pointed towards the respective course. ",
            updatedCourse,
        });
    } catch (err) {
        return res.status(400).json({
            success: false,
            message: "Something occured while creating section. Try again.",
            description: err.message,
        });
    }
};

//******************************************Update a section*********************************************************
exports.updateSection = async (req, res) => {
    try {
        const { sectionName, sectionID, courseId } = req.body;
        if (!sectionName || !sectionID || !courseId) {
            return res.status(400).json({
                success: false,
                message: "Fields are missing.",
            });
        }
        //Update the name od the section
        const updatedSection = await Section.findByIdAndUpdate(
            sectionID,
            { sectionName },
            { new: true }
        );
        const course = await Course.findById(courseId)
            .populate({
                path: "courseContent",
                populate: {
                    path: "subSection",
                },
            })
            .exec();
        return res.status(200).json({
            success: true,
            message: "Section updated succesfully. ",
            data: course,
        });
    } catch (err) {
        return res.status(400).json({
            success: false,
            message: "Failed to update section. Try again.",
            description: err.message,
        });
    }
};

//**************************************Delete a Section***********************************************************
exports.deleteSection = async (req, res) => {
    try {
        const { sectionID, courseId } = req.body;
        //Removing section from the Courses List
        await Course.findByIdAndUpdate(courseId, {
            $pull: { courseContent: sectionID },
        });
        //Find by ID and delete
        const section = await Section.findById(sectionID);
        if (!section) {
            return res.status(404).json({
                success: false,
                message: "Section not found. ",
            });
        }
        await SubSection.deleteMany({ _id: { $in: section.subSection } });
        await SubSection.findByIdAndDelete(sectionID);
        const course = await Course.findById(courseId).populate({
            path: "courseContent",
            populate: {
                path: "subSection",
            },
        });
        return res.status(200).json({
            success: true,
            message: "Section deleted succesfully. ",
        });
    } catch (err) {
        return res.status(400).json({
            success: false,
            message: "Failed to delete section. Try again.",
            description: err.message,
        });
    }
};
