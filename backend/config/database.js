const mongoose = require("mongoose");
require("dotenv").config();

const dbConnect = () => {
    mongoose
        .connect(process.env.DATABASE_URL)
        .then(() => {
            console.log("Connection to the database was succesful.");
        })
        .catch((err) => {
            console.log("Unsuccesful attempt.");
            console.log(err.message);
            process.exit(1);
        });
};

module.exports = dbConnect;
