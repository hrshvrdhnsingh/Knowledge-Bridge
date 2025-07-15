const express = require("express");
const app = express();
const PORT = 4000;

const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
const paymentRoutes = require("./routes/Payments");
const courseRoutes = require("./routes/Course");
const contactUsRoute = require("./routes/Contact");

app.use(express.json()); // parses incoming JSON bodies into req.body

const dotenv = require("dotenv");
dotenv.config();

const dbConnect = require("./config/database");
dbConnect();

const cookieParser = require("cookie-parser");
app.use(cookieParser()); // allows reading and writing cookies

const cors = require("cors");
const whitelist = ["https://knowledge-bridge.vercel.app", "http://localhost:3000"];
const corsOptions = {
    origin(origin, callback) {
        // allow requests with no origin (e.g. mobile apps or curl)
        if (!origin) return callback(null, true);

        if (whitelist.includes(origin)) {
            callback(null, true);
        } 
        else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"], // Only these headers are allowed to the clients
    // credentials: false   // leave false if only using Bearer tokens
};
app.use(cors(corsOptions)); // handles CORS response on the real requests
app.options("*", cors(corsOptions)); // Allows for the same CORS rules for non-HTTP requests like PATCH, DELETE

const { cloudinaryConnect } = require("./config/cloudinary");
cloudinaryConnect();

const fileUpload = require("express-fileupload");
app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: require("os").tmpdir(),  
    })
);

// Each of these will handle a slice of your API
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/contact", contactUsRoute);

// Starting up the server
app.listen(PORT, () => {
    console.log(`Server succesfully running at port ${PORT}`);
});

// Simple CURL request to confirm server is still alive
app.get("/", (req, res) => {
    return res.json({
        success: true,
        message: "Server up and runnning ... ",
    });
});

module.exports = app;