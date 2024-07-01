import React, { useEffect, useState } from "react";
// Icons
import { FaRegStar, FaStar } from "react-icons/fa";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";

import GetAvgRating from "../../../utils/avgRating";
import RatingStars from "../../common/RatingStars";

const CourseCard = ({ course, Height }) => {
    const [avgReviewCount, setAvgReviewCount] = useState(0);
    console.log("Course for call to average ->", course)
    useEffect(() => {
        const getRating = async () => {
            const count = GetAvgRating(course.ratingAndReviews);
            setAvgReviewCount(count);
        }
        console.log("..........");
        getRating();
    }, [course.ratingAndReviews]);

    return (
        <Link to={`/courses/${course._id}`} className={`w-[49%] bg-richblack-700 bg-opacity-35 rounded-2xl ${Height ? Height : "h-[70vh]"}`}>
            <div className="w-full h-full flex flex-col gap-2 p-2 ">
                <div className="w-full h-[80%]">
                    <img
                        src={course?.thumbnail}
                        alt="course thumbnail"
                        className={`w-full h-full object-cover rounded-2xl`}
                    />
                </div>
                <div className="flex flex-col w-full gap-1 mt-auto">
                    <p className="text-xl font-medium text-white p-1 overflow-hidden">{course?.courseName}</p>
                    <p className="text-base text-white p-1 overflow-hidden">
                        {course?.instructor?.firstName} {course?.instructor?.lastName}
                    </p>
                    <div className="flex gap-2 items-center p-2 overflow-hidden">
                        <span className="text-yellow-400 overflow-hidden">{avgReviewCount || 0}</span>
                        <RatingStars Review_Count={avgReviewCount} />
                        <span className="text-zinc-400 overflow-hidden">
                            {course?.ratingAndReviews?.length} Ratings
                        </span>
                    </div>
                    <p className="text-xl text-zinc-400 overflow-hidden">Rs. {course?.price}</p>
                </div>
            </div>
        </Link>
    );
};

export default CourseCard;
