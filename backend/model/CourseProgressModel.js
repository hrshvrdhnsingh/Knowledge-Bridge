const mongoose = require("mongoose");

const progressSchema = new mongoose.Schema({
    courseID: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true, index: true },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true, 
        index: true
    },
    completedVideos: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "SubSection",
        },
    ],
});

// Ensuring there is only one entry for user/course pair in the database.
progressSchema.index({ userId: 1, courseID: 1 }, { unique: true });

module.exports = mongoose.model("CourseProgress", progressSchema);
