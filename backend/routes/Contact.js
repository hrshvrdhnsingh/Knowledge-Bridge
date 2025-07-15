const express = require("express");
const router = express.Router(); // Fresh router to bundle related routes together.
const { contactUsController } = require("../controller/ContactUs");

router.post("/reach/contact", contactUsController); 
// So whenever there is a POST call to /api/v1/contact/reach/contact, this contactUsController will be called

module.exports = router;
