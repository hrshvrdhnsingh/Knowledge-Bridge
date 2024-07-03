const { instance } = require("../config/razorpay");
const Course = require("../model/CourseModel");
const User = require("../model/UserModel");
const crypto = require("crypto");
const mailSender = require("../utils/mailSender");
const { courseEnrollmentEmail } = require("../mails/templates/courseEnrollmentEmail");
const mongoose = require("mongoose");
const { paymentSuccessEmail } = require("../mails/templates/paymentSuccessEmail");
const CourseProgress = require("../model/CourseProgressModel");

/*****************************Capture payment and initialise Razorpay order***************************************/
exports.capturePayment = async (req, res) => {
    const { courses } = req.body;
    const userID = req.user.body;
    //Checking if it's a valid course id
    if (courses.length === 0) {
        return res.status(404).json({
            success: false,
            message: "Please enter valid course ID",
        });
    }
    let total_amount = 0;
    for (const course_id of courses) {
        let course;
        try {
            //Checking if the courseDetail  is valid in the databse
            course = await Course.findById(course_id);
            if (!course) {
                return res.status(400).json({
                    success: false,
                    message: "Not a valid course. ",
                });
            }
            //Check if user hasn't already paid for the course that is selected
            const uid = new mongoose.Types.ObjectId(userID); //Sice it's stored as object in the database
            if (course.studentsEnrolled.includes(uid)) {
                return res.status(400).json({
                    success: false,
                    message: "Selected user has already for the service. ",
                });
            }
            total_amount += course.price;
        } catch (err) {
            return res.status(400).json({
                success: false,
                message: "Something went wrong while verifying the course details",
                description: err.message,
            });
        }
    }
    const options = {
        amount: total_amount * 100,
        currency: "INR",
        receipt: Math.random(Date.now()).toString(),
        notes: {
            courseID: courses,
            userID,
        },
    };
    try {
        //Initiate response from razorpay
        const paymentResponse = await instance.orders.create(options);
        //     console.log("Payment response -> ", paymentResponse);
        return res.status(200).json({
            success: true,
            data: paymentResponse,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error occured while creating razorpay order",
            desription: err.message,
        });
    }
};

/************************verify signature of Razorpay and server to ensure end-to-end security*****************/
/* const verifySignature = async (req, res) => {
    try{
        const webHookSecret = '123456789'; //From the server
        const signature = req.headers['x-razorpay-signature']; //Signature frm razorpay
        //Since the secret that we'll recieve will be hashed, so we need to hashthe webHook
        const shaSum = crypto.createHmac('sha256', webHookSecret);
        //Need to convert shasum to string
        shaSum.update(JSON.stringify(req.body));
        const digest = shaSum.digest('hex'); //To convert from hexadecimal response


        //Now matching the signature and the digest response
        if(signature === digest) {
            //Once it has been authorised, we need to update the databse so that the user's cpuses has the one he just
            //paid for and the course detauls has the user has enrolled participant
    //     console.log('Payment has been authorised. ');
            //Since the response is directly from Razorpay, we cam't get userID and courseID. This is why we added this 
            //property in the notes part of options while initiating the offer.
            const {courseID, userID} = req.body.payload.payment.entity.notes;
            try{
                const enrolledCourse = await Course.findOneAndUpdate(
                    {_id: courseID}, {$push: {enrolledCourse: userID}}, {new: true},
                )
                if(!enrolledCourse) {
                    return res.status(400).json({
                        success: false,
                        message: 'No such Course found out. ',
                    });
                } 
        //     console.log(enrolledCourse);

                //Finding the student
                const enrolledStudent = await User.findByIdAndUpdate(
                    {_id: userID}, {$push:{courses: courseID}}, {new: true}
                )
                if(!enrolledStudent) {
                    return res.status(400).json({
                        success: false,
                        message: 'No such student found out. ',
                    });
                }
        //     console.log(enrolledStudent); 

                //now, send the confirmation mail
                const emailResponse = await mailSender(
                    enrolledStudent.email,
                    'Congratulations from Knowledge Bridge',
                    'You are now succesfully enrolled in the course. '
                )
        //     console.log(emailResponse);
                return res.status(200).json({
                    success: false,
                    message: 'Signature verified and Course added in the respective databases. '
                });
            }
            catch(err) {
                res.status(400).json({
                    success: false,
                    message: 'Error ocurred while updating the info in the databse. ',
                    description: err.message
                });
            }
        }
     }
    catch(err){
        return res.status(400).json({
            success: false,
            message: 'Error ocurred while verifying signature of razorpay and server',
            description: err.message
        });
    }
} */

