import { useState } from "react"
import { toast } from "react-hot-toast"
//import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import Tab from "../../common/Tab"
import './auth.css'
import { setSignupData } from "../../../slices/authSlice"
import { sendOtp } from "../../../services/operations/authAPI"
import { ACCOUNT_TYPE } from "../../../utils/constants"

const SignUpForm = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    // student or instructor
    const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT)

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    })

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const { firstName, lastName, email, password, confirmPassword } = formData

    // Handle input fields, when some value changes
    const changeHandler = (e) => {
        setFormData((prevData) => ({
        ...prevData,
        [e.target.name]: e.target.value,
        }));
        /* if(e.target.name === "password" && e.target.value.length<8) {
            toast.error("Password must be of length 8")
        } */
    }

    // Handle Form Submission
    const submitHandler = (e) => {
        e.preventDefault()
        //const password = {password};
        if(password.length < 8){
            toast.error("Password must be of length 8")
            return
        }
        
        if (password !== confirmPassword) {
            toast.error("Passwords Do Not Match")
            return
        }
        const signupData = {
            ...formData,
            accountType,
        }

        // Setting signup data to state
        // To be used after otp verification
        dispatch(setSignupData(signupData))
        // Send OTP to user for verification
        dispatch(sendOtp(formData.email, navigate))
        //navigate("/login")
        // Reset
        setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        })
        setAccountType(ACCOUNT_TYPE.STUDENT)
    }

    // data to pass to Tab component
    const tabData = [
        {
        id: 1,
        tabName: "Student",
        type: ACCOUNT_TYPE.STUDENT,
        },
        {
        id: 2,
        tabName: "Instructor",
        type: ACCOUNT_TYPE.INSTRUCTOR,
        },
    ]
    return (
        <div className="flex flex-col gap-4 w-full h-max overflow-hidden" >
            <Tab tabData={tabData} field={accountType} setField={setAccountType} />
            <form className='flex flex-col gap-4 sm:h-max h-max overflow-hidden mb-8 sm:gap-4' onSubmit={submitHandler}>
                <div className="flex gap-2 w-[96%]">
                    <label className="flex flex-col w-[50%] gap-2">
                        <p className="text-richblack-400 text-xl p-1 flex items-center font-semibold overflow-hidden">First Name</p>
                        <input onChange={changeHandler} required type="text" value={firstName} name="firstName" placeholder="Enter your first name"  className="border cursor-text h-[40%] w-11/12 rounded-md border-richblack-300 bg-richblack-500 text-zinc-200 text-lg p-2"/>
                    </label>
                    <label className="flex flex-col w-[50%] gap-2">
                        <p className="text-richblack-400 text-xl p-1 flex items-center font-semibold overflow-hidden">Last Name</p>
                        <input onChange={changeHandler} required type="text" value={lastName} name="lastName" placeholder="Enter your last name"  className="border cursor-text h-[40%] w-11/12 rounded-md border-richblack-300 bg-richblack-500 text-zinc-200 text-lg p-2"/>
                    </label>
                </div>
                <label className="h-[25%] flex flex-col gap-2">
                    <p className="text-richblack-400 text-xl font-semibold">Enter Email Address</p>
                    <input onChange={changeHandler} required type="text" value={email} name="email" placeholder="Enter your email"  className="border cursor-text h-[35%] w-11/12 rounded-md border-richblack-300 bg-richblack-500 text-zinc-200 text-lg p-2"/>
                </label>
                <div className="h-max gap-4 sm:h-max flex flex-col w-full py-1 sm:gap-4">
                    <label className="overflow-hidden ">
                        <div className="text-richblack-400 text-xl font-semibold flex justify-between items-center">
                            <p>Create Password <sup className="text-pink-600">*</sup></p>
                            <span onClick={() => setShowPassword((prev) => !prev)} className='cursor-pointer text-cyan-500 font-normal italic text-base'>Show Password</span>
                        </div>
                        <input onChange={changeHandler} required type={showPassword ? "text" : "password"} value={password} name="password" placeholder="Enter password"  className="border cursor-text h-[40%] w-11/12 rounded-md border-richblack-300 bg-richblack-500 text-zinc-200 text-lg p-2"/>
                    </label>
                    <label className="overflow-hidden">
                        <div className="text-richblack-400 text-xl font-semibold flex justify-between items-center">
                            <p>Confirm Password <sup className="text-pink-600">*</sup></p>
                            <span onClick={() => setShowConfirmPassword((prev) => !prev)} className='cursor-pointer text-cyan-500 italic text-base font-normal'>Show Password</span>
                        </div>
                        <input onChange={changeHandler} required type={showConfirmPassword ? "text" : "password"} value={confirmPassword} name="confirmPassword" placeholder="Confirm Password"  className="border cursor-text h-[40%] w-11/12 rounded-md border-richblack-300 bg-richblack-500 text-zinc-200 text-lg p-2"/>
                    </label>
                </div>
                <button type="submit" className="border h-[12%] sm:py-2 py-2 sm:w-full w-[95%] rounded-xl text-2xl bg-yellow-300 text-black flex items-center justify-center font-medium hover:scale-95 cursor-pointer hover:bg-yellow-400 duration-300">Sign up</button>
            </form>
        </div>
    )
}

export default SignUpForm
