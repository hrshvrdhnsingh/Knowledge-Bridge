const nodemailer = require("nodemailer");
require("dotenv").config();

const mailSender = async (email, title, body) => {
    try {
        let transporter = nodemailer.createTransport({
            host: process.env.MAILER_HOST,
            auth: {
                user: process.env.MAILER_USER,
                pass: process.env.MAILER_PASS,
            },
        });

        let info = await transporter.sendMail({
            from: "",
            to: `${email}`,
            subject: `${title}`,
            html: `${body}`,
        });
        //     console.log(info);
        return info;
    } catch (err) {
        console.log("Message : ", err.message);
        return err.message;
    }
};

module.exports = mailSender;
