import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changePassword } from "../../../../services/operations/SettingsAPI";

const UpdatePassword = () => {
    const navigate = useNavigate();
    const { token } = useSelector((state) => state.auth);
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const submitPasswordForm = async (data) => {
        try {
            await changePassword(token, data);
        } catch (err) {
            console.log("Error message update passwrod : ", err);
        }
    };

    return (
        <div data-aos="fade-right" data-aos-easing="ease-in-out" data-aos-duration="1500" className="flex bg-richblack-600 p-2 px-6 sm:px-2 flex-col rounded-2xl justify-between">
            <h2 className="text-xl font-bold p-1 overflow-hidden text-white">
                Profile Information
            </h2>
            <form onSubmit={handleSubmit(submitPasswordForm)}>
                <div className="lg:flex-row flex-col flex w-full gap-4">
                    <div className="flex flex-col w-[50%] sm:w-full">
                        <div className="w-full flex justify-between">
                            <label
                                htmlFor="oldPassword"
                                className="text-zinc-900 text-xl sm:text-base font-semibold overflow-hidden"
                            >
                                Current Password
                            </label>
                            <span
                                className="text-cyan-500 italic cursor-pointer sm:text-sm"
                                onClick={() => setShowOldPassword((prev) => !prev)}
                            >
                                Show Password
                            </span>
                        </div>
                        <input
                            type={`${showOldPassword ? "text" : "password"}`}
                            id="oldPassword"
                            name="oldPassword"
                            placeholder="Enter old password"
                            className="cursor-text h-[40%] w-11/12 rounded-md border-richblack-300 bg-richblack-700 text-zinc-200 text-lg p-2"
                            {...register("oldPassword", { required: true })}
                        />
                        {errors.oldPassword && (
                            <span className="text-[12px]">Please enter your current password.</span>
                        )}
                    </div>
                    <div className="flex flex-col w-[50%] sm:w-full">
                        <div className="w-full flex justify-between">
                            <label
                                htmlFor="newPassword"
                                className="text-zinc-900 text-xl sm:text-base font-semibold overflow-hidden"
                            >
                                New Password
                            </label>
                            <span
                                className="text-cyan-500 italic cursor-pointer sm:text-sm"
                                onClick={() => setShowNewPassword((prev) => !prev)}
                            >
                                Show Password
                            </span>
                        </div>
                        <input
                            type={`${showNewPassword ? "text" : "password"}`}
                            id="newPassword"
                            name="newPassword"
                            placeholder="Enter new password"
                            className="cursor-text h-[40%] w-11/12 rounded-md border-richblack-300 bg-richblack-700 text-zinc-200 text-lg p-2"
                            {...register("newPassword", { required: true })}
                        />
                        {errors.oldPassword && (
                            <span className="text-[12px]">Please enter your new password.</span>
                        )}
                    </div>
                </div>
                <div className="w-full flex p-2 gap-4 justify-end">
                    <button
                        onClick={() => {
                            navigate("/dashboard/my-profile");
                        }}
                        className="px-3 py-1 bg-richblack-700 rounded-xl text-xl font-semibold text-richblack-200 hover:scale-95 duration-200"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="text-black flex bg-yellow-400 bg-opacity-75 rounded-xl px-2 items-center font-semibold text-xl hover:scale-95 duration-200"
                    >
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdatePassword;
