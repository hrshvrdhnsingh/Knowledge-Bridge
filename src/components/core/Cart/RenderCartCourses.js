/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import ReactStars from "react-rating-stars-component";
import { RiDeleteBin6Line } from "react-icons/ri";
import { removeFromCart } from "../../../slices/cartSlice";
import GetAvgRating from "../../../utils/avgRating";

const RenderCartCourses = () => {
    const { cart } = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const [avgReviewCount, setAvgReviewCount] = useState(0);
    if (cart.length === 0) {
        return <div>Not enrolled in any courses of yet.</div>;
    }
    function getRating(course) {
        const count = GetAvgRating(course.ratingAndReviews);
        setAvgReviewCount(count);
    }
    return (
        <div className="w-full flex-col flex gap-8">
            {cart?.map((course, i) => {
                const avgRating = GetAvgRating(course.ratingAndReviews) || 0;
                const ratingCount = course.ratingAndReviews?.length || 0;

                return (
                    <div
                        key={i}
                        className="bg-richblack-500 sm:flex-col p-2 sm:gap-0 bg-opacity-20 rounded-xl text-zinc-500 flex gap-8"
                    >
                        <div className="w-5/12 sm:w-full sm:h-[150px] h-[300px] rounded-2xl">
                            <img
                                src={course.thumbnail}
                                alt=""
                                className="w-full h-full object-cover rounded-2xl"
                            />
                        </div>
                        <div className="w-5/12 sm:w-full justify-center gap-3 flex-col flex">
                            <p className="text-xl text-zinc-400">{course?.courseName}</p>
                            <p className="text-xl sm:text-lg">Category - {course?.category?.name}</p>
                            <div className="flex items-center gap-2 sm:text-lg">
                                <span>{avgRating.toFixed(1)}</span>
                                <ReactStars
                                    count={5}
                                    size={20}
                                    value={avgRating}
                                    edit={false}
                                    activeColor="#ffd700"
                                    emptyIcon={<FaRegStar />}
                                    fullIcon={<FaStar />}
                                />
                                <span>{ratingCount} rating{ratingCount !== 1 && "s"}</span>
                            </div>
                        </div>
                        <div className="flex w-2/12 sm:w-full sm:justify-between justify-center items-center gap-8">
                            <p className="text-xl sm:text-lg">Rs {course?.price}</p>
                            <button
                                onClick={() => dispatch(removeFromCart(course._id))}
                                className="cursor-pointer text-2xl p-2 bg-red-500 bg-opacity-70 rounded-xl"
                            >
                                <RiDeleteBin6Line />
                            </button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default RenderCartCourses;
