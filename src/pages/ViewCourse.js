import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Outlet, useLocation, useParams } from "react-router-dom"
import CourseViewModal from "../components/core/ViewCourse/CourseViewModal"
import VideoDetailsSidebar from "../components/core/ViewCourse/VideoDetailsSidebar"
import { getFullDetailsOfCourse } from "../services/operations/courseDetailsAPI"
import {setCompletedLectures,setCourseSectionData,setEntireCourseData,setTotalNoOfLectures} from "../slices/viewCourse"

const ViewCourse = () => {
    const { courseId } = useParams()
    const { token } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const [reviewModal, setReviewModal] = useState(false)
    const location = useLocation()
    const [loading, setLoading] = useState(true)
    
    useEffect(() =>  {
        const fetchCourse = async () => {
            const courseData = await getFullDetailsOfCourse(courseId, token)
            console.log("Course Data here... -> ", courseData)
            dispatch(setCourseSectionData(courseData.courseDetails[0].courseContent))
            dispatch(setEntireCourseData(courseData.courseDetails))
            dispatch(setCompletedLectures(courseData.completedVideos))
            let lectures = 0
            courseData?.courseDetails[0]?.courseContent?.forEach((sec) => {
                lectures += sec.subSection.length
            })
            dispatch(setTotalNoOfLectures(lectures))
            setLoading(false)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
        fetchCourse();
    }, [location.pathname ])

    if(loading) {
        return (<div className="spinner"></div>)
    }

    return (
        <div className='flex relative w-screen'>
            <VideoDetailsSidebar setReviewModal={setReviewModal}/>
            <div className='overflow-auto mt-[13vh] ml-72 flex justify-center items-center gap-6 w-full'>
                <div className='w-11/12'>
                    {/* the outlet element is just used to determine where child routes of parent routes should be displayed within the parent routes instead of a new page */}
                    <Outlet /> 
                </div>
            </div>
            {reviewModal && (<CourseViewModal setReviewModal={setReviewModal} />)}
        </div>
    )
}

export default ViewCourse
