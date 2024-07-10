import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import {
    createSubSection,
    updateSubSection,
} from "../../../../../services/operations/courseDetailsAPI";
import { setCourse } from "../../../../../slices/courseSlice";
import Upload from "../Upload";

const SubSectionModal = ({ modalData, setModalData, add = false, view = false, edit = false }) => {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
        getValues,
    } = useForm();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const { token } = useSelector((state) => state.auth);
    const { course } = useSelector((state) => state.course);

    useEffect(() => {
        if (view || edit) {
            // console.log("modalData", modalData)
            setValue("lectureTitle", modalData.title);
            setValue("lectureDesc", modalData.description);
            setValue("lectureVideo", modalData.videoUrl);
        }
    }, [modalData, view, edit, setValue]);

    // detect whether form is updated or not
    const isFormUpdated = () => {
        const currentValues = getValues();
        // console.log("changes after editing form values:", currentValues)
        if (
            currentValues.lectureTitle !== modalData.title ||
            currentValues.lectureDesc !== modalData.description ||
            currentValues.lectureVideo !== modalData.videoUrl
        ) {
            return true;
        }
        return false;
    };

    // handle the editing of subsection
    const handleEditSubsection = async () => {
        const currentValues = getValues();
        // console.log("changes after editing form values:", currentValues)
        const formData = new FormData();
        // console.log("Values After Editing form values:", currentValues)
        formData.append("sectionId", modalData.sectionId);
        formData.append("subSectionId", modalData._id);
        if (currentValues.lectureTitle !== modalData.title) {
            formData.append("title", currentValues.lectureTitle);
        }
        if (currentValues.lectureDesc !== modalData.description) {
            formData.append("description", currentValues.lectureDesc);
        }
        if (currentValues.lectureVideo !== modalData.videoUrl) {
            formData.append("video", currentValues.lectureVideo);
        }
        setLoading(true);
        const result = await updateSubSection(formData, token);
        if (result) {
            // console.log("result", result)
            // update the structure of course
            const updatedCourseContent = course.courseContent.map((section) =>
                section._id === modalData.sectionId ? result : section
            );
            const updatedCourse = { ...course, courseContent: updatedCourseContent };
            dispatch(setCourse(updatedCourse));
        }
        setModalData(null);
        setLoading(false);
    };

    const onSubmit = async (data) => {
        // console.log(data)
        if (view) return;
        if (edit) {
            if (!isFormUpdated()) {
                toast.error("No changes made to the form");
            } else {
                handleEditSubsection();
            }
            return;
        }

        const formData = new FormData();
        formData.append("sectionID", modalData);
        formData.append("title", data.lectureTitle);
        formData.append("description", data.lectureDesc);
        formData.append("video", data.lectureVideo);
        setLoading(true);
        const result = await createSubSection(formData, token);
        if (result) {
            // update the structure of course
            //     console.log("Course ->", course);
            //     console.log("result ->", result);
            const updatedCourseContent = course.courseContent.map((section) =>
                section._id === modalData ? result : section
            );
            const updatedCourse = { ...course, courseContent: updatedCourseContent };
            dispatch(setCourse(updatedCourse));
        }
        setModalData(null);
        setLoading(false);
    };

    return (
        <div className="w-screen fixed left-0 top-0 h-screen z-[999999] bg-richblack-200 bg-opacity-50 flex justify-center items-center">
            <div className="modal w-[40vw] sm:w-[80vw] h-max flex flex-col rounded-3xl border-slate-300 border-[2px] gap-3 p-3 bg-richblack-700 justify-center">
                {/* Modal Header */}
                <div className="w-full flex justify-between">
                    <p className="text-xl sm:text-lg font-semibold text-zinc-300">
                        {view && "Viewing"} {add && "Adding"} {edit && "Editing"}
                    </p>
                    <button onClick={() => (!loading ? setModalData(null) : null)}>
                        <RxCross2 className="text-2xl" />
                    </button>
                </div>
                {/* Modal Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
                    {/* Lecture Video Upload */}
                    <Upload
                        name="lectureVideo"
                        label="Lecture Video"
                        register={register}
                        setValue={setValue}
                        errors={errors}
                        video={true}
                        viewData={view ? modalData.videoUrl : null}
                        editData={edit ? modalData.videoUrl : null}
                    />
                    {/* Lecture Title */}
                    <div className="flex flex-col">
                        <label
                            htmlFor="lectureTitle"
                            className="flex gap-2 sm:text-base h-[37%] text-zinc-400 text-xl font-semibold"
                        >
                            Lecture Title {!view && <span className="text-pink-500">*</span>}
                        </label>
                        <input
                            disabled={view || loading}
                            id="lectureTitle"
                            placeholder="Enter lecture title"
                            {...register("lectureTitle", { required: true })}
                            className="w-full sm:w-11/12 cursor-text sm:text-base sm:p-1 h-[40%] rounded-md border-richblack-300 bg-richblack-500 text-zinc-200 text-lg p-2"
                        />
                        {errors.lectureTitle && <span className="">Lecture Title is required</span>}
                    </div>
                    {/* Lecture Description */}
                    <div className="flex flex-col">
                        <label
                            htmlFor="lectureDesc"
                            className="flex gap-1 sm:text-base h-[35%] text-zinc-400 text-xl font-semibold"
                        >
                            Lecture Description {!view && <span className="text-pink-500">*</span>}
                        </label>
                        <input
                            disabled={view || loading}
                            id="lectureDesc"
                            placeholder="Enter lecture description"
                            {...register("lectureDesc", { required: true })}
                            className="w-full sm:w-11/12 cursor-text sm:text-base sm:p-1 h-[40%] rounded-md border-richblack-300 bg-richblack-500 text-zinc-200 text-lg p-2"
                        />
                        {errors.lectureDesc && (
                            <span className="">Lecture Description is required</span>
                        )}
                    </div>
                    {!view && (
                        <div className="">
                            <button
                                disabled={loading}
                                className="w-max p-1 px-2 bg-yellow-500 font-semibold rounded-xl"
                            >{`${loading ? "Loading" : edit ? "Save Changes" : "Save"}`}</button>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default SubSectionModal;
