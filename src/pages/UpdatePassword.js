import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom';
import { resetPassword } from '../services/operations/authAPI';
import { FaArrowLeft } from 'react-icons/fa6';

const UpdatePassword = () => {
    const [formData, setFormData] = useState({
        password: "", confirmPassword: "",
    })
    const dispatch = useDispatch();
    const location = useLocation()

    const {loading} = useSelector( (state) => state.auth);
    const [showPassword, setShowPassword ]= useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const {password, confirmPassword} = formData;

    const changeHandler = (e) => {
        setFormData( (prevData) => (
            {
                ...prevData, 
                [e.target.name] : e.target.value,
            }
        ))
    }
    const submitHandler = (e) => {
        e.preventDefault();
        const token = location.pathname.split('/').at(-1);
        dispatch(resetPassword(password, confirmPassword, token))
    }
    return (
        <div className='flex justify-center items-center w-screen h-screen sm:w-11/12'>
            {
                loading ? (<div className='spinner'></div>) : (
                    <div className='flex flex-col justify-center gap-1'> 
                        <h1 className='text-5xl bg-gradient-to-r from-[#f093fb] to-[#f5576c] text-transparent bg-clip-text font-bold'>Choose new Password</h1>
                        <p className='text-zinc-500 text-xl'>Almost done. Enter your new password and you're all set.</p>
                        <form onSubmit={submitHandler} className='flex flex-col gap-3'>
                            <label className='flex flex-col gap-2' htmlFor='new-password'>
                                <div className='flex justify-between items-center'>
                                    <p className='text-richblack-300 text-xl font-semibold'>New Password <sup className='text-pink-600'>*</sup></p>
                                    <span className='cursor-pointer text-cyan-500 text-sm italic' onClick={() => setShowPassword((prev) => !prev)}>Show Password</span>
                                </div>
                                <input id='new-password' required type={showPassword ? "text" : "password"} placeholder="Enter new password" name='password' value={password} onChange={changeHandler}
                                    className='cursor-text h-[40%] w-11/12 rounded-md border-richblack-300 bg-richblack-500 text-zinc-200 text-lg p-2' autoComplete='false'
                                /> 
                            </label>
                            <label className='flex flex-col gap-2'>
                                <div className='flex justify-between items-center'>
                                    <p className='text-richblack-300 text-xl font-semibold'>Confirm Password <sup className='text-pink-600'>*</sup></p>
                                    <span className='cursor-pointer text-cyan-500 text-sm italic' onClick={() => setShowConfirmPassword((prev) => !prev)}>Show Password</span>
                                </div>
                                <input required type={showConfirmPassword ? "text" : "password"} placeholder="Confirm new password" name='confirmPassword' value={confirmPassword} onChange={changeHandler}
                                    className='cursor-text h-[40%] w-11/12 rounded-md border-richblack-300 bg-richblack-500 text-zinc-200 text-lg p-2' autoComplete='false'
                                /> 
                            </label>
                            <button type="submit" className='border py-2 w-[95%] rounded-xl text-2xl bg-yellow-300 text-black flex items-center justify-center font-medium hover:scale-95 cursor-pointer hover:bg-yellow-400 duration-300'>Reset Password</button>
                        </form>
                        <Link to="/login" className='text-cyan-500 flex gap-2 items-center text-center w-full'><FaArrowLeft /><p className='text-center'>Back to login</p></Link>
                    </div>
                )
            }
        </div>
    )
}

export default UpdatePassword
