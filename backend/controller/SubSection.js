const SubSection = require("../model/SubSectionModel");
const Section = require("../model/SectionModel");
const { uploadImageToCloudinary } = require("../utils/imageUpload");

//****************************************Create Sub-Section*******************************************************
exports.createSubSection = async (req, res) => {
    try {
        //     console.log("Re.body ->", req.body);
        const { sectionID, title, description } = req.body;
        let video;
        try {
            video = req.files.video;
            //     console.log("Video", video);
        } catch (err) {
            return res.json({
                message: err.message,
            });
        }
        if (!sectionID || !title || !description || !video) {
            res.status(404).json({
                success: false,
                message: "Required Fields missing.",
            });
        }

        //uploading the file
        let fileupload;
        try {
            fileupload = await uploadImageToCloudinary(video, process.env.CLOUD_FOLDER);
        } catch (uploadError) {
            return res.status(500).json({
                success: false,
                message: "Failed to upload video.",
                description: uploadError.message,
            });
        }
        //creating a subsection
        const SubSectionDetails = await SubSection.create({
            title: title,
            timeDuration: `${fileupload.duration}`,
            description: description,
            videoUrl: fileupload.secure_url,
        });
        //Updating the section with teh sub-section attached to teh schema
        const updatedSection = await Section.findByIdAndUpdate(
            { _id: sectionID },
            {
                $push: { subSection: SubSectionDetails._id },
            },
            { new: true }
        ).populate("subSection");
        return res.status(200).json({
            success: true,
            message: "Sub-Section added succesfully. ",
            updatedSection,
        });
    } catch (err) {
        //     console.log("eRROR: ", err.message);
        return res.status(400).json({
            success: false,
            message: "Something occured while creating sub-section. Try again.",
            description: err.message,
        });
    }
};

//******************************************Update a sub-section******************************************************
exports.updateSubSection = async (req, res) => {
    try {
        const { sectionId, subSectionID, title, description } = req.body;
        const subSection = await SubSection.findById(subSectionID);
        if (!subSectionID) {
            return res.status(400).json({
                success: false,
                message: "Fields are missing.",
            });
        }
        if (title !== undefined) subSection.title = title;
        if (description !== undefined) subSection.description = description;

        if (req.files && req.files.video !== undefined) {
            const video = req.files.video;
            const uploadDetails = await uploadImageToCloudinary(video, process.env.FOLDER_NAME);
            subSection.videoUrl = uploadDetails.secure_url;
            subSection.timeDuration = `${uploadDetails.duration}`;
            await subSection.save();
        }
        //Update the name od the section
        const updatedSection = await SubSection.findById(sectionId);
        //     console.log("Updated Section : ", updatedSection);

        return res.status(200).json({
            success: true,
            message: "SubSection updated succesfully. ",
            date: updatedSection,
        });
    } catch (err) {
        return res.status(400).json({
            success: false,
            message: "Failed to update section. Try again.",
            description: err.message,
        });
    }
};

//**************************************Delete a SubSection***********************************************************
exports.deleteSubSection = async (req, res) => {
    try {
        const { subSectionID, sectionID } = req.body;
        await Section.findByIdAndUpdate(
            { _id: sectionID },
            {
                $pull: { subsection: subSectionID },
            }
        );
        const subSection = await SubSection.findByIdAndDelete({ _id: subSectionID });
        if (!subSection) {
            return res.status(404).json({
                success: false,
                message: "Sub-Section not found. ",
            });
        }

        const updateSection = await Section.findById(sectionID).populate("subSection");

        return res.status(200).json({
            success: true,
            message: "SubSection deleted succesfully. ",
            data: updateSection,
        });
    } catch (err) {
        return res.status(400).json({
            success: false,
            message: "Failed to delete sub-section. Try again.",
            description: err.message,
        });
    }
};
