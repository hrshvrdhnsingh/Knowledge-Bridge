const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");
const emailTemplate = require("../mails/templates/emailVerificationTemplate");

const otpSchema = new mongoose.Schema({
    email: { type: String, required: true },
    otp: { type: String, required: true },
    createdAt: { type: Date, expires: 5 * 60, default: Date.now() },
});

// We'll use pre middleware to send the OTP from here as entry to the database shouldn't be done until the otp has been verified.
// During signup of the user, this will be needed to verify the user's email
async function sendVerificationMail(email, otp) {
    try {
        const mailResponse = await mailSender(
            email,
            "Verification email from ",
            emailTemplate(otp)
        );
        //     console.log("Email sent succesfully.", mailResponse.response);
    } 
    catch (err) {
        //     console.log("Error found while sending mail: ", err.message);
        return {
            message: err.message,
        };
    }
}

// This gets called just before the otp is saved, only when the email is succesfully sent, is the otp saved 
// over the database.
otpSchema.pre("save", async function (next) {
    if (this.isNew) { // Making sure the entry is new ie; just inserted and not modified.
        //     console.log(this.email, this.otp);
        await sendVerificationMail(this.email, this.otp); //Before document save, send the email.
        // The this part gives the email and otp from the document being saved.
    }
    next(); // To jump to the next middleware ie; the actual saving of the otp in the database
});

module.exports = mongoose.model("OTP", otpSchema);
