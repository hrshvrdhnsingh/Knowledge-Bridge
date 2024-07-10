import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { useSelector } from "react-redux";
import { getUserEnrolledCourses } from "../../../services/operations/profileAPI";
import ProgressBar from "@ramonak/react-progress-bar";
import { useNavigate } from "react-router-dom";

const EnrolledCourses = () => {
    const { token } = useSelector((state) => state.auth);
    const [enrolledCourses, setEnrolledCourses] = useState(null);
    const navigate = useNavigate();

    const getEnrolledCourses = async () => {
        try {
            const response = await getUserEnrolledCourses(token);
            setEnrolledCourses(response);
        } catch (err) {
            //     console.log("Fetching enrolled courses : ", err);
        }
    };

    useEffect(() => {
        getEnrolledCourses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="w-screen h-screen flex justify-center  ">
            <Sidebar />
            {!enrolledCourses ? (
                <div className="loader"></div>
            ) : (
                <div className="mt-[13vh] w-7/12 ml-36 sm:ml-24 sm:w-[72vw] flex flex-col gap-6 sm:gap-2 h-max mb-8">
                    <h2 className="font-bold text-4xl p-3  text-white">Enrolled Courses</h2>
                    {!enrolledCourses.length ? (
                        <p className="text-white">
                            You have not enrolled in any courses as of yet.
                        </p>
                    ) : (
                        <div className="w-full rounded-xl">
                            <div className="sm:hidden flex text-zinc-500 text-xl sm:text-sm sm:p-1 font-medium p-2 bg-richblack-500 bg-opacity-70 rounded-xl">
                                <p className="w-6/12">Course Name</p>
                                <p className="w-2/12 text-center">Duration</p>
                                <p className="w-4/12 text-center">Progress</p>
                            </div>
                            <div className="h-max flex flex-col gap-8 sm:gap-4 mt-8">
                                {enrolledCourses?.map((course, i) => {
                                    return (
                                        <div
                                            className="w-full flex sm:flex-col items-center bg-opacity-25 bg-richblack-700 rounded-xl p-2"
                                            key={i}
                                            onClick={() => {
                                                navigate(
                                                    `/view-course/${course?._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`
                                                );
                                            }}
                                        >
                                            <div className="flex sm:flex-col sm:w-full w-6/12 gap-4 items-center p-1">
                                                <div className="sm:w-full w-8/12 h-[150px]">
                                                    <img
                                                        className="h-full w-full object-cover rounded-2xl"
                                                        src={course.thumbnail}
                                                        alt={`course-${course.courseName}`}
                                                    />
                                                </div>
                                                <div className="text-xl sm:text-lg text-zinc-400 sm:w-full w-4/12 justify-center items-center">
                                                    <p>{course.courseName}</p>
                                                    {/* <p>{course.courseDescription}</p> */}
                                                </div>
                                            </div>
                                            <div className="w-2/12 sm:hidden text-center text-zinc-400 sm:place-self-start sm:w-full sm:justify-start sm:items-start justify-center items-center">
                                                {course.totalDuration}
                                            </div>
                                            <div className="flex w-4/12 sm:text-sm sm:w-full sm:flex-row text-zinc-400 justify-center items-center flex-col gap-4">
                                                <p>Progress : {course.progressPercentage || 0}%</p>
                                                <ProgressBar
                                                    className="bg-white-8/12 rounded-xl w-8/12 sm:w-10/12"
                                                    completed={course.progressPercentage || 0}
                                                    height="4px"
                                                    isLabelVisible={false}
                                                    baseBgColor="#e0e0de"
                                                    bgColor="#6a1b9a"
                                                />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default EnrolledCourses;
