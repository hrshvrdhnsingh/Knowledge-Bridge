/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import CountryCode from "../../../data/countrycode.json";
import { apiConnector } from "../../../services/apiConnector";
import { contactusEndpoint } from "../../../services/apis";

const ContactUsForm = ({ heading, description }) => {
    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitSuccessful },
    } = useForm();

    const submitContactForm = async (data) => {
        try {
            setLoading(true);
            const res = await apiConnector("POST", contactusEndpoint.CONTACT_US_API, data);
            console.log("email res : ", res);
            setLoading(false);
        } catch (err) {
            console.log("Contact Error Message : ", err.message);
            setLoading(false);
        } 
    };

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset({
                email: "",
                firstname: "",
                lastname: "",
                message: "",
                phoneNo: "",
            });
        }
    }, [reset, isSubmitSuccessful]);

    return (
        <div className="w-6/12 flex gap-4 sm:w-11/12 flex-col justify-center items-center mt-48" data-aos="zoom-in" data-aos-easing="ease-in-out">
            <h1 className="text-4xl p-2 font-bold text-white">{heading}</h1>
            <p className="text-zinc-500 text-lg">{description}</p>
            <form
                onSubmit={handleSubmit(submitContactForm)}
                className="w-10/12 sm:w-full flex flex-col justify-center"
            >
                <div className="flex  w-full">
                    <div className="flex flex-col w-[48%] p-2 gap-2">
                        <label htmlFor="firstname" className="text-zinc-600 text-xl font-semibold">
                            First Name
                        </label>
                        <input
                            type="text"
                            name="firstname"
                            id="firstname"
                            placeholder="Enter first name"
                            className="cursor-text h-[40%] w-11/12 rounded-md border-richblack-300 bg-richblack-500 text-zinc-200 text-lg p-2"
                            {...register("firstname", { required: true })}
                        />
                        {errors.firstname && <span className="">Please enter your name.</span>}
                    </div>
                    <div className="flex flex-col w-[49%] p-2 gap-2">
                        <label htmlFor="lastname" className="text-zinc-600 text-xl font-semibold">
                            Last Name
                        </label>
                        <input
                            type="text"
                            name="lastname"
                            id="lasstname"
                            placeholder="Enter last name"
                            className="cursor-text h-[40%] w-11/12 rounded-md border-richblack-300 bg-richblack-500 text-zinc-200 text-lg p-2"
                            {...register("lastname", { required: true })}
                        />
                        {errors.firstname && <span className="">Please enter your name.</span>}
                    </div>
                </div>
                <div className="flex flex-col gap-2 p-2">
                    <label htmlFor="email" className="text-zinc-600 text-xl font-semibold">
                        Email Address
                    </label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Enter email address"
                        className="cursor-text h-[40%] w-[93%] rounded-md border-richblack-300 bg-richblack-500 text-zinc-200 text-lg p-2"
                        {...register("email", { required: true })}
                    />
                    {errors.email && <span className="">Please enter your Email address.</span>}
                </div>
                <div className="flex flex-col gap-2 p-2 w-full">
                    <label htmlFor="phonenumber" className="text-zinc-600 text-xl font-semibold">
                        Phone Number
                    </label>
                    <div className="flex w-full gap-4 p-1">
                        <div className="w-[22%] h-full">
                            <select
                                type="text"
                                name="firstname"
                                id="firstname"
                                className="cursor-text h-[40%] w-full flex justify-center items-center rounded-md -richblack-300 bg-richblack-500 text-zinc-200 text-lg p-2"
                                {...register("countrycode", { required: true })}
                            >
                                {CountryCode.map((ele, i) => {
                                    return (
                                        <option key={i} value={ele.code}>
                                            {ele.code} -{ele.country}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        <div className="flex flex-col w-[70%] h-full">
                            <input
                                type="number"
                                name="phonenumber"
                                id="phonenumber"
                                placeholder="12345 67890"
                                className="cursor-text h-[40%] w-[96%] rounded-md -richblack-300 bg-richblack-500 text-zinc-200 text-lg p-2"
                                {...register("phoneNo", {
                                    required: {
                                        value: true,
                                        message: "Please enter your Phone Number",
                                    },
                                    maxLength: { value: 12, message: "Invalid Phone Number" },
                                    minLength: { value: 10, message: "Invalid Phone Number" },
                                })}
                            />
                        </div>
                    </div>
                    {errors.phoneNo && <span>{errors.phoneNo.message}</span>}
                </div>
                <div className="flex flex-col gap-2 p-2">
                    <label htmlFor="message" className="text-zinc-600 text-xl font-semibold">
                        Message
                    </label>
                    <textarea
                        name="message"
                        id="message"
                        cols="30"
                        rows="7"
                        placeholder="Enter your message here"
                        className="cursor-text h-[40%] w-[97%] rounded-md -richblack-300 bg-richblack-500 text-zinc-200 text-lg p-2"
                        {...register("message", { required: true })}
                    />
                    {errors.message && <span className="">Please enter your message</span>}
                </div>
                <button
                    disabled={loading}
                    type="submit"
                    className={`bg-yellow-600 mt-4 text-xl font-semibold w-[93%] p-3 flex justify-center items-center  rounded-xl h-full ${
                        !loading && "transition-all duration-200 hover:scale-95 hover:shadow-none"
                    }disabled:bg-richblack-500`}
                >
                    Send Message
                </button>
            </form>
        </div>
    );
};

export default ContactUsForm;
