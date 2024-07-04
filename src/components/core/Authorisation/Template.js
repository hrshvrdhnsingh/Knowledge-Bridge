import React from 'react'
//import { FcGoogle } from "react-icons/fc"
import { useSelector } from "react-redux"
import LoginForm from "./LoginForm"
import SignUpForm from "./SignUpForm";
import HighLightText from '../Homepage/HighLightText';
import './auth.css'

const Template = ({ title, description1, description2, image, formType, height }) => {
    const { loading } = useSelector((state) => state.auth)
    return (
        <div className='flex justify-center items-center w-screen mt-16 h-[90vh]'>
            {
                loading ? (<div className='spinner'></div>) :
                (
                    <div className={`outer-div flex w-8/12 justify-between h-max w-${height}`}>
                        <div className='w-11/12 flex flex-col overflow-hidden h-max'>
                            <h1 className={`text-white  font-bold p-3 ${formType === "login" ? "text-5xl" : "text-3xl"}`}><HighLightText text={title} /></h1>
                            <p className='flex flex-col'>
                                <span className='text-richblack-300 text-xl p-1'>{description1}</span>
                                <span className='text-white text-lg p-1 italic'>{description2}</span>
                            </p>
                            {formType === "signup" ? <SignUpForm /> : <LoginForm />}
                        </div>
                        <div className='w-[75%] h-7/12 rounded-xl flex justify-center items-center p-3'>
                            <img src={image} alt='lazy-pic' className='rounded-2xl login-img'></img>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default Template
