import React from "react";
import Instructor from "../../../assets/Images/Instructor2.avif";
import HighLightText from "./HighLightText";
import CTAButton from "./Buttons";
import { FaArrowRight } from "react-icons/fa6";
const InstructorSection = () => {
    return (
        <div className="w-full py-12 flex flex-row gap-8 sm:flex-col">
            <div data-aos="zoom-in" data-aos-easing="ease-in-out" className="w-[54%] h-full sm:w-full">
                <div className="w-[100%] h-9/12 flex justify-center items-center bg-slate-500 bg-opacity-70 rounded-3xl">
                    <img
                        src={Instructor}
                        alt="Sweet-Instructor"
                        className="w-10/12 h-11/12 rounded-2xl"
                    />
                </div>
            </div>
            <div className="flex flex-col justify-center items-center w-[45%] sm:w-full gap-1">
                <div data-aos="zoom-in-right" data-aos-easing="ease-in-out" className="font-bold text-white text-4xl p-3">
                    Become an <HighLightText text="Instructor" />
                </div>
                <div className="text-richblack-200 text-lg sm:text-base">
                    Instructors from around the world teach at Knowledge Bridge. We provide the
                    tools and the skills to teach what you love.
                </div>
                <CTAButton className="w-max flex flex-row" linkto={"/signup"} active={true}>
                    <div>Start teaching now</div>
                    <p>
                        <FaArrowRight />
                    </p>
                </CTAButton>
            </div>
        </div>
    );
};

export default InstructorSection;
