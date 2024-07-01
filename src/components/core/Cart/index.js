import React from "react";
import Sidebar from "../Dashboard.js/Sidebar";
import { useSelector } from "react-redux";
import RenderCartCourses from "./RenderCartCourses";
import RenderTotalAmount from "./RenderTotalAmount";

const Cart = () => {
    const { total, totalItems } = useSelector((state) => state.cart);

    console.log("total and total items ->", total, totalItems)
    return (
        <div className="w-screen h-screen flex justify-center">
            <Sidebar />
            <div className="mt-[13vh] w-10/12 ml-48 flex flex-col gap-6 h-max">
                <h2 className="font-bold text-4xl p-3 text-white">My Wishlist</h2>
                {/* Show the total catalog of the wishlist*/}
                <p className="text-2xl font-bold text-zinc-500 p-1">{totalItems} courses in Cart</p>
                {/* Show the total billing amount on the side */}
                {total === 0 ? (
                    <div>Your cart is empty.</div>
                ) : (
                    <div className="flex w-full flex-col gap-16">
                        <RenderCartCourses />
                        <RenderTotalAmount />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;
