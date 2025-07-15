/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import "video-react/dist/video-react.css";
import { useLocation } from "react-router-dom";
import { BigPlayButton, Player } from "video-react";
import { markLectureAsComplete } from "../../../services/operations/courseDetailsAPI";
import { updateCompletedLectures } from "../../../slices/viewCourse";

// The whole video details works on the basis of extracting the courseId, sectionId, and subsectionId from the
// URL and then displaying the content. So on moving to teh next content is simply routing to the next subsection
// in the course.
const VideoDetails = () => {
    const { courseId, sectionId, subSectionId } = useParams();
    console.log(courseId, sectionId, subSectionId)
    const navigate = useNavigate();
    const location = useLocation();
    const playerRef = useRef(null);
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.auth);
    const { courseSectionData, courseEntireData, completedLectures } = useSelector(
        (state) => state.viewCourse
    );
    const [videoData, setVideoData] = useState([]);
    const [previewSource, setPreviewSource] = useState("");
    const [videoEnded, setVideoEnded] = useState(false);
    const [loading, setLoading] = useState(false);

    // Actually fetching the video that belongs to the current subsection
    useEffect(() => {
        (async () => {
            if (!courseSectionData?.length) return;
            if (!courseId && !sectionId && !subSectionId) {
                navigate(`/dashboard/enrolled-courses`);
            } 
            else {
                //     console.log("courseSectionData", courseSectionData);
                const filteredData = courseSectionData.filter((course) => course._id === sectionId);
                //     console.log("filteredData", filteredData);
                const filteredVideoData = filteredData?.[0]?.subSection.filter(
                    (data) => data._id === subSectionId
                );
                //     console.log("filteredVideoData", filteredVideoData);
                setVideoData(filteredVideoData[0]);
                setPreviewSource(courseEntireData.thumbnail);
                setVideoEnded(false);
            }
        })();
    }, [courseSectionData, courseEntireData, location.pathname]);

    // Check if the lecture is the first video of the course
    const isFirstVideo = () => {
        // i) First get the index of the section
        const currentSectionIndx = courseSectionData.findIndex((data) => data._id === sectionId);
        // ii) Find the current subsection index in the course subsection
        const currentSubSectionIndx = courseSectionData[currentSectionIndx].subSection.findIndex(
            (data) => data._id === subSectionId
        );
        // iii) Return it's true if both are 0
        if (currentSectionIndx === 0 && currentSubSectionIndx === 0) {
            return true;
        } 
        else {
            return false;
        }
    };

    // Go to the next video
    const goToNextVideo = () => {
        // Locate the section index we are on currently
        const currentSectionIndx = courseSectionData.findIndex((data) => data._id === sectionId);
        const noOfSubsections = courseSectionData[currentSectionIndx].subSection.length;

        const currentSubSectionIndx = courseSectionData[currentSectionIndx].subSection.findIndex(
            (data) => data._id === subSectionId
        );

        // If we are not on the last subsection of the current section, just moeve to the next subsection
        if (currentSubSectionIndx !== noOfSubsections - 1) {
            const nextSubSectionId =
                courseSectionData[currentSectionIndx].subSection[currentSubSectionIndx + 1]._id;
            navigate(
                `/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`
            );
        } 
        // Else get the next section and then route to the first subsection of the that section
        else {
            const nextSectionId = courseSectionData[currentSectionIndx + 1]._id;
            const nextSubSectionId = courseSectionData[currentSectionIndx + 1].subSection[0]._id;
            navigate(
                `/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`
            );
        }
    };

    // Check if the lecture is the last video of the course
    const isLastVideo = () => {
        // Get the current section and the total number of subsections
        const currentSectionIndx = courseSectionData.findIndex((data) => data._id === sectionId);
        const noOfSubsections = courseSectionData[currentSectionIndx].subSection.length;
        // Then get the current subsection we are on
        const currentSubSectionIndx = courseSectionData[currentSectionIndx].subSection.findIndex(
            (data) => data._id === subSectionId
        );

        if (currentSectionIndx === courseSectionData.length - 1 && currentSubSectionIndx === noOfSubsections - 1) 
        {
            return true;
        } 
        else {
            return false;
        }
    };

    // Go to the previous video
    const goToPrevVideo = () => {
        // Get the section index and the index of the subsection we are on
        const currentSectionIndx = courseSectionData.findIndex((data) => data._id === sectionId);
        const currentSubSectionIndx = courseSectionData[currentSectionIndx].subSection.findIndex(
            (data) => data._id === subSectionId
        );

        // If it's not the first lecture of the section, we just move to previous subsection in the same section
        if (currentSubSectionIndx !== 0) {
            const prevSubSectionId =
                courseSectionData[currentSectionIndx].subSection[currentSubSectionIndx - 1]._id;
            navigate(
                `/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`
            );
        } 
        // Otherwise move to the previous section and the last subsection in that
        else {
            const prevSectionId = courseSectionData[currentSectionIndx - 1]._id;
            const prevSubSectionLength =
                courseSectionData[currentSectionIndx - 1].subSection.length;
            const prevSubSectionId =
                courseSectionData[currentSectionIndx - 1].subSection[prevSubSectionLength - 1]._id;
            navigate(
                `/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubSectionId}`
            );
        }
    };

    const handleLectureCompletion = async () => {
        setLoading(true);
        const res = await markLectureAsComplete(
            { courseId: courseId, subsectionId: subSectionId },
            token
        );
        if (res) {
            dispatch(updateCompletedLectures(subSectionId));
        }
        setLoading(false);
    };

    return (
        <div className="flex gap-6 w-full h-full flex-col">
            {!videoData ? (
                <div>
                    <img className="" src={previewSource} alt="Preview" />
                </div>
            ) : (
                <Player
                    ref={playerRef} aspectRatio="16:9" fluid="false" playsInline onEnded={() => setVideoEnded(true)} 
                    src={videoData?.videoUrl} className="w-full h-full rounded-3xl relative"
                >
                    <BigPlayButton position="center" />
                    {/* Render When Video Ends */}
                    {videoEnded && (
                        <div className="absolute w-full h-full top-0 left-0 justify-center items-center z-[9999] gap-4 flex flex-col bg-black bg-opacity-70">
                            <div className="flex gap-4">
                                {!completedLectures.includes(subSectionId) && (
                                    <button
                                        disabled={loading}
                                        onClick={() => handleLectureCompletion()}
                                        className="p-2 rounded-xl bg-yellow-400 text-black text-xl sm:text-base sm:p-1 sm:px-2 cursor-pointer"
                                    >
                                        {!loading ? "Mark as completed" : "Loading ..."}
                                    </button>
                                )}
                                <div
                                    onClick={() => {
                                        if (playerRef?.current) {
                                            playerRef.current.seek(0);
                                            setVideoEnded(false);
                                        }
                                    }}
                                >
                                    <button
                                        disabled={loading}
                                        className="cursor-pointer p-2 rounded-xl sm:text-base sm:px-2 text-xl bg-slate-400 px-4 bg-opacity-70"
                                    >
                                        Rewatch
                                    </button>
                                </div>
                            </div>
                            <div>
                                {!isFirstVideo() && (
                                    <button
                                        disabled={loading}
                                        onClick={goToPrevVideo}
                                        className="cursor-pointer p-2 px-4 sm:px-2 sm:p-1 rounded-xl sm:text-base text-xl bg-slate-400 bg-opacity-70"
                                    >
                                        Previous
                                    </button>
                                )}
                                {!isLastVideo() && (
                                    <button
                                        disabled={loading}
                                        onClick={goToNextVideo}
                                        className="cursor-pointer p-2 px-4 rounded-xl sm:text-base sm:px-2 sm:p-1 text-xl bg-slate-400 bg-opacity-70"
                                    >
                                        Next
                                    </button>
                                )}
                            </div>
                        </div>
                    )}
                </Player>
            )}
            <div className="flex flex-col px-10 sm:px-2">
                <h1 className="text-3xl sm:text-xl py-2 font-semibold text-zinc-400">{videoData?.title}</h1>
                <p className="text-2xl sm:text-base font-medium text-zinc-600">{videoData?.description}</p>
            </div>
        </div>
    );
};

export default VideoDetails;
