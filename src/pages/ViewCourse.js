import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation, useParams } from "react-router-dom";
import CourseViewModal from "../components/core/ViewCourse/CourseViewModal";
import VideoDetailsSidebar from "../components/core/ViewCourse/VideoDetailsSidebar";
import { getFullDetailsOfCourse } from "../services/operations/courseDetailsAPI";
import {
    setCompletedLectures, setCourseSectionData,
    setEntireCourseData, setTotalNoOfLectures,
} from "../slices/viewCourse";

const ViewCourse = () => {
    const { courseId } = useParams();
    const { token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const [reviewModal, setReviewModal] = useState(false);
    const location = useLocation();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCourse = async () => {
            const courseData = await getFullDetailsOfCourse(courseId, token);
            
            // Store the courseContent into the redux
            dispatch(setCourseSectionData(courseData.courseDetails[0].courseContent));
            // Set entire course in the global variable
            dispatch(setEntireCourseData(courseData.courseDetails));
            // Set the videos that have been marked as completed.
            dispatch(setCompletedLectures(courseData.completedVideos));

            let lectures = 0;
            courseData?.courseDetails[0]?.courseContent?.forEach((sec) => {
                lectures += sec.subSection.length;
            });
            dispatch(setTotalNoOfLectures(lectures));
            setLoading(false);
        };
        fetchCourse();
    }, [location.pathname]);

    const [navbarActive, setNavbarActive] = useState(true)

    if (loading) {
        return <div className="spinner"></div>;
    }
    
    return (
        <div className="flex relative w-screen">
            <VideoDetailsSidebar setReviewModal={setReviewModal} navbarActive={navbarActive} setnavbarActive={setNavbarActive} />
            <div className="overflow-auto mt-[7vh] w-9/12 justify-center ml-80 sm:ml-0 sm:w-full sm:px-4 flex flex-col gap-6 sm:gap-2 h-max mb-8">
                <div className="w-11/12 sm:w-full">
                    <span onClick={() => setNavbarActive(!navbarActive)} className="text-yellow-300 lg:hidden sm:visible sm:place-self-end w-full flex justify-end px-4 mb-8 mt-4 items-center"><p className="bg-richblack-500 w-max p-2 rounded-2xl">{navbarActive ? "Collapse Sidebar" : "Show Sidebar"}</p></span>
                    {/* the outlet element is just used to determine where child route should be displayed within the parent route instead of a new page */}
                    <Outlet />
                </div>
            </div>
            {reviewModal && <CourseViewModal setReviewModal={setReviewModal} />}
        </div>
    );
};

export default ViewCourse;
