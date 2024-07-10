import { useEffect, useState } from "react";
// Importing React icon component
import { MdClose } from "react-icons/md";
import { useSelector } from "react-redux";

const ChipInput = ({ name, label, placeholder, register, errors, setValue, getValues }) => {
    const { editCourse, course } = useSelector((state) => state.course);
    // Setting up state for managing chips array
    const [chips, setChips] = useState([]);

    useEffect(() => {
        if (editCourse) {
            // console.log(course)
            setChips(course?.tag);
        }
        register(name, { required: true, validate: (value) => value.length > 0 });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        setValue(name, chips);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [chips]);

    // Function to handle user input when chips are added
    const handleKeyDown = (event) => {
        // Check if user presses "Enter" or ","
        if (event.key === "Enter" || event.key === ",") {
            // Prevent the default behavior of the event
            event.preventDefault();
            // Get the input value and remove any leading/trailing spaces
            const chipValue = event.target.value.trim();
            // Check if the input value exists and is not already in the chips array
            if (chipValue && !chips.includes(chipValue)) {
                // Add the chip to the array and clear the input
                const newChips = [...chips, chipValue];
                setChips(newChips);
                event.target.value = "";
            }
        }
    };

    // Function to handle deletion of a chip
    const handleDeleteChip = (chipIndex) => {
        // Filter the chips array to remove the chip with the given index
        const newChips = chips.filter((_, index) => index !== chipIndex);
        setChips(newChips);
    };

    return (
        <div className="flex flex-col">
            <label className="text-zinc-400 text-xl sm:text-base font-semibold" htmlFor={name}>
                {label} <sup className="text-pink-500">*</sup>
            </label>
            <div className="flex w-full flex-wrap gap-2">
                {/* Map over the chips array and render each chip */}
                {chips?.map((chip, index) => (
                    <div
                        key={index}
                        className="flex items-center gap-2 text-white sm:text-sm text-base bg-richblack-500 rounded-xl p-1"
                    >
                        {chip}
                        <button
                            type="button"
                            className="focus:outline-none"
                            onClick={() => handleDeleteChip(index)}
                        >
                            <MdClose className="text-sm" />
                        </button>
                    </div>
                ))}
                <input
                    id={name}
                    name={name}
                    type="text"
                    placeholder={placeholder}
                    onKeyDown={handleKeyDown}
                    className="w-full sm:w-11/12 cursor-text sm:text-base sm:p-1 h-[40%] rounded-md border-richblack-300 bg-richblack-500 text-zinc-200 text-lg p-2"
                />
            </div>
            {errors[name] && <span className="">{label} is required.</span>}
        </div>
    );
};

export default ChipInput;
