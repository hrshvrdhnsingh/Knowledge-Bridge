import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "../../../../services/operations/SettingsAPI";
const genders = ["Male", "Female", "Non-Binary", "Prefer not to say", "Other"];

const EditProfile = () => {
    const { user } = useSelector((state) => state.profile);
    const { token } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const submitProfileForm = async (data) => {
        try {
            dispatch(updateProfile(token, data));
        } catch (err) {
            console.log("Profile Updata Error : ", err.message);
        }
    };

    return (
        <div data-aos="fade-right" data-aos-easing="ease-in-out" data-aos-duration="1200" className="flex bg-richblack-600 p-2 px-6 sm:px-2 flex-col rounded-2xl justify-between">
            <h2 className="text-xl font-bold p-1 overflow-hidden text-white">
                Profile Information
            </h2>
            <form
                onSubmit={handleSubmit(submitProfileForm)}
                className="flex w-full flex-col justify-center items-center gap-3"
            >
                <div className="lg:flex-row flex-col flex w-11/12 justify-between">
                    <div className="flex flex-col w-[50%] sm:w-full">
                        <label
                            htmlFor="firstName"
                            className="text-zinc-900 text-xl sm:text-lg font-semibold overflow-hidden"
                        >
                            First Name
                        </label>
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            placeholder="Enter first name"
                            className=" cursor-text h-[40%] sm:text-base w-11/12 rounded-md border-richblack-300 bg-richblack-700 text-zinc-200 text-lg p-2"
                            {...register("firstName", { required: true })}
                        />
                        {errors.firstName && (
                            <span className="text-[12px] overflow-hidden text-slate-900">
                                Please enter your first name.
                            </span>
                        )}
                    </div>
                    <div className="flex flex-col w-[50%] sm:w-full">
                        <label
                            htmlFor="lastName"
                            className="text-zinc-900 text-xl sm:text-lg font-semibold overflow-hidden"
                        >
                            Last Name
                        </label>
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            placeholder="Enter last name"
                            className="cursor-text h-[40%] sm:text-base w-11/12 rounded-md border-richblack-300 bg-richblack-700 text-zinc-200 text-lg p-2"
                            {...register("lastName", { required: true })}
                        />
                        {errors.lastName && (
                            <span className="text-[12px] overflow-hidden text-slate-900">
                                Please enter your last name.
                            </span>
                        )}
                    </div>
                </div>
                <div className="lg:flex-row flex-col flex w-11/12">
                    <div className="flex flex-col w-[50%] sm:w-full">
                        <label
                            htmlFor="dateOfBirth"
                            className="text-zinc-900 text-xl sm:text-lg font-semibold overflow-hidden"
                        >
                            Date of Birth
                        </label>
                        <input
                            type="date"
                            id="dateOfBirth"
                            name="dateOfBirth"
                            placeholder=""
                            className="cursor-text h-[40%] sm:text-base w-11/12 rounded-md border-richblack-300 bg-richblack-700 text-zinc-200 text-lg p-2"
                            {...register("dateOfBirth", {
                                required: {
                                    value: true,
                                    message: "Please enter your data of birth",
                                },
                                max: {
                                    value: new Date().toISOString().split("T")[0],
                                    message: "Date of birth cannot be in the future.",
                                },
                            })}
                            defaultValue={user?.additionalDetails?.dateOfBirth}
                        />
                        {errors.dateOfBirth && (
                            <span className="text-[12px] overflow-hidden text-slate-900">
                                {errors.dateOfBirth.message}
                            </span>
                        )}
                    </div>
                    <div className="flex flex-col h-max w-[48%] sm:w-[98%]">
                        <label
                            htmlFor="gender"
                            className="text-zinc-900 text-xl sm:text-lg font-semibold overflow-hidden"
                        >
                            Gender
                        </label>
                        <select
                            type="text"
                            id="gender"
                            name="gender"
                            placeholder=""
                            className="cursor-pointer h-[40%] sm:text-base w-[100%] rounded-md border-richblack-300 bg-richblack-700 text-zinc-200 text-lg p-2"
                            {...register("gender", { required: true })}
                            defaultValue={user?.additionalDetails?.gender}
                        >
                            {genders.map((ele, i) => {
                                return (
                                    <option key={i} value={ele} className="">
                                        {ele}
                                    </option>
                                );
                            })}
                        </select>
                        {errors.gender && (
                            <span className="text-[12px] overflow-hidden text-slate-900">
                                Please enter your gender.
                            </span>
                        )}
                    </div>
                </div>
                <div className="lg:flex-row flex-col flex w-11/12 justify-between">
                    <div className="flex flex-col w-[50%] sm:w-full">
                        <label
                            htmlFor="contactNumber"
                            className="text-zinc-900 text-xl sm:text-lg font-semibold overflow-hidden"
                        >
                            Contact Number
                        </label>
                        <input
                            type="tel"
                            id="contactNumber"
                            name="contactNumber"
                            placeholder="Enter Contact Number"
                            className="cursor-text h-[40%] sm:text-base w-11/12 rounded-md border-richblack-00 bg-richblack-700 text-zinc-200 text-lg p-2"
                            {...register("contactNumber", {
                                required: {
                                    value: true,
                                    message: "Please enter your contact number.",
                                },
                                maxLength: { value: 12, message: "Invalid Contact Number" },
                                minLength: { value: 10, message: "Invalid Contact Number" },
                            })}
                            defaultValue={user?.additionalDetails?.contactNumber}
                        />
                        {errors.contactNumber && (
                            <span className="text-[12px] overflow-hidden text-slate-900">
                                {errors.contactNumber.message}
                            </span>
                        )}
                    </div>
                    <div className="flex flex-col w-[50%] sm:w-full">
                        <label
                            htmlFor="about"
                            className="text-zinc-900 text-xl sm:text-lg font-semibold overflow-hidden"
                        >
                            About
                        </label>
                        <input
                            type="text"
                            id="about"
                            name="about"
                            placeholder="Enter bio details"
                            className="cursor-text h-[40%] sm:text-base w-11/12 rounded-md border-richblack-300 bg-richblack-700 text-zinc-200 text-lg p-2"
                            {...register("about", { required: true })}
                            defaultValue={user?.additionalDetails?.about}
                        />
                        {errors.about && (
                            <span className="text-[12px] overflow-hidden text-slate-900">
                                Please enter your about.
                            </span>
                        )}
                    </div>
                </div>
                <div className="w-full flex p-2 gap-4 justify-end">
                    <button
                        onClick={() => {
                            navigate("/dashboard/my-profile");
                        }}
                        className="px-3 sm:text-lg py-1 bg-richblack-700 rounded-xl text-xl font-semibold text-richblack-200 hover:scale-95 duration-200"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="text-black flex bg-yellow-400 bg-opacity-75 sm:text-lg rounded-xl px-2 items-center font-semibold text-xl hover:scale-95 duration-200"
                    >
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditProfile;
