const express = require("express");
const app = express();
const PORT = 4000;

const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
const paymentRoutes = require("./routes/Payments");
const courseRoutes = require("./routes/Course");
const contactUsRoute = require("./routes/Contact");

const dbConnect = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { cloudinaryConnect } = require("./config/cloudinary");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");

dotenv.config();

dbConnect();

app.listen(PORT, () => {
    console.log(`Server succesfully running at port ${PORT}`);
});

app.use(express.json());
app.use(cookieParser());

app.use(
    //To entertain the requests from frontend
    cors({
        origin: "*",
        credentials: true,
    })
);

app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: "/hoohaa/",
    })
);

app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/contact", contactUsRoute);

app.get("/", (req, res) => {
    return res.json({
        success: true,
        message: "Server up and runnning ... ",
    });
});

cloudinaryConnect();

module.exports = app;
