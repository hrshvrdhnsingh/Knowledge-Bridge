import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";
import HighLightText from "../components/core/Homepage/HighLightText";
import CTAButton from "../components/core/Homepage/Buttons";
import Banner from "../assets/Images/banner.mp4";
import CodeBlocks from "../components/core/Homepage/CodeBlocks";
import "../App.css";
import TimelineSection from "../components/core/Homepage/TimelineSection";
import LearningLanguageSection from "../components/core/Homepage/LearningLanguage";
import InstructorSection from "../components/core/Homepage/InstructorSection";
import ExploreMore from "../components/core/Homepage/ExploreMore";
import Footer from "../components/common/Footer";

const Home = () => {
    return (
        <div className="flex flex-col w-10/12 sm:w-full justify-center items-center mx-auto p-1 overflow-x-visible">
            {/**********************************  Section 1 ************************************************/}
            <div className="flex flex-col w-11/12 justify-between items-center section-1 mt-28 sm:mt-20 p-1 sm:p-0">
                <Link to="/signup" data-aos="zoom-in">
                    <div className="instructor-btn flex items-center justify-center gap-2 text-slate-500 text-xl sm:text-base font-bold mx-auto p-3 transition-all duration-200 bg-richblack-700">
                        <p className="bg-gradient-to-r from-[#f093fb] to-[#f5576c] text-transparent bg-clip-text ">
                            Become an Instructor{" "}
                        </p>
                        <FaArrowRight />
                    </div>
                </Link>
                <div className="p-2 sm:p-0 flex flex-col w-11/12 sm:w-full justify-between items-center text-4xl text-white font-bold mx-auto min-h-max mt-5 sm:mt-3">
                    <p className="p-2 sm:py-2 sm:px-0">
                        Empower your future with <HighLightText text={"Coding Skills"} />{" "}
                    </p>
                </div>
                <div className="w-11/12 sm:text-base sm:w-full justify-center items-center text-richblack-200 text-[18px]">
                    With our online coding courses, you can learn at your own pace, from anywhere in
                    the world, and get access to a wealth of resources, including hands-on projects,
                    quizzes, and personalized feedback from instructors.
                </div>
                <div className="flex gap-5 flex-row mt-6">
                    <CTAButton active={true} linkto="/signup">
                        Learn More
                    </CTAButton>
                    <CTAButton active={false} linkto="/login">
                        Book a Demo
                    </CTAButton>
                </div>
                <div data-aos="zoom-out-up" className="w-10/12 sm:w-full sm:h-[55vw] h-[32vw] bg-richblack-700 mt-12 p-2 flex justify-center items-center rounded-2xl">
                    <video muted autoPlay loop controls className="h-full rounded-2xl">
                        <source type="video/mp4" src={Banner} />
                    </video>
                </div>
                <div className="w-11/12 sm:w-full sm:mt-4" data-aos="fade-up" data-aos-easing="ease-in">
                    <CodeBlocks
                        position={"lg:flex-row sm:flex-col"}
                        heading={
                            <div>
                                Unlock your <HighLightText text={"coding potential"} /> with our
                                online courses.
                            </div>
                        }
                        subheading={
                            "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
                        }
                        ctabtn1={{
                            btnText: "Try it yourself",
                            linkto: "/signup",
                            active: true,
                        }}
                        ctabtn2={{
                            btnText: "Learn More",
                            linkto: "/login",
                            active: false,
                        }}
                        codeblock={`<!DOCTYPE html>\n<html lang="en">\n<head>\n    <title>This is my page</title>\n</head>\n<body>\n    <h1><a href="/">Header</a>  </h1>\n    <nav> <a href="/one">One</a>\n    <a href="/two">Two</a>\n    </nav>\n</body>`}
                        codecolor={"text-cyan-600"}
                        codeactive={false}
                        backgroundGradient={"bg-gradient-to-r from-[#f093fb] to-[#f5576c]"}
                    />
                </div>
                <div className="w-11/12 sm:w-full"  data-aos="fade-up" data-aos-easing="ease-in">
                    <CodeBlocks
                        position={"lg:flex-row-reverse sm:flex-col"}
                        heading={
                            <div>
                                Start <HighLightText text="coding in seconds" />
                            </div>
                        }
                        subheading={
                            "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
                        }
                        ctabtn1={{
                            btnText: "Continue Lesson",
                            linkto: "/signup",
                            active: true,
                        }}
                        ctabtn2={{
                            btnText: "Learn More",
                            linkto: "/login",
                            active: false,
                        }}
                        codeblock={`import React from "react";\nimport CTAButton from "./Button";\nimport TypeAnimation from "react-type";\nimport { FaArrowRight } from "react-icons/fa";\n\nconst Home = () => {\n    return (\n        <div>Home</div>\n    )\n}\nexport default Home;`}
                        codeactive={true}
                        codecolor={"text-fuchsia-500"}
                        backgroundGradient={"bg-gradient-to-l from-[#2af598] to-[#009efd]"}
                    />
                </div>
                <ExploreMore />
            </div>
            {/*******************************************Section-2******************************************/}
            <div className="bghome flex flex-col section-2 w-10/12 ease-in-out transition-all duration-500 sm:w-11/12">
                <div className="w-full mt-12 mb-48 sm:mt-4 sm:mb-24">
                    <div className="w-full flex items-center gap-1">
                        <div className="w-full flex flex-row gap-3 justify-center items-center mt-4">
                            <CTAButton active={true} linkto={"/signup"}>
                                <div className="flex flex-row gap-2 items-center justify-center">
                                    Explore full catalog <FaArrowRight />
                                </div>
                            </CTAButton>
                            <CTAButton active={false} linkto={"/login"}>
                                <div>Learn more</div>
                            </CTAButton>
                        </div>
                    </div>
                </div>
                <div className="w-full flex flex-col justify-center items-center mb-20">
                    <div className="flex flex-row sm:flex-col gap-8 justify-center p-2 items-center">
                        <div className="font-bold text-white text-4xl w-[45%] sm:w-full overflow-hidden" data-aos="fade-up" data-aos-easing="ease-in-out">
                            Get the skills you need for a{" "}
                            <HighLightText text="job that is in demand." />
                        </div>
                        <div className="flex flex-col gap-5 w-[45%] sm:w-full sm:text-base justify-center items-center">
                            <p className="text-xl sm:text-base font-semibold text-richblack-300">
                                The modern Knowledge Bridge is a dictator in it's own terms. Today,
                                to be a competitive specialist requires more than professional
                                skills.
                            </p>
                            <CTAButton linkto={"/signup"} active={false}>
                                <div>Learn more</div>
                            </CTAButton>
                        </div>
                    </div>
                </div>
                <TimelineSection />
                <LearningLanguageSection />
            </div>
            {/***********************************************Section-3**************************************/}
            <div className="section-3 w-10/12 flex flex-col items-center justify-between mt-28">
                <InstructorSection />
            </div>
            <Footer />
        </div>
    );
};

export default Home;
