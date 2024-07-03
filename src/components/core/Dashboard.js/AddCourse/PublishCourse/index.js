import React from "react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { editCourseDetails } from "../../../../../services/operations/courseDetailsAPI";
import { resetCourseState, setStep } from "../../../../../slices/courseSlice";
import { COURSE_STATUS } from "../../../../../utils/constants";

const PublishCourse = () => {
    const { register, handleSubmit, setValue, getValues } = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { token } = useSelector((state) => state.auth);
    const { course } = useSelector((state) => state.course);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (course?.status === COURSE_STATUS.PUBLISHED) {
            setValue("public", true);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const goBack = () => {
        dispatch(setStep(2));
    };

    const goToCourses = () => {
        dispatch(resetCourseState());
        navigate("/dashboard/my-courses");
    };

    const handleCoursePublish = async () => {
        // check if form has been updated or not
        if (
            (course?.status === COURSE_STATUS.PUBLISHED && getValues("public") === true) ||
            (course?.status === COURSE_STATUS.DRAFT && getValues("public") === false)
        ) {
            // form has not been updated
            // no need to make api call
            goToCourses();
            return;
        }
        const formData = new FormData();
        formData.append("courseId", course._id);
        const courseStatus = getValues("public") ? COURSE_STATUS.PUBLISHED : COURSE_STATUS.DRAFT;

        formData.append("status", courseStatus);
        setLoading(true);
        const result = await editCourseDetails(formData, token);
        if (result) {
            goToCourses();
        }
        setLoading(false);
    };

    const onSubmit = (data) => {
        // console.log(data)
        handleCoursePublish();
    };
    return (
        <div className="rounded-xl mt-8">
            <p className="text-3xl font-bold text-white p-2">Publish Settings</p>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
                <div className="text-white flex">
                    <label htmlFor="public" className="flex items-center text-lg">
                        <input
                            type="checkbox"
                            id="public"
                            {...register("public")}
                            className="border-gray-300 bg-richblack-200 text-4xl cursor-pointer h-[20px] w-[20px] checked:bg-yellow-300 checked:border-transparent rounded-md text-white"
                        />
                        <span className="text-zinc-400 px-4">Make this course as public.</span>
                    </label>
                </div>
                <div className="flex gap-4">
                    <button
                        disabled={loading}
                        type="button"
                        onClick={goBack}
                        className="bg-richblack-700 cursor-pointer text-white p-2 rounded-lg"
                    >
                        Back
                    </button>
                    <button
                        disabled={loading}
                        type="submit"
                        className="bg-yellow-300 text-black p-2 rounded-lg cursor-pointer"
                    >
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PublishCourse;
