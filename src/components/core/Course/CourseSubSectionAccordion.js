import React from "react"
import { HiOutlineVideoCamera } from "react-icons/hi"

const CourseSubSectionAccordion = ({subSec}) => {
    return (
        <div className="flex bg-richblack-700 bg-opacity-90 text-zinc-300 justify-between p-2 rounded-xl items-center gap-2">
            <span><HiOutlineVideoCamera size={24}/></span>
            <p className="text-zinc-300">{subSec?.title}</p>
        </div>
    )
}

export default CourseSubSectionAccordion
