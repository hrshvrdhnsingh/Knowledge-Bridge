const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true }, // unique guarantees uniqueness + creates index
    password: { type: String, required: true },
    accountType: {
        type: String,
        enum: ["Admin", "Instructor", "Student"],
        required: true,
    },
    active: {type: Boolean, default: true },
    approved: { type: Boolean, default: true },
    additionalDetails: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Profile",
    },
    courses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
        },
    ],
    token: { type: String, index: true}, // the token here is only used for the reset-pasword.
    // The session token is never fetched from the database but from the localStorage. So the name might be 
    // misleading but this is the only functionality.
    resetpasswordExpires: {type: Date, expires: 0}, // TTL of 0 means it's deleted, once the time is reached
    image: { type: String, required: true },
    courseProgress: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "CourseProgress",
        },
    ],
}, {timestamps : true });

module.exports = mongoose.model("User", userSchema);