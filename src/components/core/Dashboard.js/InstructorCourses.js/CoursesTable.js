import { useDispatch, useSelector } from "react-redux"
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table"
import { setCourse, setEditCourse } from "../../../../slices/courseSlice"
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css"
import { useState } from "react"
import { FaCheck } from "react-icons/fa"
import { FiEdit2 } from "react-icons/fi"
import { HiClock } from "react-icons/hi"
import { RiDeleteBin6Line } from "react-icons/ri"
import { useNavigate } from "react-router-dom"
import { formatDate } from "../../../../services/formatDate"
import { deleteCourse, fetchInstructorCourses,} from "../../../../services/operations/courseDetailsAPI"
import { COURSE_STATUS } from "../../../../utils/constants"
import ConfirmationModal from "../../../common/ConfirmationModal"
import { MdEdit } from "react-icons/md"

const CoursesTable = ({courses, setCourses}) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { token } = useSelector((state) => state.auth)
    const [loading, setLoading] = useState(false)
    const [confirmationModal, setConfirmationModal] = useState(null)
    const TRUNCATE_LENGTH = 30

    const handleCourseDelete = async (courseId) => {
        setLoading(true)
        await deleteCourse({ courseId: courseId }, token)
        const result = await fetchInstructorCourses(token)
        if (result) setCourses(result)
        
        setConfirmationModal(null)
        setLoading(false)
    }
    return (
        <div>
            <Table className="">
                <Thead >
                    <Tr className=''>
                        <Th className='flex-1 text-left text-sm font-medium uppercase text-richblack-50'>Courses</Th>
                        <Th className="text-left w-[12%] text-sm font-medium uppercase text-richblack-50">Duration</Th>
                        <Th className="text-left text-sm  font-medium uppercase text-richblack-50">Price</Th>
                        <Th className="text-left text-sm font-medium uppercase text-richblack-50">Actions</Th>
                    </Tr>
                </Thead>
                <Tbody className=''>
                    {
                        courses?.length === 0 ? (
                            <Tr>
                            <Td className="py-10 text-center text-2xl font-medium text-richblack-100">
                                No courses found
                                {/* TODO: Need to change this state */}
                            </Td>
                            </Tr>
                        ): (
                            courses.map((course) => (
                                <Tr key={course._id} className='bg-richblack-500 h-[200px] border-b-2 border-slate-500'>
                                    <Td className='flex w-12/12 p-4 gap-4'>
                                        <div className="w-4/12 h-[150px]"><img src={course?.thumbnail} alt={course?.courseName} className="object-fit rounded-lg w-full h-full" /></div>
                                        <div className="text-white w-8/12 flex flex-col justify-evenly">
                                            <p className="text-slate-200 text-xl">{course?.courseName}</p>
                                            <p className="text-richblack-50 text-sm">
                                                {
                                                    course.courseDescription.split(" ").length > TRUNCATE_LENGTH 
                                                        ? course.courseDescription.split(" ").slice(0, TRUNCATE_LENGTH).join(" ")+ "..."
                                                        : course.courseDescription
                                                }
                                            </p>
                                            <p className="text-sm text-richblack-100">Created : {formatDate(course.createdAt)}</p>
                                            <p className="flex text-richblack-900">
                                                {
                                                    course.status === COURSE_STATUS.DRAFT ? (
                                                        <p className="flex justify-center items-center bg-red-300 p-1 rounded-xl">
                                                            <HiClock size={14} /> Drafted
                                                        </p>
                                                    ): (
                                                        <p className="">
                                                            <div className="flex items-center justify-center gap-1 bg-pink-500 bg-opacity-60 p-1 rounded-xl">
                                                                <FaCheck size={12} /> Published
                                                            </div>
                                                            
                                                        </p>
                                                    )
                                                }
                                            </p>
                                        </div>
                                    </Td>
                                    <Td className="text-md font-medium text-richblack-100 w-1/12">2hr 30min</Td>
                                    <Td className="text-md font-medium text-richblack-100 w-1/12">$ {course.price}</Td>
                                    <Td className="text-md font-medium text-richblack-100 w-1/12">
                                        <button onClick={() => {navigate(`/dashboard/edit-course/${course._id}`)}}><MdEdit className="text-xl cursor-pointer"/></button>
                                        <button disabled={loading} title="Delete" className="ml-2 cursor-pointer"
                                            onClick={() => {
                                                setConfirmationModal({
                                                    text1: "Do you want to delete this course?", text2: "All the data related to this course will be deleted",
                                                    btn1Text: !loading ? "Delete": "Loading...", btn2Text: "Cancel", btn1Handler: !loading 
                                                        ? () => handleCourseDelete(course._id) : () => {}, btn2Handler : !loading 
                                                        ? () => setConfirmationModal(null) : () => {} 
                                                })
                                            }}
                                        ><RiDeleteBin6Line size={20} /></button>
                                    </Td>
                                </Tr>
                            
                            ))
                        )
                    }
                </Tbody>
            </Table>
            {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
        </div>
    )
}

export default CoursesTable
