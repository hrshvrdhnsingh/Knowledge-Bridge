import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import GetAvgRating from "../../../utils/avgRating";
import RatingStars from "../../common/RatingStars";

const CourseCard = ({ course, Height }) => {
    const [avgReviewCount, setAvgReviewCount] = useState(0);
    useEffect(() => {
        const getRating = async () => {
            const count = GetAvgRating(course.ratingAndReviews);
            setAvgReviewCount(count);
        };
        //     console.log("..........");
        getRating();
    }, [course.ratingAndReviews]);

    return (
        <Link data-aos="zoom-in-down" data-aos-easing="ease-in-out"
            to={`/courses/${course._id}`}
            className={`w-[49%] sm:w-[100%] sm:h-max bg-richblack-700 bg-opacity-35 rounded-2xl ${
                Height ? Height : "h-[70vh]"
            }`}
        >
            <div className="w-full h-full flex flex-col gap-2 p-2 ">
                <div className="w-full sm:h-[50%] h-[80%]">
                    <img
                        src={course?.thumbnail}
                        alt="course thumbnail"
                        className={`w-full h-full object-cover rounded-2xl`}
                    />
                </div>
                <div className="flex flex-col w-full gap-1 sm:gap-0 mt-auto">
                    <p className="text-xl sm:text-base font-medium text-white p-1 overflow-hidden">
                        {course?.courseName}
                    </p>
                    <p className="text-base sm:text-sm text-white p-1 overflow-hidden">
                        {course?.instructor?.firstName} {course?.instructor?.lastName}
                    </p>
                    <div className="flex gap-2 sm:text-sm items-center p-2 overflow-hidden">
                        <span className="text-yellow-400 overflow-hidden">
                            {avgReviewCount || 0}
                        </span>
                        <RatingStars Review_Count={avgReviewCount} />
                        <span className="text-zinc-400 overflow-hidden sm:text-sm">
                            {course?.ratingAndReviews?.length} Ratings
                        </span>
                    </div>
                    <p className="text-xl sm:text-base text-zinc-400 overflow-hidden">Rs. {course?.price}</p>
                </div>
            </div>
        </Link>
    );
};

export default CourseCard;
