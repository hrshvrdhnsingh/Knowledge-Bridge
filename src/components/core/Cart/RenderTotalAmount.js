import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { BuyCourse } from "../../../services/operations/studentFeaturesAPI";
import { useNavigate } from "react-router-dom";

const RenderTotalAmount = () => {
    const { total, cart } = useSelector((state) => state.cart);
    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleBuyCourse = () => {
        const courses = cart.map((course) => course._id);
        //     console.log("To buy this course : ", courses);
        BuyCourse(token, courses, user, navigate, dispatch);
    };
    return (
        <div className="bg-richblack-700 bg-opacity-50 rounded-xl h-max flex flex-col p-4 w-max sm:w-full">
            <p className="text-2xl p-2 text-zinc-300 font-semibold">Total : Rs {total}</p>
            <button
                onClick={handleBuyCourse}
                className="bg-yellow-400 p-2 flex justify-center items-center rounded-xl cursor-pointer hover:scale-95 transition-[1s]"
            >
                Buy Now
            </button>
        </div>
    );
};

export default RenderTotalAmount;
