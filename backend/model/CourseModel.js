const express = require("express");
const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    courseName: { type: String, index: true, unique: true },
    courseDescription: { type: String, required: true, trim: true },
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true
    },
    whatYouWillLearn: { type: String },
    courseContent: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Section",
        default: []
    },],
    ratingAndReviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "RatingAndReview",
        default: []
    },],
    price: { type: Number, required: true },
    thumbnail: { type: String },
    tag: {
        type: [String],
        required: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    },
    studentsEnrolled: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: []
    }],
    instructions: {
        type: [String],
        default: []
    },
    status: {
        type: "String", 
        enum: ["Draft", "Published"]
    },
    createdAt: { type: Date, default: Date.now },
}, {timestamps: true});

module.exports = mongoose.model("Course", courseSchema);
