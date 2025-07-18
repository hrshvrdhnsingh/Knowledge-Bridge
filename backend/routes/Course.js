const express = require("express");
const router = express.Router();

// Import Course Controllers
const { createCourse, showAllCourses, getCourseDetails, getFullCourseDetails,
    editCourse, getInstructorCourses, deleteCourse,} = require("../controller/Course");

// Import Category Controllers
const { getAllCategories, createCategory, 
    categoryPageDetails, getAllCategoriesDetails,} = require("../controller/Category");

// Import Section Controllers
const { createSection, updateSection, deleteSection } = require("../controller/Section");

// Sub-Sections Controllers Import
const { createSubSection, updateSubSection, deleteSubSection } = require("../controller/SubSection");

// Rating Controllers Import
const { createRating, getAverageRating, getAllRating } = require("../controller/RatingAndReview");
const { updateCourseProgress, getProgressPercentage } = require("../controller/courseProgress");

// Importing Middlewares
const { auth, isInstructor, isStudent, isAdmin } = require("../middleware/authorisation");

// ********************************************************************************************************
//                                      Course routes
// ********************************************************************************************************

// Courses can Only be Created by Instructors
router.post("/createCourse", auth, isInstructor, createCourse);
// Edit Course routes
router.post("/editCourse", auth, isInstructor, editCourse);
//Add a Section to a Course
router.post("/addSection", auth, isInstructor, createSection);
// Update a Section
router.post("/updateSection", auth, isInstructor, updateSection);
// Delete a Section
router.post("/deleteSection", auth, isInstructor, deleteSection);
// Edit Sub Section
router.post("/updateSubSection", auth, isInstructor, updateSubSection);
// Delete Sub Section
router.post("/deleteSubSection", auth, isInstructor, deleteSubSection);
// Add a Sub Section to a Section
router.post("/addSubSection", auth, isInstructor, createSubSection);
// Get all Courses Under a Specific Instructor
router.get("/getInstructorCourses", auth, isInstructor, getInstructorCourses);
// Get all Registered Courses
router.get("/showAllCourses", showAllCourses);
// Get Details for a Specific Courses
router.post("/getCourseDetails", getCourseDetails);
// Get Details for a Specific Courses
router.post("/getFullCourseDetails", auth, getFullCourseDetails);
// To Update Course Progress
router.post("/updateCourseProgress", auth, isStudent, updateCourseProgress);
// To get Course Progress
// router.post("/getProgressPercentage", auth, isStudent, getProgressPercentage)
// Delete a Course
router.delete("/deleteCourse", deleteCourse);

// ********************************************************************************************************
//                                      Category routes (Only by Admin)
// ********************************************************************************************************
// Category can Only be Created by Admin

router.post("/createCategory", auth, isAdmin, createCategory);
router.get("/showAllCategories", getAllCategories);
router.post("/getCategoryPageDetails", categoryPageDetails);

// ********************************************************************************************************
//                                      Rating and Review
// ********************************************************************************************************
router.post("/createRating", auth, isStudent, createRating);
router.get("/getAverageRating", getAverageRating);
router.get("/getReviews", getAllRating);

module.exports = router;
