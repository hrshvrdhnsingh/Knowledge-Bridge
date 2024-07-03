import { useState } from "react";
import { AiFillCaretDown } from "react-icons/ai";
import { MdEdit } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { RxDropdownMenu } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import {
    deleteSection,
    deleteSubSection,
} from "../../../../../services/operations/courseDetailsAPI";
import { setCourse } from "../../../../../slices/courseSlice";
import ConfirmationModal from "../../../../common/ConfirmationModal";
import SubSectionModal from "./SubSectionModal";

const NestedView = ({ handleChangeEditSectionName }) => {
    const { course } = useSelector((state) => state.course);
    const { token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    // States to keep track of mode of modal [add, view, edit]
    const [addSubSection, setAddSubsection] = useState(null);
    const [viewSubSection, setViewSubSection] = useState(null);
    const [editSubSection, setEditSubSection] = useState(null);
    // to keep track of confirmation modal
    const [confirmationModal, setConfirmationModal] = useState(null);

    const handleDeleleSection = async (sectionID) => {
        const result = await deleteSection({
            sectionID,
            courseId: course._id,
            token,
        });
        if (result) {
            dispatch(setCourse(result));
        }
        setConfirmationModal(null);
    };

    const handleDeleteSubSection = async (subSectionID, sectionID) => {
        const result = await deleteSubSection({ subSectionID, sectionID, token });
        if (result) {
            // update the structure of course
            // Once the subsection has been deleted, we need ti make sure that the course that is being set has the aforesaid subsection deleted .
            const updatedCourseContent = course.courseContent.map(
                (section) => (section._id === sectionID ? result : section) // Set to result if the section is availabe and matches the sectionID otherwiser us the
                // the old section
            );
            const updatedCourse = { ...course, courseContent: updatedCourseContent };
            dispatch(setCourse(updatedCourse));
        }
        setConfirmationModal(null);
    };
    console.log("Course map ->", course);
    return (
        <>
            <div className="rounded-xl bg-richblack-500 h-max w-full" id="nestedViewContainer">
                {course?.courseContent?.map((section) => (
                    <details
                        key={section._id}
                        open
                        className="bg-richblack-500 text-zinc-300 flex flex-col mt-2"
                    >
                        <summary className="flex cursor-pointer items-center p-2 justify-between w-full">
                            <div className="flex items-center gap-4">
                                <RxDropdownMenu className="text-3xl" />
                                <p className="">{section.sectionName}</p>
                            </div>
                            <div className="flex justify-between gap-2">
                                <button
                                    onClick={() =>
                                        handleChangeEditSectionName(
                                            section._id,
                                            section.sectionName
                                        )
                                    }
                                >
                                    <MdEdit className="text-xl" />
                                </button>
                                <button
                                    onClick={() =>
                                        setConfirmationModal({
                                            text1: "Delete this section?",
                                            text2: "All the lectures in this section will be deleted",
                                            btn1text: "Delete",
                                            btn2Text: "Cancel",
                                            btn1Handler: () => handleDeleleSection(section._id),
                                            btn2Handler: () => setConfirmationModal(null),
                                        })
                                    }
                                >
                                    <RiDeleteBin6Line className="text-xl  cursor-pointer" />
                                </button>
                                <span className="font-medium text-richblack-300">|</span>
                                <AiFillCaretDown className={`text-xl text-richblack-300`} />
                            </div>
                        </summary>
                        <div className="">
                            {section.subSection.map((data) => (
                                <div
                                    key={data?._id}
                                    onClick={() => setViewSubSection(data)}
                                    className="flex justify-between w-10/12 ml-16 rounded-xl bg-richblack-600 bg-opacity-60 p-2 mt-2"
                                >
                                    <div className="flex gap-4">
                                        <RxDropdownMenu className="text-2xl cursor-pointer" />
                                        <p className="font-semibold">{data.title}</p>
                                    </div>
                                    {/* The e.stopPropagation() is to stop the above onClick event to be in effect even when we click on the edit or delete button*/}
                                    <div
                                        onClick={(e) => e.stopPropagation()}
                                        className="flex gap-4 justify-between"
                                    >
                                        <button
                                            onClick={() =>
                                                setEditSubSection({
                                                    ...data,
                                                    sectionId: section._id,
                                                })
                                            }
                                        >
                                            <MdEdit className="text-xl  cursor-pointer" />
                                        </button>
                                        <button
                                            onClick={() =>
                                                setConfirmationModal({
                                                    text1: "Delete this sub-section?",
                                                    text2: "This lecture will be deleted",
                                                    btn1Text: "Delete",
                                                    btn2Text: "Cancel",
                                                    btn1Handler: () =>
                                                        handleDeleteSubSection(
                                                            data._id,
                                                            section._id
                                                        ),
                                                    btn2Handler: () => setConfirmationModal(null),
                                                })
                                            }
                                        >
                                            <RiDeleteBin6Line className="text-xl cursor-pointer" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                            <button
                                onClick={() => setAddSubsection(section._id)}
                                className="flex gap-1 items-center p-1 text-yellow-400 rounded-xl"
                            >
                                <FaPlus className="text-base" />
                                <p>Add Lecture</p>
                            </button>
                        </div>
                    </details>
                ))}
            </div>
            {/* Modal Display */}
            {addSubSection ? (
                <SubSectionModal
                    modalData={addSubSection}
                    setModalData={setAddSubsection}
                    add={true}
                />
            ) : viewSubSection ? (
                <SubSectionModal
                    modalData={viewSubSection}
                    setModalData={setViewSubSection}
                    view={true}
                />
            ) : editSubSection ? (
                <SubSectionModal
                    modalData={editSubSection}
                    setModalData={setEditSubSection}
                    edit={true}
                />
            ) : (
                <></>
            )}
            {/* Confirmation Modal */}
            {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
        </>
    );
};

export default NestedView;
