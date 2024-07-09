import React from "react"
import copy from "copy-to-clipboard"
import { toast } from "react-hot-toast"
import { BsFillCaretRightFill } from "react-icons/bs"
import { FaShareSquare } from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { addToCart } from "../../../slices/cartSlice"
import { ACCOUNT_TYPE } from "../../../utils/constants"

const CourseDetailsCard = ({course, setConfirmationModal, handleBuyCourse}) => {
    const { user } = useSelector((state) => state.profile)
    const { token } = useSelector((state) => state.auth)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {
        thumbnail: ThumbnailImage,
        price: CurrentPrice,
        // eslint-disable-next-line no-unused-vars
        _id: courseId,
    } = course
    
    const handleShare = () => {
        copy(window.location.href)
        toast.success("Link copied to clipboard")
    }
    
    const handleAddToCart = () => {
        if (user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
            toast.error("Instructor can't buy a course.")
            return;
        }
        if (token) {
            dispatch(addToCart(course))
            return;
        }
        setConfirmationModal({
            text1: "You are not logged in!",
            text2: "Please login to add To Cart",
            btn1Text: "Login",
            btn2Text: "Cancel",
            btn1Handler: () => navigate("/login"),
            btn2Handler: () => setConfirmationModal(null),
        })
    }

    return (
        <div className="flex flex-col h-max p-2 w-[30vw] sm:w-[100%] bg-richblack-600 bg-opacity-80 rounded-2xl">
            {/**Image-part */}
            <div className="w-full h-7/12"><img src={ThumbnailImage} alt="course-thumbnail" className="object-cover rounded-2xl h-full w-full" /></div>
            {/**Details part */}
            <div className=" p-2 flex flex-col gap-2">
                <p className="text-3xl text-white font-bold py-1">Rs. {CurrentPrice}</p>
                <div className="flex flex-col gap-4 w-full font-bold text-xl ">
                    <button className="bg-yellow-400 flex p-2 rounded-xl hover:scale-[99%] items-center cursor-pointer justify-center transition-[1s]" onClick={
                        user && course?.studentsEnrolled.includes(user?._id)? () => navigate("/dashboard/enrolled-courses") : handleBuyCourse
                    }>
                        {user && course?.studentsEnrolled.includes(user?._id)?"Go to Course":"Buy Now"}
                    </button>
                    {(!user || !course?.studentsEnrolled.includes(user?._id)) && (
                        <button onClick={handleAddToCart} className="cursor-pointer bg-richblack-400 flex p-2 rounded-xl hover:scale-[99%] items-center justify-center">Add to Cart</button>
                    )}
                </div>
                <div className="w-full text-center text-zinc-400"><p>30-Day Money-Back Guarantee</p></div>
                <div className="">
                    <p className="text-xl font-semibold text-slate-500">This course includes :</p>
                    <div>
                        {course?.instructions?.map((item, index) => (
                            <p key={index} className="flex items-center text-cyan-400 font-medium">
                                <BsFillCaretRightFill />
                                <span>{item}</span>
                            </p>
                        ))}
                    </div>
                </div>
                <div className="flex items-end justify-end ">
                    <button className="flex items-center gap-2 font-medium hover:scale-95 transition-[1s] bg-yellow-400 p-2 rounded-xl cursor-pointer" onClick={handleShare}><FaShareSquare size={15} />Share</button>
                </div>
            </div>
        </div>
        
    )
}

export default CourseDetailsCard
