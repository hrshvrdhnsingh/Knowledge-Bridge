import { FaCheck } from "react-icons/fa";
import { useSelector } from "react-redux";
import CourseBuilderForm from "./CourseBuilder.js/CourseBuilderForm";
import CourseInformationForm from "./CourseInformation/CourseInformationForm";
import PublishCourse from "./PublishCourse";

const RenderSteps = () => {
    const { step } = useSelector((state) => state.course);
    const steps = [
        {
            id: 1,
            title: "Information",
        },
        {
            id: 2,
            title: "Builder",
        },
        {
            id: 3,
            title: "Publish",
        },
    ];

    return (
        <>
            <div className="relative flex w-full justify-evenly">
                {steps.map((item) => (
                    <div key={item.id}>
                        <div className="flex flex-col items-center" key={item.id}>
                            <button
                                className={`${
                                    step === item.id
                                        ? "border-yellow-50 bg-yellow-900 bg-opacity-85 text-yellow-50"
                                        : "border-richblack-700 bg-richblack-800 text-richblack-300"
                                } rounded-full h-[40px] w-[40px] flex justify-center items-center`}
                            >
                                {step > item.id ? <FaCheck className="font-bold" /> : item.id}
                            </button>
                        </div>
                        {item.id !== step.length && (
                            <div>
                                <div
                                    className={`${
                                        step > step.id
                                            ? "border-yellow-100"
                                            : "border-richblack-500"
                                    }`}
                                ></div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <div className="sm:hidden relative flex w-full gap-24 justify-center">
                {steps.map((item) => (
                    <div key={item.id}>
                        <div className="">
                            <p
                                className={`${
                                    step >= step.id ? "text-richblack-50" : "text-richblack-500"
                                }`}
                            >
                                {item.title}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
            {/* Render specific component based on current step */}
            {step === 1 && <CourseInformationForm />}
            {step === 2 && <CourseBuilderForm />}
            {step === 3 && <PublishCourse />}
        </>
    );
};

export default RenderSteps;
