const User = require("../model/UserModel");
const OTP = require("../model/otpModel");
const optGenerator = require("otp-generator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mailSender = require("../utils/mailSender");
const Profile = require("../model/ProfileModel");
const { passwordUpdated } = require("../mails/templates/passwordUpdate");

//*********************************************TO send the OTP*******************************************************
exports.sendOtp = async (req, res) => {
    try {
        const { email } = req.body;
        //Check if user already present in the database.
        const checkUserAlreadyPresent = await User.findOne({ email });
        if (checkUserAlreadyPresent) {
            return res.status(403).json({
                success: false,
                message: "Action Forbidden. User already exists.",
            });
        }

        //To generate an OTP, with desired length and property we want.
        let isUniqueOTP = true;
        let generatedOTP;
        while (isUniqueOTP) {
            generatedOTP = optGenerator.generate(8, {
                upperCaseAlphabets: true,
                lowerCaseAlphabets: true,
                specialChars: false,
            });
            isUniqueOTP = await OTP.findOne({ otp: generatedOTP });
        }

        //Once that's done, create an entry of OTP generatd into the database
        let otp = generatedOTP;
        let OTPEntry;
        try {
            const OTPpayload = { email, otp };
            OTPEntry = await OTP.create(OTPpayload);
        } catch (err) {
            console.log("Auth try", err.message);
        }

        res.status(200).json({
            status: true,
            message: "OTP Generation was succesful.",
            OTPEntry: OTPEntry,
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: "Something fatal happened.",
            description: err.message,
        });
    }
};

//********************************************For signup process********************************************************/
exports.signUp = async (req, res) => {
    try {
        const { firstName, lastName, email, password, confirmPassword, accountType, otp } =
            req.body;
        if (!firstName || !lastName || !email || !password || !confirmPassword || !otp) {
            //If details are empty
            return req.status(404).json({
                success: false,
                message: "One(or many) of the fields are empty. All fields are compulsory.",
            });
        }
        if (password !== confirmPassword) {
            //If the two passwords are not matching
            return res.status(400).json({
                success: false,
                message: "The password entries do not match.",
            });
        }
        //Checking if user already exists in the database
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({
                success: false,
                message:
                    "Entered user already exists in our database. Please sign-in to continue. ",
            });
        }
        //Getting the most recent otp entered in the database for the current user
        const recentOTP = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
        if (recentOTP.length === 0) {
            return res.status(404).json({
                success: false,
                message: "OTP not found.",
            });
        } else if (otp !== recentOTP[0].otp) {
            //Checking if the user-entered OTP is valid
            return res.status(403).json({
                success: false,
                message: "Invalid OTP entered. Try again.",
            });
        }

        //Hashing the password
        const hashedPassword = await bcrypt.hash(password, 10);
        //Creating an entry of addition details that the user can fill in his dsahboard after logging in.
        const ProfileDetails = await Profile.create({
            gender: null,
            dataOfBirth: null,
            about: null,
            contactNumber: null,
        });
        //Creating the entry in DB for the user now
        const encodedName = encodeURIComponent(`${firstName} ${lastName}`);
        const userDetails = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            accountType,
            additionalDetails: ProfileDetails._id,
            image: `https://api.dicebear.com/8.x/pixel-art/svg?seed=${encodedName}`,
        });
        res.status(200).json({
            success: true,
            message: "User entry was succesfully created into the database. ",
            userDetails,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Something bad happened. Try again maybe?",
            description: err.message,
        });
    }
};

//*********************************************For Login purposes******************************************************
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are requried.",
            });
        }

        //Checking if the user exists in the DB
        const user = await User.findOne({ email }).populate("additionalDetails");
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Entry not found. User needs to signup first.",
            });
        }
        //Creating JWT token if password matches
        if (await bcrypt.compare(password, user.password)) {
            const payload = { email: user.email, id: user._id, accountType: user.accountType };
            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "48h",
            });
            user.token = token;
            user.password = undefined;
            //Creating a cookie
            const options = {
                expiresIn: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                httpOnly: true,
            };
            res.cookie("token", token, options).status(200).json({
                success: true,
                message: "Logged-in succesfully. Welcome user !!!",
                token,
                user,
            });
        } else {
            return res.status(403).json({
                success: false,
                message: "Invalid password. Try again.",
            });
        }
    } catch (err) {
        return res.status(400).json({
            success: false,
            message: "Something fatal happened. Auth js",
            description: err.message,
        });
    }
};

//********************************************To change the password**************************************************
exports.changePassword = async (req, res) => {
    try {
        // Get user data from req.user
        const userDetails = await User.findById(req.user.id);

        // Get old password, new password, and confirm new password from req.body
        const { oldPassword, newPassword } = req.body;

        // Validate old password
        const isPasswordMatch = await bcrypt.compare(oldPassword, userDetails.password);
        if (!isPasswordMatch) {
            // If old password does not match, return a 401 (Unauthorized) error
            return res.status(401).json({
                success: false,
                message: "The password is incorrect",
            });
        }

        // Update password
        const encryptedPassword = await bcrypt.hash(newPassword, 10);
        const updatedUserDetails = await User.findByIdAndUpdate(
            req.user.id,
            { password: encryptedPassword },
            { new: true }
        );

        // Send notification email
        try {
            const emailResponse = await mailSender(
                updatedUserDetails.email,
                "Password for your account has been updated",
                passwordUpdated(
                    updatedUserDetails.email,
                    `Password updated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
                )
            );
        } catch (error) {
            // If there's an error sending the email, log the error and return a 500 (Internal Server Error) error
            console.error("Error occurred while sending email:", error);
            return res.status(500).json({
                success: false,
                message: "Error occurred while sending email",
                error: error.message,
            });
        }

        // Return success response
        return res.status(200).json({
            success: true,
            message: "Password updated successfully",
        });
    } catch (error) {
        // If there's an error updating the password, log the error and return a 500 (Internal Server Error) error
        console.error("Error occurred while updating password:", error);
        return res.status(500).json({
            success: false,
            message: "Error occurred while updating password",
            error: error.message,
        });
    }
};
