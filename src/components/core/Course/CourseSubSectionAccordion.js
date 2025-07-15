import React from "react"
import { HiOutlineVideoCamera } from "react-icons/hi"

// To display the subsection under each section when the section is clicked.
const CourseSubSectionAccordion = ({subSec}) => {
    return (
        <div className="flex bg-richblack-700 bg-opacity-90 text-zinc-300 justify-between p-2 rounded-xl items-center gap-2">
            <span><HiOutlineVideoCamera size={24}/></span>
            <p className="text-zinc-300">{subSec?.title}</p>
        </div>
    )
}

export default CourseSubSectionAccordion
