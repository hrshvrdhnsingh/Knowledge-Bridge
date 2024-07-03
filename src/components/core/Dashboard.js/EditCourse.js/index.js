import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { getFullDetailsOfCourse,} from "../../../../services/operations/courseDetailsAPI"
import { setCourse, setEditCourse } from "../../../../slices/courseSlice"
import RenderSteps from "../AddCourse/RenderSteps"
import Sidebar from '../Sidebar'
const EditCourse = () => {
    const dispatch = useDispatch()
    const { courseId } = useParams()
    const { course } = useSelector((state) => state.course)
    const [loading, setLoading] = useState(false)
    const { token } = useSelector((state) => state.auth)

    useEffect(() => {
        (async () => {
        setLoading(true)
        const result = await getFullDetailsOfCourse(courseId, token)
        if (result?.courseDetails) {
            dispatch(setEditCourse(true))
            dispatch(setCourse(result?.courseDetails))
        }
        setLoading(false)
        })()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

  if (loading) {
    return (
      <div className="grid flex-1 place-items-center">
        <div className="spinner"></div>
      </div>
    )
  }
    return (
        <div className="w-screen flex flex-col mt-[19vh] items-center">
            <Sidebar />
            <div className="">
                <h1 className="text-4xl font-bold text-white p-2 ">Edit Course</h1>
                <div className="">
                    {
                        course ? (<RenderSteps />) : (
                            <p className="text-zinc-500 text-xl">Course not found</p>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default EditCourse
