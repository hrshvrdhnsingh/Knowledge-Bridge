const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");
const emailTemplate = require("../mails/templates/emailVerificationTemplate");

const otpSchema = new mongoose.Schema({
    email: { type: String, required: true },
    otp: { type: String, required: true },
    createdAt: { type: Date, expiresIn: 5 * 60, default: Date.now() },
});

//We'll use pre middleware to send the OTP from here as entry to the database shouldn't be done until the otl has been verified.
//During signup of the user, this will be needed to verify the user's email
async function sendVerificationMail(email, otp) {
    try {
        const mailResponse = await mailSender(
            email,
            "Verification email from ",
            emailTemplate(otp)
        );
        //     console.log("Email sent succesfully.", mailResponse.response);
    } catch (err) {
        //     console.log("Error found while sending mail: ", err.message);
        return {
            message: err.message,
        };
    }
}

otpSchema.pre("save", async function (next) {
    if (this.isNew) {
        //     console.log(this.email, this.otp);
        await sendVerificationMail(this.email, this.otp); //Before document save, send the email.
        //The this part gives the email and otp from the document being saved.
    }
    next(); //To jump to the next middleware
});

module.exports = mongoose.model("OTP", otpSchema);
