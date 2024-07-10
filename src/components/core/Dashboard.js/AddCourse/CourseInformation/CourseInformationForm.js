import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { HiOutlineCurrencyRupee } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import {
    addCourseDetails,
    editCourseDetails,
    fetchCourseCategories,
} from "../../../../../services/operations/courseDetailsAPI";
import { setCourse, setStep } from "../../../../../slices/courseSlice";
import { COURSE_STATUS } from "../../../../../utils/constants";
import Upload from "../Upload";
import ChipInput from "./ChipInput";
import RequirementsField from "./RequirementsField";

const CourseInformationForm = () => {
    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState: { errors },
    } = useForm();
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.auth);
    const { course, editCourse } = useSelector((state) => state.course);
    const [loading, setLoading] = useState(false);
    const [courseCategories, setCourseCategories] = useState([]);

    useEffect(() => {
        const getCategories = async () => {
            setLoading(true);
            const categories = await fetchCourseCategories();
            if (categories?.length > 0) {
                //     console.log("categories", categories);
                setCourseCategories(categories);
            }
            setLoading(false);
        };
        // if form is in edit mode
        if (editCourse) {
            // console.log("data populated", editCourse)
            setValue("courseTitle", course.courseName);
            setValue("courseShortDesc", course.courseDescription);
            setValue("coursePrice", course.price);
            setValue("courseTags", course.tag);
            setValue("courseBenefits", course.whatYouWillLearn);
            setValue("courseCategory", course.category);
            setValue("courseRequirements", course.instructions);
            setValue("courseImage", course.thumbnail);
        }
        getCategories();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const isFormUpdated = () => {
        const currentValues = getValues();
        // console.log("changes after editing form values:", currentValues)
        if (
            currentValues.courseTitle !== course.courseName ||
            currentValues.courseShortDesc !== course.courseDescription ||
            currentValues.coursePrice !== course.price ||
            currentValues.courseTags.toString() !== course.tag.toString() ||
            currentValues.courseBenefits !== course.whatYouWillLearn ||
            currentValues.courseCategory._id !== course.category._id ||
            currentValues.courseRequirements.toString() !== course.instructions.toString() ||
            currentValues.courseImage !== course.thumbnail
        ) {
            return true;
        }
        return false;
    };

    //   handle next button click
    const onSubmit = async (data) => {
        // console.log(data)

        if (editCourse) {
            // const currentValues = getValues()
            // console.log("changes after editing form values:", currentValues)
            // console.log("now course:", course)
            // console.log("Has Form Changed:", isFormUpdated())
            if (isFormUpdated()) {
                const currentValues = getValues();
                const formData = new FormData();
                // console.log(data)
                formData.append("courseId", course._id);
                if (currentValues.courseTitle !== course.courseName) {
                    formData.append("courseName", data.courseTitle);
                }
                if (currentValues.courseShortDesc !== course.courseDescription) {
                    formData.append("courseDescription", data.courseShortDesc);
                }
                if (currentValues.coursePrice !== course.price) {
                    formData.append("price", data.coursePrice);
                }
                if (currentValues.courseTags.toString() !== course.tag.toString()) {
                    formData.append("tag", JSON.stringify(data.courseTags));
                }
                if (currentValues.courseBenefits !== course.whatYouWillLearn) {
                    formData.append("whatYouWillLearn", data.courseBenefits);
                }
                if (currentValues.courseCategory._id !== course.category._id) {
                    formData.append("category", data.courseCategory);
                }
                if (
                    currentValues.courseRequirements.toString() !== course.instructions.toString()
                ) {
                    formData.append("instructions", JSON.stringify(data.courseRequirements));
                }
                if (currentValues.courseImage !== course.thumbnail) {
                    formData.append("thumbnailImage", data.courseImage);
                }
                // console.log("Edit Form data: ", formData)
                setLoading(true);
                const result = await editCourseDetails(formData, token);
                setLoading(false);
                if (result) {
                    dispatch(setStep(2));
                    dispatch(setCourse(result));
                }
            } else {
                toast.error("No changes made to the form");
            }
            return;
        }

        const formData = new FormData();
        formData.append("courseName", data.courseTitle);
        formData.append("courseDescription", data.courseShortDesc);
        formData.append("price", data.coursePrice);
        formData.append("tag", JSON.stringify(data.courseTags));
        formData.append("whatYouWillLearn", data.courseBenefits);
        formData.append("category", data.courseCategory);
        formData.append("status", COURSE_STATUS.DRAFT);
        formData.append("instructions", JSON.stringify(data.courseRequirements));
        formData.append("thumbnailImage", data.courseImage);
        setLoading(true);
        const result = await addCourseDetails(formData, token);
        if (result) {
            dispatch(setStep(2));
            dispatch(setCourse(result));
        }
        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="sm:ml-2 flex flex-col gap-3 mt-8">
            {/* Course Title */}
            <div className="flex flex-col">
                <label
                    htmlFor="courseTitle"
                    className="flex flex-col sm:text-base gap-2 h-[35%] text-zinc-400 text-xl font-semibold"
                >
                    Course Title <sup className="text-pink-500">*</sup>
                </label>
                <input
                    id="courseTitle"
                    placeholder="Enter course title"
                    {...register("courseTitle", { required: true })}
                    className="w-full sm:w-11/12 cursor-text sm:text-base sm:p-1 h-[40%] rounded-md border-richblack-300 bg-richblack-500 text-zinc-200 text-lg p-2"
                />
                {errors.courseTitle && <span className="">Course Title is required</span>}
            </div>
            {/* Course Short Description */}
            <div className="flex flex-col">
                <label
                    htmlFor="courseShortDesc"
                    className="flex flex-col  sm:text-base gap-2 h-[35%] text-zinc-400 text-xl font-semibold"
                >
                    Course Short Description <sup className="text-pink-500">*</sup>
                </label>
                <textarea
                    id="courseShortDesc"
                    placeholder="Enter descritpion"
                    {...register("courseShortDesc", { required: true })}
                    className="w-full sm:w-11/12 cursor-text sm:text-base sm:p-1 h-[40%] rounded-md border-richblack-300 bg-richblack-500 text-zinc-200 text-lg p-2"
                />
                {errors.courseShortDesc && <span className="">Course Description is required</span>}
            </div>
            {/* Course Price */}
            <div className="flex flex-col">
                <label
                    htmlFor="coursePrice"
                    className="flex flex-col sm:text-base  gap-2 h-[35%] text-zinc-400 text-xl font-semibold"
                >
                    Course Price <sup className="text-pink-500">*</sup>
                </label>
                <div className="relative">
                    <input
                        id="coursePrice"
                        placeholder="Enter Course Price"
                        {...register("coursePrice", {
                            required: true,
                            valueAsNumber: true,
                            pattern: { value: /^(0|[1-9]\d*)(\.\d{1,2})?$/ },
                        })}
                        className="w-full sm:w-11/12 cursor-text sm:text-base sm:p-1 h-[40%] rounded-md border-richblack-300 bg-richblack-500 text-zinc-200 text-lg p-2"
                    />
                    <HiOutlineCurrencyRupee className="absolute right-3 top-1/2 inline-block -translate-y-1/2 text-3xl text-zinc-800" />
                </div>
                {errors.courseShortDesc && <span className="">Course Description is required</span>}
            </div>
            {/* Course Category */}
            <div className="flex flex-col">
                <label
                    htmlFor="courseCategory"
                    className="flex flex-col  sm:text-base gap-2 h-[35%] text-zinc-400 text-xl font-semibold"
                >
                    Course Category <sup className="text-pink-500">*</sup>
                </label>
                <select
                    id="courseCategory"
                    {...register("courseCategory", { required: true })}
                    defaultValue=""
                    className="w-full sm:w-11/12 cursor-text sm:text-base sm:p-1 h-[40%] rounded-md border-richblack-300 bg-richblack-500 text-zinc-200 text-lg p-2"
                >
                    <option value="" disabled>
                        Choose a category
                    </option>
                    {!loading &&
                        courseCategories?.map((category, index) => (
                            <option key={index} value={category._id}>
                                {category?.name}
                            </option>
                        ))}
                </select>
                {errors.courseCategory && <span className="">Course Category is required</span>}
            </div>
            {/* Course Tags */}
            <ChipInput
                label="Tags"
                name="courseTags"
                placeholder="Enter Tags and press Enter"
                register={register}
                errors={errors}
                setValue={setValue}
                getValues={getValues}
            />
            {/* Course Thumbnail Image */}
            <Upload
                name="courseImage"
                label="Course Thumbnail"
                register={register}
                setValue={setValue}
                errors={errors}
                editData={editCourse ? course?.thumbnail : null}
            />
            {/* Benefits of the course */}
            <div className="flex flex-col">
                <label
                    htmlFor="courseBenefits"
                    className="h-[35%] sm:text-base  text-zinc-400 text-xl font-semibold"
                >
                    Benefits of the course <sup className="text-pink-500">*</sup>
                </label>
                <textarea
                    id="courseBenefits"
                    placeholder="Enter benefits of the course"
                    {...register("courseBenefits", { required: true })}
                    className="w-full sm:w-11/12 cursor-text sm:text-base sm:p-1 h-[40%] rounded-md border-richblack-300 bg-richblack-500 text-zinc-200 text-lg p-2"
                />
                {errors.courseBenefits && <span className="">Course Benefits is required</span>}
            </div>
            {/* Requirements/Instructions */}
            <RequirementsField
                name="courseRequirements"
                label="Requirements/Instructions"
                register={register}
                setValue={setValue}
                errors={errors}
                getValues={getValues}
            />
            {/* Next Button */}
            <div className="flex justify-end gap-4 ">
                {editCourse && (
                    <button
                        onClick={() => dispatch(setStep(2))}
                        disabled={loading}
                        className={`rounded-xl flex cursor-pointer text-white bg-zinc-600 p-3`}
                    >
                        Continue without saving
                    </button>
                )}
                <button
                    className="cursor-pointer hover:scale-95 transition-200 text-white rounded-xl px-5 flex-row bg-zinc-600 p-3 border"
                    disabled={loading}
                >
                    {!editCourse ? `Next >` : "Save Changes"}
                </button>
            </div>
        </form>
    );
};

export default CourseInformationForm;
