import { useEffect, useRef, useState } from "react";
import { AiOutlineDown } from "react-icons/ai";
import CourseSubSectionAccordion from "./CourseSubSectionAccordion";

const CourseAccordionBar = ({ course, isActive, handleActive }) => {
    const contentEl = useRef(null);

    // Accordian state
    const [active, setActive] = useState(false);
    useEffect(() => {
        setActive(isActive?.includes(course._id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isActive]);
    const [sectionHeight, setSectionHeight] = useState(0);
    useEffect(() => {
        setSectionHeight(active ? contentEl.current.scrollHeight : 0);
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
