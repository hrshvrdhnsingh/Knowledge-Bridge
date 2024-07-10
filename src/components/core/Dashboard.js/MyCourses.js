import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchInstructorCourses } from "../../../services/operations/courseDetailsAPI";
import CoursesTable from "./InstructorCourses.js/CoursesTable";
import Sidebar from "./Sidebar";
import Buttons from "../Homepage/Buttons";

const MyCourses = () => {
    const { token } = useSelector((state) => state.auth);
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchCourses = async () => {
            const result = await fetchInstructorCourses(token);
            if (result) setCourses(result);
        };
        fetchCourses();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="w-screen h-screen flex justify-center">
            <Sidebar />
            <div className="mt-[13vh] w-7/12 ml-36 sm:ml-28 sm:w-[72vw] flex flex-col gap-6 sm:gap-2 h-max mb-8">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-semibold text-white">My courses</h1>
                    <Buttons active="true" linkto="/dashboard/createCourse">
                        + Add Course
                    </Buttons>
                </div>
                {courses && <CoursesTable courses={courses} setCourses={setCourses} />}
            </div>
        </div>
    );
};

export default MyCourses;
