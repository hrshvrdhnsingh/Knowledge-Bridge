import React from "react";
import ContactUsForm from "../components/core/ContactPage/ContactUsForm";
import "./pages.css";
import Footer from "../components/common/Footer";

const ContactUs = () => {
    return (
        <div className="w-screen flex flex-col mt-[9vh] items-center">
            <div className="light-bg flex items-center justify-center sm:w-full sm:px-12 sm:flex-col sm:h-max sm:py-12 px-40 h-[60vh] w-full gap-12">
                <div
                    data-aos="zoom-in"
                    data-aos-easing="ease-in-out"
                    className="sm:w-full contact-card w-[30%] bg-richblack-700 px-4 py-12 sm:py-8 rounded-3xl flex flex-col justify-center"
                >
                    <h1 className="text-2xl p-1 text-white">Chat with us</h1>
                    <p className="text-lg text-zinc-500 sm:text-base">
                        Our friendly team is here to help.
                    </p>
                    <p className="text-lg font-medium text-richblack-200 sm:text-base">
                        info@Knowledge Bridge.com
                    </p>
                </div>
                <div
                    data-aos="zoom-in"
                    data-aos-easing="ease-in-out"
                    className="sm:w-full contact-card w-[30%] bg-richblack-700 px-4 py-12 sm:py-8  rounded-2xl flex flex-col justify-center"
                >
                    <h1 className="text-2xl p-1 text-white">Visit us</h1>
                    <p className="text-lg text-zinc-500 sm:text-base">
                        Come and say hello at our office HQ.
                    </p>
                    <h4 className="text-lg font-medium text-richblack-200 sm:text-base">
                        Mohan Nagar, Seraikela-Kharsawan, Jamshedpur - 831013
                    </h4>
                </div>
                <div
                    data-aos="zoom-in"
                    data-aos-easing="ease-in-out"
                    className="sm:w-full contact-card w-[30%] bg-richblack-700 px-4 py-12 sm:py-8 rounded-3xl flex flex-col justify-center"
                >
                    <h1 className="text-2xl p-1 text-white">Call us</h1>
                    <p className="text-lg text-zinc-500 sm:text-base">Mon - Fri from 8am to 5pm</p>
                    <p className="text-lg font-medium text-richblack-200 sm:text-base">
                        +123 420 0069
                    </p>
                </div>
            </div>
            <ContactUsForm
                heading={"Got an Idea? We've got the skills. Let's team up"}
                description={"Tell us more about yourself and what you're got in mind."}
            />
            <Footer />
        </div>
    );
};

export default ContactUs;
