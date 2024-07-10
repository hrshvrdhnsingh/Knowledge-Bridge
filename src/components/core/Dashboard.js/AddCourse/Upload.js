/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FiUploadCloud } from "react-icons/fi";
import { useSelector } from "react-redux";
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
    const { course } = useSelector((state) => state.course);
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewSource, setPreviewSource] = useState(
        viewData ? viewData : editData ? editData : ""
    );
    const inputRef = useRef(null);

    const onDrop = (acceptedFiles) => {
        const file = acceptedFiles[0];
        if (file) {
            previewFile(file);
            setSelectedFile(file);
        }
    };

    const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
        accept: !video ? { "image/*": [".jpeg", ".jpg", ".png"] } : { "video/*": [".mp4"] },
        onDrop,
    });

    const previewFile = (file) => {
        // console.log(file)
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewSource(reader.result);
        };
    };

    useEffect(() => {
        register(name, { required: true });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [register, name]);

    useEffect(() => {
        setValue(name, selectedFile);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedFile, setValue, name]);

    return (
        <div className="flex flex-col">
            <label className="h-[35%] text-zinc-400 text-xl sm:text-base font-semibold">
                {label} {!viewData && <sup className="text-pink-500">*</sup>}
            </label>
            <div
                className={`${
                    isDragActive ? "bg-richblack-700" : "bg-richblack-500"
                } rounded-2xl flex flex-col items-center justify-center sm:w-[95%]`}
                {...getRootProps()}
            >
                <input {...getInputProps()} ref={inputRef} />
                {previewSource ? (
                    <div className="flex w-full flex-col">
                        {!video ? (
                            <div>
                                <img
                                    src={previewSource}
                                    alt="Preview"
                                    className="h-full w-full rounded-xl"
                                />
                            </div>
                        ) : (
                            <Player
                                RiAspectRatio="16:9"
                                playsInLine
                                src={previewSource}
                                className="rounded-2xl"
                            />
                        )}
                        {!viewData && (
                            <button
                                type="button"
                                className="h-max max-w-min hover:scale-95 transition-200 mt-4 p-2 bg-yellow-400 rounded-xl"
                                onClick={() => {
                                    setPreviewSource("");
                                    setSelectedFile(null);
                                    setValue(name, null);
                                }}
                            >
                                Cancel
                            </button>
                        )}
                    </div>
                ) : (
                    <div
                        className="flex justify-center flex-col items-center"
                        {...getRootProps({ className: "dropzone" })}
                    >
                        <input
                            {...getInputProps()}
                            ref={inputRef}
                            className=""
                            type="file"
                            onClick={open}
                        />
                        <div className="rounded-full place-items-center flex items-center justify-center">
                            <FiUploadCloud className="text-4xl" />
                        </div>
                        <p className="sm:pl-4">
                            Drag and drop an {!video ? "image" : "video"}, or click to
                            <span className="font-normal text-yellow-300 cursor-pointer">
                                {" "}
                                Browse
                            </span>{" "}
                            a file.
                        </p>
                        <ul className="flex justify-between gap-8 sm:text-sm sm:pl-4 text-richblack-300">
                            <li>Aspect Ratio 16:9</li>
                            <li>Recommended size 1024x576</li>
                        </ul>
                    </div>
                )}
            </div>
            {errors[name] & <span className="text-pink-500">{label} is required</span>}
        </div>
    );
};

export default Upload;
