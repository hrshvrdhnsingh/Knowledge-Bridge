import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import './auth.css'
import { login } from '../../../services/operations/authAPI'

const LoginForm = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })

    const [showPassword, setShowPassword] = useState(false)

    const { email, password } = formData

    const changeHandler = (e) => {
        setFormData((prevData) => ({
        ...prevData,
        [e.target.name]: e.target.value,
        }))
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password, navigate))
    }
    return (
        <form onSubmit={submitHandler} className='sm:w-full w-10/12 sm:mt-4 flex flex-col gap-4 justify-center sm:gap-0 mt-8 h-[45vh] p-2'>
            <label className='flex flex-col gap-2 h-[35%]'>
                <p className='text-richblack-400 text-xl font-semibold overflow-hidden'>Email Address <sup className="text-pink-600">*</sup></p>
                <input placeholder='Enter your email address' required type="text" name="email" value={email} onChange={changeHandler} autoComplete='off'
                    className='cursor-text w-11/12 h-[40%] sm:h-[32%] rounded-md border-richblack-300 bg-richblack-500 text-zinc-200 text-lg p-2'
                />
            </label>
            <label className='flex flex-col gap-2 h-[35%]'>
                <div className='flex justify-between items-center'>
                    <p className='text-richblack-400 text-xl font-semibold overflow-hiden'>Password <sup className="text-pink-600">*</sup></p>
                    <span onClick={() => setShowPassword((prev) => !prev)} className='cursor-pointer text-cyan-500 italic'>Show Password</span>
                </div>
                <input required placeholder='Enter password' name='password' value={password} type={showPassword ? "text" : "password"} onChange={changeHandler}
                    className='border cursor-text h-[40%] sm:h-[32%] w-11/12 rounded-md border-richblack-300 bg-richblack-500 text-zinc-200 text-lg p-2'
                />
            </label>
            <button type="submit" className="border h-[20%] sm:h-[15%] w-[95%] rounded-xl text-2xl bg-yellow-300 text-black flex items-center justify-center font-medium hover:scale-95 cursor-pointer hover:bg-yellow-400 duration-300">
                Login
            </button>
            <Link className='overflow-hidden cursor-pointer mt-0 sm:mt-0 text-cyan-500 italic p-2' to="/forgot-password">Forgot password</Link>
        </form>
    )
}

export default LoginForm
