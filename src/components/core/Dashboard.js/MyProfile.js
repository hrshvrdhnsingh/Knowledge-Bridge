import React from "react";
import Sidebar from "./Sidebar";
import { useSelector } from "react-redux";
import ProfileBtn from "./ProfileBtn";
import { useNavigate } from "react-router-dom";

const MyProfile = () => {
    const { user } = useSelector((state) => state.profile);
    const navigate = useNavigate();

    return (
        <div className="w-screen h-screen flex justify-center">
            <Sidebar />
            <div className="mt-[13vh] w-7/12 ml-36 sm:ml-24 sm:w-[72vw] flex flex-col gap-6 h-max">
                <h2 className="font-bold text-4xl p-3 text-white">My Profile</h2>
                <div data-aos="fade-right" data-aos-easing="ease-in-out" data-aos-duration="1000" className="flex bg-richblack-600 p-2 px-6 sm:px-2 rounded-2xl justify-between items-center">
                    <div className="flex w-[40%] gap-4 sm:gap-2 sm:w-[70%] justify-center items-center">
                        <div className="w-[60px] sm:w-[100px] h-[60px] rounded-full flex items-center border-zinc-300 sm:border-0 border-[2px]">
                            <img
                                src={user?.image}
                                alt={`profile-${user?.firstName}`}
                                className="object-fill sm:rounded-full"
                            />
                        </div>
                        <div className="">
                            <p className="text-xl sm:text-lg font-bold text-white">
                                {user?.firstName + " " + user?.lastName}
                            </p>
                            <p className="text-lg sm:text-sm text-zinc-400">{user?.email}</p>
                        </div>
                    </div>
                    <ProfileBtn text={"Edit"} onclick={() => navigate("/dashboard/settings")} />
                </div>
                <div data-aos="fade-right" data-aos-easing="ease-in-out" data-aos-duration="1300" className="flex bg-richblack-600 p-2 px-6 sm:px-2 sm:h-max rounded-2xl flex-col justify-between min-h-max">
                    <div className="flex justify-between gap-4 w-full h-max">
                        <h3 className="text-xl font-bold py-0 text-white">About</h3>
                        <ProfileBtn text={"Edit"} onclick={() => navigate("/dashboard/settings")} />
                    </div>
                    <p className="text-base sm:text-sm w-10/12 sm:w-full pr-5 sm:pr-1 text-zinc-400 min-h-max">
                        {user?.additionalDetails?.about
                            ? user.additionalDetails.about
                            : "Tell us something about yourself"}
                    </p>
                </div>
                <div data-aos="fade-right" data-aos-easing="ease-in-out" data-aos-duration="1700" className="flex bg-richblack-600 p-2 px-6 sm:px-2 rounded-2xl justify-between flex-col mb-8">
                    <div className="flex justify-between gap-4 w-full h-max">
                        <h3 className="text-xl font-bold py-0 text-white">Peronsal Details</h3>
                        <ProfileBtn text={"Edit"} onclick={() => navigate("/dashboard/settings")} />
                    </div>
                    <div className="flex w-10/12 sm:w-full sm:gap-0 sm:flex-col gap-16">
                        <div className="flex flex-col sm:h-max w-[50%] sm:w-[100%] ">
                            <div className="overflow-hidden">
                                <p className="text-lg sm:text-base font-medium text-zinc-400">
                                    First Name
                                </p>
                                <p className="font-medium sm:text-sm sm:font-normal text-zinc-100 px-2">
                                    {user?.firstName}
                                </p>
                            </div>
                            <div className="overflow-hidden">
                                <p className="text-lg font-medium text-zinc-400">Email</p>
                                <p className="font-medium sm:text-sm sm:font-normal text-zinc-100 px-2">
                                    {user?.email}
                                </p>
                            </div>
                            <div className="overflow-hidden">
                                <p className="text-lg font-medium text-zinc-400">Gender</p>
                                <p className="font-medium sm:text-sm sm:font-normal text-zinc-100 px-2">
                                    {user?.additionalDetails?.gender
                                        ? user?.additionalDetails?.gender
                                        : "Add your gender"}
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col w-[50%] sm:w-[100%]">
                            <div className="overflow-hidden">
                                <p className="text-lg font-medium text-zinc-400">Last Name</p>
                                <p className="font-medium sm:text-sm sm:font-normal text-zinc-100 px-2">
                                    {user?.lastName}
                                </p>
                            </div>
                            <div className="overflow-hidden">
                                <p className="text-lg font-medium text-zinc-400">Phone Number</p>
                                <p className="font-medium sm:text-sm sm:font-normal text-zinc-100 px-2">
                                    {user?.additionalDetails?.contactNumber
                                        ? user?.additionalDetails?.contactNumber
                                        : "Add Phone Number"}
                                </p>
                            </div>
                            <div className="overflow-hidden">
                                <p className="text-lg font-medium text-zinc-400">Date of Birth</p>
                                <p className="font-medium sm:text-sm sm:font-normal text-zinc-100 px-2">
                                    {user?.additionalDetails?.dateOfBirth
                                        ? user.additionalDetails.dateOfBirth
                                        : "Add Date of Birth"}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;
