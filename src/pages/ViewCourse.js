import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation, useParams } from "react-router-dom";
import CourseViewModal from "../components/core/ViewCourse/CourseViewModal";
import VideoDetailsSidebar from "../components/core/ViewCourse/VideoDetailsSidebar";
import { getFullDetailsOfCourse } from "../services/operations/courseDetailsAPI";
import {
    setCompletedLectures,
    setCourseSectionData,
    setEntireCourseData,
    setTotalNoOfLectures,
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
            // console.log("Course Data here... -> ", courseData);
            dispatch(setCourseSectionData(courseData.courseDetails[0].courseContent));
            dispatch(setEntireCourseData(courseData.courseDetails));
            dispatch(setCompletedLectures(courseData.completedVideos));
            let lectures = 0;
            courseData?.courseDetails[0]?.courseContent?.forEach((sec) => {
                lectures += sec.subSection.length;
            });
            dispatch(setTotalNoOfLectures(lectures));
            setLoading(false);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
        fetchCourse();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname]);
    const [navbarActive, setNavbarActive] = useState(true)

    if (loading) {
        return <div className="spinner"></div>;
    }
    
    return (
        <div className="flex relative w-screen">
            <VideoDetailsSidebar setReviewModal={setReviewModal} navbarActive={navbarActive} setnavbarActive={setNavbarActive} />
            <div className="overflow-auto mt-[13vh] w-7/12 ml-40 sm:ml-0 sm:w-full sm:px-4 flex flex-col gap-6 sm:gap-2 h-max mb-8">
                <div className="w-11/12 sm:w-full">
                    <span onClick={() => setNavbarActive(!navbarActive)} className="text-yellow-300 lg:hidden sm:visible w-full flex justify-end px-4 mb-8 items-center"><p className="bg-richblack-500 w-max p-2 rounded-2xl">{navbarActive ? "Collapse Navbar" : "Show Navbar"}</p></span>
                    {/* the outlet element is just used to determine where child routes of parent routes should be displayed within the parent routes instead of a new page */}
                    <Outlet />
                </div>
            </div>
            {reviewModal && <CourseViewModal setReviewModal={setReviewModal} />}
        </div>
    );
};

export default ViewCourse;
