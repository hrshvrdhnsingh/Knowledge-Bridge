/* eslint-disable no-unused-vars */
//const { getRandomValues } = require('crypto');
const Category = require("../model/CategoryModel");

//*********************************************To create a Category*******************************************************
exports.createCategory = async (req, res) => {
    try {
        const { name, description } = req.body;
        if (!name || !description) {
            return res.status(400).json({
                success: false,
                message: "Missing credentials to create a Tag.",
            });
        }
        const alreadyExists = await Category.findOne({ name: name });
        if (alreadyExists) {
            return res.status(300).json({
                success: false,
                message: "Course already Exists in our database.",
            });
        }
        //creating entry in the database
        const categoryDetails = await Category.create({
            name: name,
            description: description,
        });

        return res.status(200).json({
            success: true,
            message: "Category created succesfully.",
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong while trying to create a tag.",
            description: err.message,
        });
    }
};

//*****************************************To fetch all the tags****************************************************
exports.getAllCategories = async (req, res) => {
    try {
        const allCategories = await Category.find();
        console.log("All categories -> ", allCategories);
        return res.status(200).json({
            success: true,
            message: "All Categories found succesfully.",
            allCategories,
        });
        
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while trying to fetch all categories.",
            description: err.message,
        });
    }
};

//***************************************For Category page details*******************************************/
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
exports.categoryPageDetails = async (req, res) => {
    try {
        const { categoryId } = req.body;
        //Get couses for specified category
        const selectedCategory = await Category.findById(categoryId)
            .populate({
                path: "course",
                populate: { path: "ratingAndReviews" },
            })
            .exec();

        if (!selectedCategory) {
            return res.status(400).json({
                success: false,
                message:
                    "Could not get the courses related to that category due to inconsistency in finding the category.",
            });
        }

        //When there are no courses
        if (selectedCategory?.course?.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No courses found for the selected category. ",
            });
        }
        //Get courses for other categories
        const categoriesExceptSelected = await Category.find({
            _id: { $ne: categoryId },
        });
        //Get courses for different categories
        const differentCategories = await Category.findOne(
            categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]._id
        )
            .populate({
                path: "course",
                match: { status: "Published" },
                populate: { path: "ratingAndReviews" },
            })
            .exec();

        //Get top-selling courses
        const allCategories = await Category.find()
            .populate({
                path: "course",
                match: { status: "Published" },
                populate: [{ path: "instructor" }, { path: "ratingAndReviews" }],
            })
            .exec();
        const allCourses = allCategories.flatMap((category) => category.course);
        const sortedCourses = allCourses.sort((a, b) => b.sold - a.sold);
        const mostSellingCourses = sortedCourses.slice(0, 10);


        return res.status(200).json({
            success: true,
            selectedCategory,
            differentCategories,
            mostSellingCourses,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong while trying to fetch the category page.",
            description: err.message,
        });
    }
};
