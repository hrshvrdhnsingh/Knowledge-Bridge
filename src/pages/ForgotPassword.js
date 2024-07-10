import React from 'react'
import { Link } from 'react-router-dom';
import {useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { FaArrowLeft } from "react-icons/fa6";
import { getPasswordResetToken } from '../services/operations/authAPI';

const ForgotPassword = () => {
    const [emailSent, setEmailSent] = useState(false);
    const [email, setEmail] = useState('');
    const {loading} = useSelector( (state) => state.auth);
    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(getPasswordResetToken(email, setEmailSent));
    }

    return (
        <div className='flex justify-center items-center w-screen h-screen'>
            {
                loading ? (<div className='spinner'></div>) : (
                    <div className='flex flex-col items-center w-4/12 gap-4 sm:w-11/12'>
                        <h1 className='text-4xl bg-gradient-to-l from-[#f093fb] to-[#f5576c] text-transparent bg-clip-text font-bold'>
                            {
                                !emailSent ? "Reset your password" : "Check your email"
                            }
                        </h1>
                        <p className='text-xl text-zinc-500'>
                            {
                                !emailSent ? "Have no fear. We'll email you instructions to reset your password. If you dont have access to your email we can try account recovery" :
                                    `We have sent the reset email to ${email}`
                            }
                        </p>
                        <form className='w-full gap-6 flex flex-col p-1' onSubmit={submitHandler}>
                            {
                                !emailSent && (
                                    <label className='flex w-full gap-4 flex-col'>
                                        <p className="text-richblack-300 text-xl font-semibold flex justify-between items-center">Email Address <sup className='text-pink-600'>**</sup></p>
                                        <input required type='email' name='email' value={email} className='cursor-text h-[40%] w-11/12 rounded-md border-richblack-300 bg-richblack-500 text-zinc-200 text-lg p-2'
                                            onChange ={ (e) => setEmail(e.target.value)} placeholder='Enter your Email' autoComplete='false'
                                        />
                                    </label>
                                )
                            }
                            <button className='border py-2 w-[95%] rounded-xl text-2xl font-semibold bg-yellow-300 text-black flex items-center justify-center  hover:scale-95 cursor-pointer hover:bg-yellow-400 duration-300'>
                                {
                                    !emailSent ? "Reset password" : "Resend Email"
                                }
                            </button>
                        </form>
                        <Link to="/login" className='text-cyan-500 flex gap-2 items-center '><FaArrowLeft /><p>Back to login</p></Link>
                    </div>
                )
            }
        </div>
    )
}

export default ForgotPassword;