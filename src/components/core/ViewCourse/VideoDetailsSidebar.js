import { useEffect, useState } from "react"
import { BsChevronDown } from "react-icons/bs"
import { IoIosArrowBack } from "react-icons/io"
import { useSelector } from "react-redux"
import { useLocation, useNavigate, useParams } from "react-router-dom"

const VideoDetailsSidebar = ({setReviewModal}) => {
    const [activeStatus, setActiveStatus] = useState("")
    const [videoBarActive, setVideoBarActive] = useState("")
    const navigate = useNavigate()
    const location = useLocation()
    const { sectionId, subSectionId } = useParams(); // From the url
    const {courseSectionData, courseEntireData, totalNoOfLectures, completedLectures} = useSelector((state) => state.viewCourse)

    console.log("Course Section Data -> ", courseSectionData);
    console.log("Course Entire Data -> ", courseEntireData);
    console.log("Total no. of lectures -> ", totalNoOfLectures);
    console.log("Complete Lectures -> ", completedLectures);

    useEffect(() => {(() => {
        // To highlight the subsection we are currently watching.
        // By default, id of first section and subsection exists in the url.
        if (!courseSectionData?.length) return ;
        const currentSectionIndx = courseSectionData.findIndex(
            (data) => data._id === sectionId
        )
        const currentSubSectionIndx = courseSectionData?.[currentSectionIndx]?.subSection.findIndex((data) => data._id === subSectionId)
        const activeSubSectionId = courseSectionData[currentSectionIndx]?.subSection?.[currentSubSectionIndx]?._id
        setActiveStatus(courseSectionData?.[currentSectionIndx]?._id) // Set current section here
        setVideoBarActive(activeSubSectionId) // Set current sub-section here
    })()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [courseSectionData, courseEntireData, location.pathname])

    return (
        <div className='flex flex-col'>
            <div className=' gap-6 sidebar text-white flex items-center fixed w-[18vw] mt-[9vh] flex-col left-0 top-0 border-richblack-700 border-r-[2px] h-[91vh] py-3 bg-richblack-100'>
            {/**Add Review and back button */}
                <div className="flex flex-col w-full gap-1">
                    <div className="flex justify-between w-full p-2" >
                        <div onClick={() => navigate(`/dashboard/enrolled-courses`)} className="p-2 rounded-full bg-richblack-500 flex justify-center items-center cursor-pointer"><IoIosArrowBack size={24} /></div>
                        <button onClick={() => setReviewModal(true)} className="cursor-pointer bg-yellow-400 px-2 text-black font-medium rounded-xl">Add Review</button>
                    </div>
                    <div>
                        <p>{courseEntireData?.courseName}</p>
                        <p className="text-sm px-2">{completedLectures?.length} / {totalNoOfLectures}</p>
                    </div>
                </div>
                <h1 className="text-zinc-500 text-xl place-self-start px-2 font-medium">{courseEntireData[0]?.courseName}</h1>
                <div className="w-full">
                    {
                        courseSectionData?.map((course, index) => (
                            <div className="text-white flex flex-col" key={index} onClick={()=>setActiveStatus(course?._id)}>
                                {/**Section */}
                                <div className="flex cursor-default justify-between py-2 px-3 text-zinc-400">
                                    <p>{course?.sectionName}</p>
                                    <div className="flex items-center">
                                        <span className={`${activeStatus === course?._id ? "rotate-180" : "rotate-0"} transition-all duration-500`}><BsChevronDown /></span>
                                    </div>
                                </div>
                                {/**Sub-Sections */}
                                {
                                    activeStatus === course?._id && (
                                        <div className="w-10/12 place-self-end mr-4 rounded-md transition-[height] duration-500 ease-in-out bg-richblack-700 bg-opacity-40">
                                            {
                                                course?.subSection?.map((topic, index) => (
                                                    <div className={`cursor-pointer flex rounded-md items-center gap-2 px-2 py-1 font-medium ${videoBarActive === topic._id ? "bg-richblack-400 bg-opacity-70  text-black": "hover:richblack-300 text-slate-400" }`} key={index}
                                                        onClick={() => {navigate(`/view-course/${courseEntireData?._id}/section/${course?._id}/sub-section/${topic?._id}`); setVideoBarActive(topic._id)}}
                                                    >
                                                        {/**Checked input if the video is rpesent in completed Lectures but do nothing of it's presses without completing the lecture*/}
                                                        <input type="checkbox" checked={completedLectures.includes(topic?._id)} onChange={() => {console.log(topic._id)}} className="text-xl p-1 h-[5px] w-[5px] bg-richblack-400 checked:bg-green-600 checked:bg-opacity-70 rounded-sm"/>
                                                        <span className="text-sm">{topic.title}</span>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    )
                                }
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default VideoDetailsSidebar
