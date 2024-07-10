import React from "react";
import CTAButton from "./Buttons";
import { FaArrowRight } from "react-icons/fa6";
import { TypeAnimation } from "react-type-animation";
import "./homepage.css";

const CodeBlocks = ({
    position,
    heading,
    subheading,
    ctabtn1,
    ctabtn2,
    codeblock,
    backgroundGradient,
    codecolor,
    codeactive,
}) => {
    return (
        <div className={`flex relative ${position} mt-14 sm:w-full justify-between items-center gap-4 sm:gap-8 p-6 sm:p-2`}>
            {/*Section-1*/}
            <div className="w-[50%] sm:w-[100%] flex flex-col text-white">
                <div className="text-white font-semibold text-xl m-2">{heading}</div>
                <div className="text-zinc-500 mb-3 text-lg sm:text-base">{subheading}</div>
                <div className="flex flex-row gap-4">
                    <CTAButton active={ctabtn1.active} linkto={ctabtn1.active}>
                        <div className="flex gap-2 items-center">
                            {ctabtn1.btnText}
                            <FaArrowRight />
                        </div>
                    </CTAButton>
                    <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto}>
                        {ctabtn2.btnText}
                    </CTAButton>
                </div>
            </div>
            {/* Code Section*/}
            <div className="code overflow-visible relative w-[50%] sm:w-[100%] sm:p-0 p-5 flex justify-center items-center rounded-sm" data-aos="fade-up-left" data-aos-eassing="ease-in-sine">
                <div className={`circle absolute ${backgroundGradient}`}></div>
                <div className={`circle absolute ${backgroundGradient}`}></div>
                <div className="flex flex-row w-full p-2 sm:p-1 code-section mx-3">
                    <div className="w-[10%] flex sm:text-base flex-col text-richblack-400 font-inter font-semibold pr-1 border-r-1">
                        <p>1</p>
                        <p>2</p>
                        <p>3</p>
                        <p>4</p>
                        <p>5</p>
                        <p>6</p>
                        <p>7</p>
                        <p>8</p>
                        <p>9</p>
                        <p>10</p>
                        <p>11</p>
                    </div>
                    <div
                        className={`w-[90%] sm:text-sm flex flex-col gap-2 font-mono font-light ${codecolor}`}
                    >
                        <TypeAnimation
                            sequence={[codeblock, 4000, ""]}
                            repeat={Infinity}
                            cursor={true}
                            omitDeletionAnimation={true}
                            speed={70}
                            style={{
                                whiteSpace: "preserve",
                                display: "block",
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CodeBlocks;
