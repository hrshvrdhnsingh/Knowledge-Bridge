const jwt = require("jsonwebtoken");
const User = require("../model/UserModel");
require("dotenv").config();

//**********************************************For authorisation***************************************************/
exports.auth = async (req, res, next) => {
    try {
        //Check if user session has valid token
        const token =
            req.body.token ||
            req.cookies.token ||
            req.header("Authorization").replace("Bearer ", "");
        if (!token) {
            return res.status(503).json({
                success: false,
                message: "Failed to retrieve token. Login again.",
            });
        }
        //Verify the token
        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decode;
        } catch (err) {
            return res.status(401).json({
                success: false,
                message: "Invalid token found.",
                description: err.message,
            });
        }
        next(); //On to the next middleware
    } catch (err) {
        return res.status(401).json({
            success: false,
            message: "Something went wrong while verifying the token.",
            description: err.message,
        });
    }
};

//********************************************The isStudent auth path************************************************
exports.isStudent = async (req, res, next) => {
    try {
        if (req.user.accountType !== "Student") {
            //Extracting this data from the 'decode' object created during login
            return res.status(403).json({
                success: false,
                message: "Not verified to go on the students path.",
            });
        }
        next();
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Unable to perform the validation. Try again later",
            description: err.message,
        });
    }
};

//*********************************************The isInstructor auth path*********************************************
exports.isInstructor = async (req, res, next) => {
    try {
        const userDetails = await User.findOne({ email: req.user.email });
        //console.log('User-Details : ', userDetails);
        if (userDetails.accountType !== "Instructor") {
            //Extracting this data from the 'decode' object created during login
            return res.status(403).json({
                succes: false,
                message: "Not verified to go on the instructors path.",
            });
        }
        next();
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Unable to perform the user validation. Try again later",
            description: err.message,
        });
    }
};

//*****************************************The isAdmin auth path****************************************************
exports.isAdmin = async (req, res, next) => {
    try {
        const userDetails = await User.findOne({ email: req.user.email });
        //     console.log(userDetails.accountType);
        if (userDetails.accountType !== "Admin") {
            //Extracting this data from the 'decode' object created during login
            return res.status(403).json({
                succes: false,
                message: "Not verified to go on the admin path.",
            });
        }
        next();
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Unable to perform the user validation. Try again later",
            description: err.message,
        });
    }
};
