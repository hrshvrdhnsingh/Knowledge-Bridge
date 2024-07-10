/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchInstructorCourses } from "../../../services/operations/courseDetailsAPI";
import { getInstructorData } from "../../../services/operations/profileAPI";
import InstructorChart from "./InstructorDashboard/InstructionChart";
import Sidebar from "./Sidebar";
import HighLightText from "../Homepage/HighLightText";

const Instructor = () => {
    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile);
    const [loading, setLoading] = useState(false);
    const [instructorData, setInstructorData] = useState(null);
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const instructorApiData = await getInstructorData(token);
                const result = await fetchInstructorCourses(token);
                //     console.log(instructorApiData);
                if (instructorApiData?.length) {
                    setInstructorData(instructorApiData);
                }
                setCourses(result);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const totalAmount = instructorData?.reduce((acc, curr) => acc + curr.totalAmountGenerated, 0);
    const totalStudents = instructorData?.reduce(
        (acc, curr) => acc + curr.totalStudentsEnrolled,
        0
    );
    return (
        <div className="w-screen h-screen flex justify-center">
            <Sidebar />
            <div className="mt-[13vh] w-7/12 ml-36 sm:ml-24 sm:w-[72vw] flex flex-col gap-6 sm:gap-2 h-max mb-8">
                <div className="py-3 overflow-hidden sm:px-2">
                    <h1 className="font-bold text-4xl py-3 text-white">
                        <HighLightText text={`Hi ${user?.firstName} 👋`}></HighLightText>
                    </h1>
                    <p className="font-medium text-white text-base">Let's start something new.</p>
                </div>
                {loading ? (
                    <div className="spinner"></div>
                ) : courses?.length > 0 ? (
                    <div>
                        <div className="flex my-4 text-white h-max gap-4 sm:flex-col justify-evenly">
                            {totalAmount > 0 || totalStudents > 0 ? (
                                <InstructorChart 
                                    courses={instructorData}
                                    className="border sm:w-full"
                                />
                            ) : (
                                <div className="">
                                    <p className="font-bold">Visualize</p>
                                    <p className="text-xl font-medium">
                                        Not Enough data to Visualize
                                    </p>
                                </div>
                            )}
                            {/**total statistics */}
                            <div className="flex flex-col rounded-2xl w-4/12 sm:w-11/12 sm:px-4">
                                <p className="text-2xl font-bold">Statistics</p>
                                <div className="mt-4">
                                    <div className="sm:flex sm:gap-4 sm:items-center">
                                        <p className="text-lg">Total Courses</p>
                                        <p className="text-2xl sm:text-xl font-semibold p-1">
                                            {courses?.length}
                                        </p>
                                    </div>
                                    <div className="sm:flex sm:gap-4 sm:items-center">
                                        <p className="text-lg">Total students</p>
                                        <p className="text-2xl sm:text-xl font-semibold p-1">
                                            {totalStudents}
                                        </p>
                                    </div>
                                    <div className="sm:flex sm:gap-4 sm:items-center">
                                        <p className="text-lg">Your income</p>
                                        <p className="text-2xl sm:text-xl font-semibold p-1">
                                            ₹ {totalAmount}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="rounded-2xl bg-zinc-700">
                            {/* Render 3 courses */}
                            <div className="flex items-center justify-between px-3">
                                <p className="flex items-center justify-between text-white text-2xl font-semibold p-1">
                                    Your courses
                                </p>
                                <Link to="/dashboard/my-courses">
                                    <p className="font-medium text-lg text-white">View all</p>
                                </Link>
                            </div>
                            <div className="flex gap-4 p-4 sm:flex-col sm:p-1 justify-center items-center">
                                {courses?.slice(0, 3).map((course) => (
                                    <div
                                        key={course._id}
                                        className="w-[32%] sm:w-[95%] flex flex-col h-[32vh] sm:h-max items-center justify-center bg-zinc-600 rounded-2xl"
                                    >
                                        <div className="h-[80%] sm:h-[60%] w-full">
                                            <img
                                                src={course.thumbnail}
                                                alt={course.courseName}
                                                className="w-full rounded-2xl h-full object-cover"
                                            />
                                        </div>
                                        <div className="w-full flex items-center flex-col justify-center mt-auto">
                                            <p className="font-medium text-slate-900">
                                                {course.courseName}
                                            </p>
                                            <div className="flex items-center text-slate-800 gap-3">
                                                <p>{course.studentsEnrolled?.length} students</p>
                                                <p className="font-medium">|</p>
                                                <p className="font-medium">Rs. {course.price}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="rounded-2xl bg-richblack-700 p-6">
                        <p className="text-center text-2xl font-bold text-white p-2">
                            You have not created any courses yet
                        </p>
                        <Link to="/dashboard/createCourse">
                            <p className="text-center text-lg font-semibold text-richblack-50 hover:text-richblack-5">
                                Create a course
                            </p>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Instructor;
