import { useEffect, useRef, useState } from "react";
import { FiUploadCloud } from "react-icons/fi";
import "video-react/dist/video-react.css";
import { Player } from "video-react";

const Upload = ({
    name,
    label,
    register,
    setValue,
    errors,
    video = false,
    viewData = null,
    editData = null,
}) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewSource, setPreviewSource] = useState(viewData || editData || "");
    const inputRef = useRef(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
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

    useEffect(() => {
        register(name, { required: true });
    }, [register, name]);

    useEffect(() => {
        setValue(name, selectedFile);
    }, [selectedFile, setValue, name]);

    return (
        <div className="flex flex-col w-full border rounded-2xl overflow-hidden">
            <label className="px-4 py-2 text-zinc-400 text-xl sm:text-base font-semibold">
                {label} {!viewData && <sup className="text-pink-500">*</sup>}
            </label>
            <input
                type="file"
                accept={!video ? ".jpeg,.jpg,.png" : ".mp4"}
                ref={inputRef}
                onChange={handleFileChange}
                className="hidden"
            />
            <div
                className={`flex flex-col items-center justify-center bg-richblack-500 p-4 cursor-pointer h-60 sm:w-[95%]`}
                onClick={() => inputRef.current && inputRef.current.click()}
            >
                {previewSource ? (
                    <>
                        {video ? (
                            <div className="w-full aspect-video relative overflow-hidden rounded-2xl">
                                <Player
                                    playsInline
                                    src={previewSource}
                                    className="absolute inset-0 w-full h-full object-cover"
                                />
                            </div>
                        ) : (
                            <div className="w-full aspect-video relative overflow-hidden rounded-xl">
                                <img
                                    src={previewSource}
                                    alt="Preview"
                                    className="absolute inset-0 w-full h-full object-cover"
                                />
                            </div>
                        )}
                        {!viewData && (
                            <button
                                type="button"
                                className="mt-4 p-2 bg-yellow-400 rounded-xl hover:scale-95 transition-transform"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setPreviewSource("");
                                    setSelectedFile(null);
                                    setValue(name, null);
                                }}
                            >
                                Cancel
                            </button>
                        )}
                    </>
                ) : (
                    <>
                        <div className="rounded-full p-4 bg-richblack-400">
                            <FiUploadCloud className="text-4xl text-richblack-200" />
                        </div>
                        <p className="mt-2 text-richblack-200 text-center">
                            Drag and drop or click to select an
                            {video ? " video" : " image"}.
                        </p>
                        <ul className="flex justify-between gap-8 sm:text-sm text-richblack-300 mt-2">
                            <li>Aspect Ratio 16:9</li>
                            <li>Recommended size 1024x576</li>
                        </ul>
                    </>
                )}
            </div>
            {errors[name] && <span className="px-4 py-2 text-pink-500">{label} is required</span>}
        </div>
    );
};

export default Upload;
