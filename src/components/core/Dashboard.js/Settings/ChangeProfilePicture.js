import { useEffect, useRef, useState } from "react";
import { FiUpload } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";

import { updateDisplayPicture } from "../../../../services/operations/SettingsAPI";

const ChangeProfilePicture = () => {
    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile);
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);
    const [imageFile, setImageFile] = useState(null);
    const [previewSource, setPreviewSource] = useState(null);

    const fileInputRef = useRef(null);
    const handleClick = () => {
        fileInputRef.current.click();
    };
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            previewFile(file);
        }
    };
    const previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewSource(reader.result);
        };
    };
    const FileUploadhandler = () => {
        try {
            //     console.log("Uploading ...");
            setLoading(true);
            const formData = new FormData();
            formData.append("displayPicture", imageFile);
            dispatch(updateDisplayPicture(token, formData)).then(() => {
                setLoading(false);
            });
        } catch (err) {
            console.log("Error updatimg profile picture ...", err.message);
        }
    };
    useEffect(() => {
        if (imageFile) {
            previewFile(imageFile);
        }
    }, [imageFile]);

    return (
        <div data-aos="fade-right" data-aos-easing="ease-in-out" data-aos-duration="1000" className="flex bg-richblack-600 p-2 px-6 sm:px-2 rounded-2xl justify-between items-center">
            <div className="flex w-5/12 gap-4 sm:gap-0 items-center sm:w-full">
                <div className="w-[83px] h-[83px] overflow-hidden rounded-full border-zinc-800 flex items-center justify-center">
                    <img
                        src={previewSource || user?.image}
                        alt={`profile-${user?.firstName}`}
                        className="object-cover sm:rounded-full"
                    />
                </div>
                <div className="flex flex-col">
                    <h4 className="text-xl font-bold p-1 overflow-hidden text-white">
                        Change Profile Picture
                    </h4>
                    <div className="flex gap-4 sm:gap-2 h-[60%]">
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            className="hidden"
                            accept="image/png, image/gif, image/jpeg, image/jpg"
                        />
                        <button
                            onClick={handleClick}
                            disabled={loading}
                            className="px-3 py-1 bg-richblack-700 rounded-xl text-xl font-semibold text-richblack-200 hover:scale-95 duration-200"
                        >
                            Select
                        </button>
                        <button
                            onClick={FileUploadhandler}
                            className="text-black flex bg-yellow-400 bg-opacity-75 rounded-xl px-2 items-center font-semibold text-xl hover:scale-95 duration-200"
                        >
                            <span>Upload</span>
                            <FiUpload />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChangeProfilePicture;
