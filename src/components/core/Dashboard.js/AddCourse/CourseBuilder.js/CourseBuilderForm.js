import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { createSection, updateSection } from "../../../../../services/operations/courseDetailsAPI";
import { setCourse, setEditCourse, setStep } from "../../../../../slices/courseSlice";
import NestedView from "./NestedView";

export default function CourseBuilderForm() {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();
    const { course } = useSelector((state) => state.course);
    const { token } = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(false);
    const [editSectionName, setEditSectionName] = useState(null);
    const dispatch = useDispatch();

    const onSubmit = async (data) => {
        setLoading(true);
        let result;
        if (editSectionName) {
            result = await updateSection(
                {
                    sectionName: data.sectionName,
                    sectionID: editSectionName,
                    courseId: course._id,
                },
                token
            );
        } else {
            //     console.log("Course here -> ", course);
            result = await createSection(
                {
                    sectionName: data.sectionName,
                    courseID: course._id,
                },
                token
            );
        }
        if (result) {
            //     console.log("Result --", result);
            dispatch(setCourse(result));
            setEditSectionName(null);
            setValue("sectionName", "");
            //     console.log("Course -", course);
        }
        setLoading(false);
    };

    const handleChangeEditSectionName = (sectionId, sectionName) => {
        if (editSectionName === sectionId) {
            cancelEdit();
            return;
        }
        setEditSectionName(sectionId);
        setValue("sectionName", sectionName);
    };

    const goToNext = () => {
        if (course?.courseContent?.length === 0) {
            toast.error("Please add atleast one section");
            return;
        }
        if (course?.courseContent?.some((section) => section?.subSection?.length === 0)) {
            toast.error("Please add atleast one lecture in each section");
            return;
        }
        dispatch(setStep(3));
    };

    const cancelEdit = () => {
        setEditSectionName(null);
        setValue("sectionName", "");
    };

    const goBack = () => {
        dispatch(setStep(1));
        dispatch(setEditCourse(true));
    };

    return (
        <div className="h-max mt-8 flex flex-col gap-4">
            <p className="text-white text-2xl font-bold">Course Builder</p>
            <form className="" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col mt-2">
                    <label
                        htmlFor="sectionName"
                        className="flex flex-col sm:text-base gap-2 h-[35%] text-zinc-400 text-xl font-semibold"
                    >
                        Section Name <sup className="text-pink-500">*</sup>
                    </label>
                    <input
                        id="sectionName"
                        disabled={loading}
                        placeholder="Add a section to build your course"
                        {...register("sectionName", { required: true })}
                        className="w-full sm:w-11/12 cursor-text sm:text-base sm:p-1 h-[40%] rounded-md border-richblack-300 bg-richblack-500 text-zinc-200 text-lg p-2"
                    />
                    {errors.sectionName && <span className="">Section Name is required</span>}
                </div>
                <div className="flex p-2">
                    <button
                        type="submit"
                        className="text-yellow-500 font-semibold text-lg outline-dashed rounded-lg border-yellow-300 p-2 cursor-pointer"
                    >
                        {editSectionName ? "Edit Section name" : "Create Section"}
                    </button>
                    {editSectionName && (
                        <button
                            type="button"
                            onClick={cancelEdit}
                            className="text-slate-400 underline"
                        >
                            Cancel Edit
                        </button>
                    )}
                </div>
            </form>
            {course?.courseContent?.length > 0 && (
                <NestedView handleChangeEditSectionName={handleChangeEditSectionName} />
            )}
            <div className="flex gap-3 ml-2">
                <button
                    onClick={goBack}
                    className="bg-yellow-300 text-black p-2 rounded-lg cursor-pointer"
                >
                    Back
                </button>
                <button
                    disabled={loading}
                    onClick={goToNext}
                    className="bg-richblack-700 cursor-pointer text-white p-2 rounded-lg"
                >
                    Next {`>`}
                </button>
            </div>
        </div>
    );
}
