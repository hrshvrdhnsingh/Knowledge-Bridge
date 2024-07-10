import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { RxCross2 } from "react-icons/rx";
import ReactStars from "react-rating-stars-component";
import { useSelector } from "react-redux";
import { createRating } from "../../../services/operations/courseDetailsAPI";
import { FaRegStar, FaStarHalf } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";

const CourseViewModal = ({ setReviewModal }) => {
    const { user } = useSelector((state) => state.profile);
    const { token } = useSelector((state) => state.auth);
    const { courseEntireData } = useSelector((state) => state.viewCourse);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        setValue("courseExperience", "");
        setValue("courseRating", 0);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const ratingChanged = (newRating) => {
        // console.log(newRating)
        setValue("courseRating", newRating);
    };

    const onSubmit = async (data) => {
        await createRating(
            {
                courseId: courseEntireData[0]._id,
                rating: data.courseRating,
                review: data.courseExperience,
            },
            token
        );
        setReviewModal(false);
    };

    return (
        <div className="w-screen fixed left-0 top-0 h-screen z-[999999] bg-richblack-200 bg-opacity-50 flex justify-center items-center">
            <div className="modal sm:w-[80vw] w-[40vw] h-max flex flex-col rounded-3xl border-slate-300 border-[2px] gap-3 p-3 bg-richblack-700 justify-center">
                {/**Modal Header */}
                <div className="px-2 text-xl flex justify-between text-slate-300">
                    <p>Add Review</p>
                    <button onClick={() => setReviewModal(false)}>
                        <RxCross2 className="" />
                    </button>
                </div>
                {/**Modal body */}
                <div className="">
                    <div className="flex justify-center items-center gap-3">
                        <div className="rounded-full w-[10%]">
                            <img
                                src={user?.image}
                                alt={user?.firstName + "profile"}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="text-zinc-400">
                            <p className="text-lg">
                                {user?.firstName} {user?.lastName}
                            </p>
                            <p>Posting publicly</p>
                        </div>
                    </div>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="w-full flex flex-col justify-center items-center gap-3"
                    >
                        <ReactStars
                            count={5}
                            size={36}
                            isHalf={true}
                            activeColor={"#ffd700"}
                            onChange={ratingChanged}
                            className=""
                            emptyIcon={<FaRegStar />}
                            halfIcon={<FaStarHalf />}
                            fullIcon={<FaStar />}
                        />
                        <div className="flex flex-col w-9/12 sm:w-full">
                            <label
                                className="flex gap-1 h-[35%] text-zinc-400 text-lg font-medium"
                                htmlFor="courseExperience"
                            >
                                Add your experience <span className="text-pink-500">*</span>
                            </label>
                            <textarea
                                id="courseExperience"
                                placeholder="Add your experience"
                                {...register("courseExperience", { required: true })}
                                className=" w-full cursor-text h-[40%] rounded-md border-richblack-300 bg-richblack-500 text-zinc-200 p-2"
                            />
                            {errors.courseExperience && (
                                <span className="text-pink-200">Please add your experience</span>
                            )}
                        </div>
                        <div className="flex gap-4">
                            <button
                                onClick={() => setReviewModal(false)}
                                className="bg-richblack-500 p-2 rounded-xl transition-all cursor-pointer duration-500 font-medium hover:scale-95"
                            >
                                Cancel
                            </button>
                            <button className="p-2 bg-yellow-400 rounded-xl transition-all duration-500 font-medium hover:scale-95 cursor-pointer">
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CourseViewModal;
