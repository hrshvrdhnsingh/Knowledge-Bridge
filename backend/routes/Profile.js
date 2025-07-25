const express = require("express");
const router = express.Router();
const { auth, isInstructor } = require("../middleware/authorisation");
const { deleteProfile, updateProfile, getAllUserDetails, updateDisplayPicture,
    getEnrolledCourses, instructorDashboard} = require("../controller/Profile");

// ********************************************************************************************************
//                                      Profile routes
// ********************************************************************************************************
router.delete("/deleteProfile", auth, deleteProfile);
router.put("/updateProfile", auth, updateProfile);
router.get("/getUserDetails", auth, getAllUserDetails);
// Get Enrolled Courses
router.get("/getEnrolledCourses", auth, getEnrolledCourses);
router.put("/updateDisplayPicture", auth, updateDisplayPicture);
router.get("/instructorDashboard", auth, isInstructor, instructorDashboard);

module.exports = router;