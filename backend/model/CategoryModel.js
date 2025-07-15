const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    name: {type: String, required: true, trim: true},
    description: {type: String, trim: true},
    course: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course", 
        unique: true,
    },],
}, {timestamps: true});
// If there are thousands of courses then this document will bloat. In that case, it would be better
// to have a category field in the course and filter it on-demand.

module.exports = mongoose.model("Category", categorySchema);
