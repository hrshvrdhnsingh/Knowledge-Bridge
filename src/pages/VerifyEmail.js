import React, { useEffect, useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa6';
import OTPInput from 'react-otp-input';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { IoIosTimer } from "react-icons/io";
import { sendOtp, signUp } from '../services/operations/authAPI';
import toast from 'react-hot-toast';

const VerifyEmail = () => {
    const [otp, setOtp] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {signupData, loading} = useSelector( (state) => state.auth)
     
    //if the signupData is not available
    useEffect( () => {
        if(!signupData) {
            navigate("/signup");
            toast.error("Sign-in first")
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
     
    const submitHandler = (e) => {
        e.preventDefault(); //After the OTp has been sent, we need to signup now and for that we need the 
        // sign-up dta which has been passed to us via signupData by authSlice.
        const {accountType, firstName, lastName, email, password, confirmPassword} = signupData;
        dispatch(signUp(accountType, firstName, lastName, email, password, confirmPassword, otp, navigate))
    }
     
    return (
        <div className='flex justify-center items-center w-screen h-screen'>
            {
                loading ? (<div className='spinner'></div>) : (
                    <div className='flex flex-col justify-center gap-3'>
                        <h1 className='text-5xl bg-gradient-to-r from-[#f093fb] to-[#f5576c] text-transparent bg-clip-text font-bold'>Verify Email</h1>
                        <p className='text-zinc-500 text-xl'>A Verification code has been sent to you. Enter the code below.</p>
                        <form onSubmit={submitHandler} className='flex flex-col gap-4'>
                            <OTPInput value={otp} onChange={setOtp} numInputs={8} containerStyle={{justifyContent: "space-between",gap: "0 6px", display: "flex", alignItems: "center"}} className='' renderInput={(props) => (<input {...props} placeholder='-' className='w-[15%] bg-zinc-500 p-4 rounded-xl text-2xl text-white'/>)} />
                            <button type="submit" className='border py-2 w-[100%] rounded-xl text-2xl bg-yellow-300 text-black flex items-center justify-center font-medium hover:scale-95 cursor-pointer hover:bg-yellow-400 duration-300'>Verify Email</button>
                        </form>
                        <div className='flex justify-between items-center'>
                            <Link to="/login" className='text-cyan-500 flex gap-2 items-center text-center w-full'><FaArrowLeft /><p className='text-center'>Back to login</p></Link>
                            <button className='flex items-center gap-1'><IoIosTimer onClick={() => dispatch(sendOtp(signupData.email, navigate))}/>Resend OTP</button>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default VerifyEmail
