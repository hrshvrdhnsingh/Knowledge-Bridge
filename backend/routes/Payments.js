const express = require("express");
const router = express.Router();
const {capturePayment, verifyPayment, sendPaymentSuccessEmail} = require("../controller/Payments")
const { auth, isInstructor, isStudent, isAdmin } = require("../middleware/authorisation")

router.post("/capturePayment", auth, isStudent, capturePayment)
router.post("/verifyPayment", auth, isStudent, verifyPayment)
router.post( "/sendPaymentSuccessEmail", auth, isStudent, sendPaymentSuccessEmail)
// router.post("/verifySignature", verifySignature)

module.exports = router;