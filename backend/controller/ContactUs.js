const { contactUsEmail } = require("../mails/templates/contactFormRes");
const mailsender = require("../utils/mailSender");

exports.contactUsController = async (req, res) => {
    const { email, firstName, lastName, message, phoneNo, countryCode } = req.body;
    try {
        const emailRes = await mailsender(
            email,
            "Your Data sent succesfully.",
            contactUsEmail(email, firstName, lastName, message, phoneNo, countryCode)
        );
        return res.json({
            success: true,
            message: "Email sent succesfully.",
        });
    } catch (err) {
        return res.status(400).json({
            success: false,
            message: "Something went wrong. Try again later.",
        });
    }
};
