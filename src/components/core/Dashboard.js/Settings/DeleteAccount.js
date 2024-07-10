import React from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteProfile } from "../../../../services/operations/SettingsAPI";

const DeleteAccount = () => {
    const { token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    async function handleDeleteAccount() {
        try {
            dispatch(deleteProfile(token, navigate));
        } catch (err) {
            console.log("Delete Account Error : ", err);
        }
    }
    return (
        <div data-aos="fade-right" data-aos-easing="ease-in-out" data-aos-duration="1800" className="flex bg-red-600 bg-opacity-60 p-4 px-6 sm:px-2 gap-4 sm:gap-0 rounded-2xl">
            <div className="w-[10%] flex justify-center items-center sm:items-start sm:w-[25%]">
                <div className="bg-red-500 bg-opacity-80 rounded-full flex justify-center items-center p-4">
                    <RiDeleteBin6Line className="text-red-800 text-4xl" />
                </div>
            </div>
            <div className="w-[50%] flex flex-col gap-2 sm:w-[74%]">
                <h2 className="text-2xl font-bold p-1 overflow-hidden text-white">
                    Delete Account
                </h2>
                <div className="text-zinc-300">
                    <p>Would you like to delete your account ?</p>
                    <p>
                        This account may contain paid courses. Deleting your account is permanent
                        and will remove all the content associated with it.
                    </p>
                </div>
                <span
                    className="italic text-xl sm:text-base cursor-pointer text-rose-500"
                    onClick={handleDeleteAccount}
                >
                    I want to delete my account
                </span>
            </div>
        </div>
    );
};

export default DeleteAccount;
