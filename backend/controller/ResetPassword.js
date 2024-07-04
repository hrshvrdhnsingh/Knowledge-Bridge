/* eslint-disable no-unused-vars */
const User = require("../model/UserModel");
const mailsender = require("../utils/mailSender");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

//to add a toke in the USer schema such that it has a expiration, and can be used later to change the password.
exports.resetPasswordToken = async (req, res) => {
    try {
        const email = req.body.email;
        //Check of user exists
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(401).json({
                succes: false,
                message: `This email ${email} is not registered with us. `,
            });
        }
        //Here we generate a random token to attach to teh url so that password change requests can be redirected there
        const token = crypto.randomBytes(20).toString("hex");
        //Update the User schema and attach the new token and upadate the expires property
        const updatedDetails = await User.findOneAndUpdate(
            { email: email },
            {
                token: token,
                resetpasswordExpires: Date.now() + 5 * 60 * 1000,
            },
            { new: true }
        );

        const url = `https://knowledge-bridge.vercel.app/update-password/${token}`;
        //     console.log(url);
        await mailsender(
            email,
            "Password Reset - Studynotion",
            `The gateway to update your password linked to your
                                            StudyNotion account lies here : ${url}`
        );
        return res.status(200).json({
            success: true,
            message: "Password Reset email sent succesfully.",
        });
    } catch (err) {
        return res.status(400).json({
            success: false,
            message: "Something bad happened while sending the reset message. Try again later.",
            description: err.message,
        });
    }
};

//*******************************************Actual Reset Password****************************************************
exports.resetPassword = async (req, res) => {
    try {
        const { password, confirmPassword, token } = req.body;
        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "The passwords enters do not match",
            });
        }
        //Get user details with the use of token
        const userDetails = await User.findOne({ token });
        if (!userDetails) {
            return res.status(400).json({
                success: false,
                message: "Token is invalid.",
            });
        }
        //Check if the rest password period hasn't expired
        if (userDetails.resetpasswordExpires < Date.now) {
            return res.status(400).json({
                success: false,
                message: "Reset password token has expired. Try again.",
            });
        }
        //hashing the password
        const hashedPassword = await bcrypt.hash(password, 10);
        //Updating the database
        await User.findOneAndUpdate({ token: token }, { password: hashedPassword }, { new: true });
        return res.status(200).json({
            success: true,
            message: "Password change was successful.",
        });
    } catch (err) {
        return res.status(400).json({
            success: false,
            message: "Something occured. Try again later.",
            description: err.message,
        });
    }
};
