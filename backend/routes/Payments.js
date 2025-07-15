const express = require("express");
const router = express.Router();

const { capturePayment, verifyPayment, sendPaymentSuccessEmail } = require("../controller/Payments");
const { auth, isStudent } = require("../middleware/authorisation");

// So when the user hits POST at /api/v1/payment/capturePayment, the auth and isStudent middleware is hit in
// order and then the capturePayment controller is called. In the middleware, in the end, we call next() so 
// that the call moves on to the next middleware of controller.
router.post("/capturePayment", auth, isStudent, capturePayment);
router.post("/verifyPayment", auth, isStudent, verifyPayment);
router.post("/sendPaymentSuccessEmail", auth, isStudent, sendPaymentSuccessEmail);

module.exports = router;