import { useEffect, useRef, useState } from "react";
import { AiOutlineDown } from "react-icons/ai";
import CourseSubSectionAccordion from "./CourseSubSectionAccordion";

// To display the overview all the sections of the course
// In it the subsections will also be shown on clicking the particular section
// isActive has all the section ids that are expanded and handleActive is responsible for adding & removing that.
const CourseAccordionBar = ({ course, isActive, handleActive }) => {
    const contentEl = useRef(null); //  the ref is used to handle the DOM which in this case is the subsection
    // list and only displays the content height when clicked on. contentEl for each section holds the DOM
    // with it's sectionHeight and applies it via inline height.

    const [active, setActive] = useState(false); // The state of current section whether it's expanded
    // Whenever isActive changes, the "active" is set via the setActive based on whether the section id is
    // in isActive or not. And based on this "active" the height of the section is decided.
    useEffect(() => {
        setActive(isActive?.includes(course._id)); // Tracks whether the current expanded
    }, [isActive]);

    const [sectionHeight, setSectionHeight] = useState(0);
    useEffect(() => {
        setSectionHeight(active ? contentEl.current.scrollHeight : 0); // The ref is used to set the total subsection height.
    }, [active]);

    return (
        <div className="bg-richblack-600 p-4 sm:p-0 sm:py-2 sm:px-1 rounded-md flex flex-col gap-1">
            <div className="">
                <div
                    className={`flex cursor-pointer text-xl items-start justify-between`}
                    onClick={() => handleActive(course._id)}
                >
                    <div className="flex gap-4 items-center text-zinc-200 sm:text-base">
                        <i className={isActive.includes(course._id) ? "rotate-180" : "rotate-0"}>
                            <AiOutlineDown />
                        </i>
                        <p>{course?.sectionName}</p>
                    </div>
                    <div className="space-x-4 text-base sm:text-sm">
                        <span className="text-yellow-300">{`${
                            course.subSection?.length || 0
                        } lecture(s)`}</span>
                    </div>
                </div>
            </div>
            <div
                ref={contentEl}
                className={`w-8/12 ml-12 relative sm:w-11/12 sm:ml-6 overflow-hidden ease-[ease] transition-[height] duration-[0.5s]`}
                style={{ height: sectionHeight }}
            >
                <div className="flex flex-col gap-2 sm:text-base">
                    {course?.subSection?.map((subSec, index) => (
                        <CourseSubSectionAccordion subSec={subSec} key={index} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CourseAccordionBar;
