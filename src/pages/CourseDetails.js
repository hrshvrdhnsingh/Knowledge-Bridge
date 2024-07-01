import React, { useEffect, useState } from "react"
import { BiInfoCircle } from "react-icons/bi"
import { HiOutlineGlobeAlt } from "react-icons/hi"
import { ReactMarkdown } from "react-markdown/lib/react-markdown"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import ConfirmationModal from "../components/common/ConfirmationModal"
//import Footer from "../components/Common/Footer"
import RatingStars from "../components/common/RatingStars"
import CourseAccordionBar from "../components/core/Course/CourseAccordionBar"
import CourseDetailsCard from "../components/core/Course/CourseDetailsCard"
import { formatDate } from "../services/formatDate"
import { fetchCourseDetails } from "../services/operations/courseDetailsAPI"
import { BuyCourse } from "../services/operations/studentFeaturesAPI"
import GetAvgRating from "../utils/avgRating"
import Error from "./Error"
import HighLightText from "../components/core/Homepage/HighLightText"
import { AiOutlineConsoleSql } from "react-icons/ai"

const CourseDetails = () => {
    const { user } = useSelector((state) => state.profile)
    const { token } = useSelector((state) => state.auth)
    const { loading } = useSelector((state) => state.profile)
    const { paymentLoading } = useSelector((state) => state.course)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    // Getting courseId from url parameter
    const { courseId } = useParams()
    // console.log(`course id: ${courseId}`)

    // Declear a state to save the course details
    const [response, setResponse] = useState(null)
    const [confirmationModal, setConfirmationModal] = useState(null)
    useEffect(() => {(async () => {
        // Calling fetchCourseDetails fucntion to fetch the details
        try {
            const res = await fetchCourseDetails(courseId)
            // console.log("course details res: ", res)
            setResponse(res)
        } catch (error) {
            console.log("Could not fetch Course Details")
        }
        })()
    }, [courseId])

    console.log("response:---::: ", response?.data?.courseDetails[0]?.ratingAndReviews)

    // Calculating Avg Review count
    const [avgReviewCount, setAvgReviewCount] = useState(0)
    useEffect(() => {
        const getRating = async () => {
            const count = GetAvgRating(response?.data?.courseDetails[0]?.ratingAndReviews)
            setAvgReviewCount(count);
            console.log("Count - >", count)
            console.log(typeof(response?.data?.courseDetails[0]?.ratingAndReviews))
        }
        console.log("..........");
        getRating();
    }, [response?.data]);
    // console.log("avgReviewCount: ", avgReviewCount)

    // // Collapse all
    // const [collapse, setCollapse] = useState("")
    const [isActive, setIsActive] = useState(Array(0))
    const handleActive = (id) => {
        // console.log("called", id)
        setIsActive(
        !isActive.includes(id)
            ? isActive.concat([id])
            : isActive.filter((e) => e !== id)
        )
    }

    // Total number of lectures
    const [totalNoOfLectures, setTotalNoOfLectures] = useState(0)
    useEffect(() => {
        let lectures = 0
        response?.data?.courseDetails?.courseContent?.forEach((sec) => {
            lectures += sec?.subSection?.length || 0
        })
        setTotalNoOfLectures(lectures)
    }, [response])

    if (loading || !response) {
        return (
        <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
            <div className="spinner"></div>
        </div>
        )
    }
    /* if (!response.success) {
        return <Error />
    } */

    const {
        _id: course_id,courseName,courseDescription,thumbnail,price,whatYouWillLearn,
        courseContent,ratingAndReviews,instructor,studentsEnrolled,createdAt,
    } = response?.data?.courseDetails[0]

    console.log("rating at course details -> ", ratingAndReviews)
    const handleBuyCourse = () => {
        if (token) {
            BuyCourse(token, [courseId], user, navigate, dispatch)
            return
        }
        setConfirmationModal({
            text1: "You are not logged in!",text2: "Please login to Purchase Course.",btn1Text: "Login",btn2Text: "Cancel",
            btn1Handler: () => navigate("/login"),btn2Handler: () => setConfirmationModal(null),
        })
    }

    if (paymentLoading) {
        // console.log("payment loading")
        return (
        <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
            <div className="spinner"></div>
        </div>
        )
    }
    return (
        <div className='flex flex-col w-screen min-h-screen items-center gap-8'>
            <div className='light-bg relative flex flex-col justify-center px-40 h-[70vh] w-full gap-8 overflow-visible'>
                <h1 className="text-5xl py-3 w-7/12"><HighLightText text={courseName} /></h1>
                <p className="text-xl text-white w-6/12">{courseDescription}</p>
                <div className="text-md  text-zinc-400 text-lg flex flex-wrap items-center gap-2">
                    <span className="text-yellow-25">{avgReviewCount}</span>
                    <RatingStars Review_Count={avgReviewCount} Star_Size={20} />
                    <span>{`(${ratingAndReviews?.length} reviews)`} | </span>
                    <span>{`${studentsEnrolled?.length} students enrolled`}</span>
                </div>
                <p className="text-zinc-500">Created by {`${instructor.firstName} ${instructor.lastName}`}</p>
                <div className="flex flex-wrap gap-5 text-lg text-zinc-400">
                    <p className="flex items-center gap-2">{" "}<BiInfoCircle /> Created at {formatDate(createdAt)}</p>
                    <p className="flex items-center gap-2">{" "}<HiOutlineGlobeAlt /> English</p>
                </div>
                <div className="lg:absolute lg:block top-[22%] left-[60%]"><CourseDetailsCard course={response?.data?.courseDetails[0]} setConfirmationModal={setConfirmationModal} handleBuyCourse={handleBuyCourse} /></div>
            </div>
            {/**What you will learn section */}
            <div className="w-9/12">
                <div className="place-self-start w-max">
                    <p className="text-4xl font-bold py-3 text-white">What you'll learn</p>
                    <div className="text-zinc-400 text-xl px-12 w-10/12 "><ReactMarkdown />{whatYouWillLearn}</div>
                </div>
            </div>
            {/**Course-content section */}
            <div className="w-9/12">
                <div className="place-self-start w-7/12 flex flex-col gap-4">
                    <p className="text-4xl font-bold py-3 text-white">Course Content</p>
                    <div className="flex flex-wrap gap-2 justify-between text-base text-zinc-400">
                        <div className="flex gap-4">
                            <span>{courseContent?.length} section(s)</span>
                            <span>{totalNoOfLectures} lectures</span>
                            <span>{response?.data?.totalDuration} total length</span>
                        </div>
                        <div>
                            <button className="text-yellow-300 " onClick={() => setIsActive([])}>Collapse all sections</button>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4">
                        {courseContent?.map((course, index) => (
                            <CourseAccordionBar course={course} key={index} isActive={isActive} handleActive={handleActive} />
                        ))}
                    </div>
                </div>
            </div>
            {/**Author part */}
            <div className="w-9/12">
                <div className="place-self-start w-7/12 flex flex-col gap-4">
                    <p className="text-4xl font-bold py-3 text-white">Author</p>
                    <div className="flex gap-2 w-full justify-between text-base text-zinc-400">
                        <div className="w-3/12 rounded-full">
                            <img src={instructor?.image ? instructor.image : `https://api.dicebear.com/5.x/initials/svg?seed=${instructor.firstName} ${instructor.lastName}`}
                                alt='author' className="object-cover h-full w-full "
                            />
                        </div>
                        <div className="w-9/12">
                            <p className="font-medium text-zinc-400 text-xl">{`${instructor.firstName} ${instructor.lastName}`}</p>
                            <p className="text-zinc-600">{instructor?.additionalDetails?.about}</p>
                        </div>
                        {/*  */}
                    </div>
                </div>
            </div>
            {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
        </div>
        
    )
}

export default CourseDetails
