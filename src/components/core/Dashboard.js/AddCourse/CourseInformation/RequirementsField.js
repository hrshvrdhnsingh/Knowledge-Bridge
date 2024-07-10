import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

const RequirementsField = ({name, label, register, setValue, errors, getValues}) => {
    const { editCourse, course } = useSelector((state) => state.course)
    const [requirement, setRequirement] = useState("")
    const [requirementsList, setRequirementsList] = useState([])

    useEffect(() => {
        if (editCourse) {
            setRequirementsList(course?.instructions)
            }
            register(name, { required: true, validate: (value) => value.length > 0 })
            // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
        
    useEffect(() => {
        setValue(name, requirementsList)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [requirementsList])
        
    const handleAddRequirement = () => {
        if (requirement) {
        setRequirementsList([...requirementsList, requirement])
        setRequirement("")
        }
    }
    
    const handleRemoveRequirement = (index) => {
        const updatedRequirements = [...requirementsList]
        updatedRequirements.splice(index, 1)
        setRequirementsList(updatedRequirements)
    }
    return (
        <div className="flex flex-col">
            <label className="text-zinc-400 text-xl sm:text-base font-semibold" htmlFor={name}>{label}<sup className="text-pink-500">*</sup></label>
            <div className="flex flex-col gap-2">
                <input type="text" id={name} value={requirement} onChange={(e) => setRequirement(e.target.value)} className="border sm:w-11/12 cursor-text sm:text-base sm:p-1 h-[40%] w-11/12 rounded-md border-richblack-300 bg-richblack-500 text-zinc-200 text-lg p-2" />
                <button type="button" onClick={handleAddRequirement} className="text-white cursor-pointer bg-richblack-600 w-min p-1 px-3 rounded-xl">Add</button>
            </div>
            {
                requirementsList?.length > 0 && (
                    <ul className="">
                        {
                            requirementsList?.map((requirement, index) => (
                                <li key={index} className="flex items-center text-white text-xl sm:text-lg gap-8 ml-4">
                                    <span className="italic text-lg sm:text-base">{`>>`} {requirement}</span>
                                    <button type="button" className="unset cursor-pointer text-sm text-zinc-500" onClick={() => handleRemoveRequirement(index)}>Clear</button>
                                </li>
                            ))
                        }
                    </ul>
                )
            }
            {errors[name] && (
                <span className="">{label} is required.</span>
            )}
        </div>
    )
}

export default RequirementsField
