/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { BiInfoCircle } from "react-icons/bi";
import { HiOutlineGlobeAlt } from "react-icons/hi";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ConfirmationModal from "../components/common/ConfirmationModal";
//import Footer from "../components/Common/Footer"
import RatingStars from "../components/common/RatingStars";
import CourseAccordionBar from "../components/core/Course/CourseAccordionBar";
import CourseDetailsCard from "../components/core/Course/CourseDetailsCard";
import { formatDate } from "../services/formatDate";
import { fetchCourseDetails } from "../services/operations/courseDetailsAPI";
import { BuyCourse } from "../services/operations/studentFeaturesAPI";
import GetAvgRating from "../utils/avgRating";
import HighLightText from "../components/core/Homepage/HighLightText";
import Footer from '../components/common/Footer'
const CourseDetails = () => {
    const { user } = useSelector((state) => state.profile);
    const { token } = useSelector((state) => state.auth);
    const { loading } = useSelector((state) => state.profile);
    const { paymentLoading } = useSelector((state) => state.course);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Getting courseId from url parameter
    const { courseId } = useParams();
    // console.log(`course id: ${courseId}`)

    // Declear a state to save the course details
    const [response, setResponse] = useState(null);
    const [confirmationModal, setConfirmationModal] = useState(null);
    useEffect(() => {
        (async () => {
            // Calling fetchCourseDetails fucntion to fetch the details
            try {
                const res = await fetchCourseDetails(courseId);
                // console.log("course details res: ", res)
                setResponse(res);
            } catch (error) {
                //     console.log("Could not fetch Course Details");
            }
        })();
    }, [courseId]);

    // Calculating Avg Review count
    const [avgReviewCount, setAvgReviewCount] = useState(0);
    useEffect(() => {
        const getRating = async () => {
            const count = GetAvgRating(response?.data?.courseDetails[0]?.ratingAndReviews);
            setAvgReviewCount(count);
        };
        getRating();
    }, [response?.data]);

    const [isActive, setIsActive] = useState(Array(0));
    const handleActive = (id) => {
        // console.log("called", id)
        setIsActive(
            !isActive.includes(id) ? isActive.concat([id]) : isActive.filter((e) => e !== id)
        );
    };

    // Total number of lectures
    const [totalNoOfLectures, setTotalNoOfLectures] = useState(0);
    useEffect(() => {
        let lectures = 0;
        response?.data?.courseDetails?.courseContent?.forEach((sec) => {
            lectures += sec?.subSection?.length || 0;
        });
        setTotalNoOfLectures(lectures);
    }, [response]);

    if (loading || !response) {
        return (
            <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
                <div className="spinner"></div>
            </div>
        );
    }
    /* if (!response.success) {
        return <Error />
    } */

    const {
        _id: course_id,
        courseName,
        courseDescription,
        thumbnail,
        price,
        whatYouWillLearn,
        courseContent,
        ratingAndReviews,
        instructor,
        studentsEnrolled,
        createdAt,
    } = response?.data?.courseDetails[0];

    const handleBuyCourse = () => {
        if (token) {
            BuyCourse(token, [courseId], user, navigate, dispatch);
            return;
        }
        setConfirmationModal({
            text1: "You are not logged in!",
            text2: "Please login to Purchase Course.",
            btn1Text: "Login",
            btn2Text: "Cancel",
            btn1Handler: () => navigate("/login"),
            btn2Handler: () => setConfirmationModal(null),
        });
    };

    if (paymentLoading) {
        // console.log("payment loading")
        return (
            <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
                <div className="spinner"></div>
            </div>
        );
    }
    return (
        <div className="flex flex-col w-screen min-h-screen items-center gap-8">
            <div className="light-bg sm:h-max sm:flex-col-reverse mt-[9vh] sm:py-4 relative flex justify-start flex-col items-start px-40 sm:px-1 h-[70vh] w-full gap-8 overflow-visible">
                <div className="w-full h-full flex flex-col sm:w-[100%] gap-8 justify-center sm:px-2 sm:gap-4">
                    <h1 className="text-5xl py-3 w-7/12 sm:w-full sm:text-4xl">
                        <HighLightText text={courseName} />
                    </h1>
                    <p className="text-xl text-white w-6/12 sm:w-full sm:text-base">{courseDescription}</p>
                    <div className="sm:text-sm text-zinc-400 text-lg flex flex-wrap items-center gap-2">
                        <span className="text-yellow-25">{avgReviewCount}</span>
                        <RatingStars Review_Count={avgReviewCount} Star_Size={20} />
                        <span>{`(${ratingAndReviews?.length} reviews)`} | </span>
                        <span>{`${studentsEnrolled?.length} students enrolled`}</span>
                    </div>
                    <p className="text-zinc-500">
                        Created by {`${instructor.firstName} ${instructor.lastName}`}
                    </p>
                    <div className="flex flex-wrap gap-5 text-lg text-zinc-400 sm:text-sm">
                        <p className="flex items-center gap-2">
                            {" "}
                            <BiInfoCircle /> Created at {formatDate(createdAt)}
                        </p>
                        <p className="flex items-center gap-2">
                            {" "}
                            <HiOutlineGlobeAlt /> English
                        </p>
                    </div>
                </div>
                <div className="lg:absolute sm:w-full sm:h-max sm:top-0 sm:left-0 sm:relative sm:block lg:block top-[22%] left-[55%]">
                    <CourseDetailsCard
                        course={response?.data?.courseDetails[0]}
                        setConfirmationModal={setConfirmationModal}
                        handleBuyCourse={handleBuyCourse}
                    />
                </div>
            </div>
            {/**What you will learn section */}
            <div className="w-9/12 sm:w-11/12">
                <div className="place-self-start w-max">
                    <p className="text-4xl font-bold py-3 text-white">What you'll learn</p>
                    <div className="text-zinc-400 text-xl px-12 w-10/12 sm:w-7/12 sm:px-2 sm:text-base">
                        <ReactMarkdown />
                        {whatYouWillLearn}
                    </div>
                </div>
            </div>
            {/**Course-content section */}
            <div className="w-9/12 sm:w-11/12">
                <div className="place-self-start w-7/12 sm:w-full flex flex-col gap-4">
                    <p className="text-4xl font-bold py-3 text-white">Course Content</p>
                    <div className="flex flex-wrap gap-2 justify-between text-base text-zinc-400">
                        <div className="flex gap-4 sm:gap-8">
                            <span>{courseContent?.length} section(s)</span>
                            <span>{totalNoOfLectures} lectures</span>
                            <span>{response?.data?.totalDuration} total length</span>
                        </div>
                        <div className="place-self-end flex sm:text-sm">
                            <button className="text-yellow-300 " onClick={() => setIsActive([])}>
                                Collapse all sections
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4">
                        {courseContent?.map((course, index) => (
                            <CourseAccordionBar
                                course={course}
                                key={index}
                                isActive={isActive}
                                handleActive={handleActive}
                            />
                        ))}
                    </div>
                </div>
            </div>
            {/**Author part */}
            <div className="w-9/12 sm:w-11/12">
                <div className="place-self-start w-7/12 sm:w-full flex flex-col gap-4">
                    <p className="text-4xl font-bold py-3 text-white">Author</p>
                    <div className="flex gap-2 w-full sm:flex-col justify-between text-base text-zinc-400">
                        <div className="w-3/12 sm:w-8/12 place-self-center rounded-full">
                            <img
                                src={
                                    instructor?.image
                                        ? instructor.image
                                        : `https://api.dicebear.com/5.x/initials/svg?seed=${instructor.firstName} ${instructor.lastName}`
                                }
                                alt="author"
                                className="object-cover h-full w-full "
                            />
                        </div>
                        <div className="w-9/12 sm:w-full">
                            <p className="font-medium text-zinc-400 text-xl">{`${instructor.firstName} ${instructor.lastName}`}</p>
                            <p className="text-zinc-600">{instructor?.additionalDetails?.about}</p>
                        </div>
                        {/*  */}
                    </div>
                </div>
            </div>
            {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
            <Footer />
        </div>
    );
};

export default CourseDetails;