//***********************************Verify the payment*******************************************************************
exports.verifyPayment = async (req, res) => {
    const razorpay_order_id = req.body?.razorpay_order_id;
    const razorpay_payment_id = req.body?.razorpay_payment_id;
    const razorpay_signature = req.body?.razorpay_signature;
    const courses = req.body?.courses;
    const userId = req.user.id;
    // If the signature from razorpay and the signature that we created matches, then we confirm the payment.
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !courses || !userId) {
        return res.status(401).json({
            success: false,
            message: "Payment failed. ",
        });
    }

    let body = razorpay_order_id + "|" + razorpay_payment_id;
    // Following the Razorpay documentation.
    const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_SECRET)
        .update(body.toString())
        .digest("hex");

    if (expectedSignature === razorpay_signature) {
        // Enroll the student in the courses.
        await enrollStudents(courses, userId, res);
        return res.status(200).json({
            success: true,
            message: "Payment verified.",
        });
    }

    return res.status(200).json({
        success: false,
        message: "Payment failed.",
    });
};

//*******************************************Send payment success email*****************************************************
exports.sendPaymentSuccessEmail = async (req, res) => {
    const { orderId, paymentId, amount } = req.body;
    const userId = req.user.id;
    if (!orderId || !paymentId || !amount || !userId) {
        return res.status(400).json({
            success: false,
            message: "Please provide all the details. ",
        });
    }

    try {
        const enrolledStudent = await User.findById(userId);
        await mailSender(
            enrolledStudent.email,
            `Payment Recieved.`,
            paymentSuccessEmail(
                `${enrolledStudent.firstName} ${enrolledStudent.lastName}`,
                amount / 100,
                orderId,
                paymentId
            )
        );
    } catch (err) {
        //     console.log("Error in sending mail");
        return res.status(400).json({
            success: false,
            message: "Could not send mail.",
        });
    }
};

//********************************************Enroll students in the courses************************************************ */
const enrollStudents = async (courses, userId, res) => {
    if (!courses || !userId) {
        return res.status(400).json({
            success: false,
            message: "Course ID or User ID missing.",
        });
    }

    for (const courseId of courses) {
        try {
            // Find the course and enroll the student in it
            const enrolledCourse = await Course.findOneAndUpdate(
                { _id: courseId },
                { $push: { studentsEnrolled: userId } },
                { new: true }
            );

            if (!enrolledCourse) {
                return res.status(500).json({
                    success: false,
                    error: "Course not found",
                });
            }
            //     console.log("Updated course: ", enrolledCourse);

            const courseProgress = await CourseProgress.create({
                courseID: courseId,
                userId: userId,
                completedVideos: [],
            });
            // Find the student and add the course to their list of enrolled courses
            const enrolledStudent = await User.findByIdAndUpdate(
                userId,
                {
                    $push: {
                        courses: courseId,
                        courseProgress: courseProgress._id,
                    },
                },
                { new: true }
            );

            //     console.log("Enrolled student: ", enrolledStudent);
            // Send an email notification to the enrolled student
            const emailResponse = await mailSender(
                enrolledStudent.email,
                `Successfully Enrolled into ${enrolledCourse.courseName}`,
                courseEnrollmentEmail(
                    enrolledCourse.courseName,
                    `${enrolledStudent.firstName} ${enrolledStudent.lastName}`
                )
            );

            //     console.log("Email sent successfully: ", emailResponse.response);
        } catch (error) {
            return res.status(400).json({
                success: false,
                error: error.message,
            });
        }
    }
};
