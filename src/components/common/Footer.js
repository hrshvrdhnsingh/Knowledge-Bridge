import React from 'react'
import { Link } from 'react-router-dom'
import SvgLogo from '../../assets/Logo/Wisdombridgecrop.svg'
import { FaPhoneAlt, FaGithub, FaLinkedinIn } from "react-icons/fa";
import { GoMail } from "react-icons/go";

const Footer = () => {
    return (
        <div className='bg-richblack-800 w-screen  p-4 flex justify-center items-center h-[25vh] gap-8 rounded-t-full mt-24'>
            <Link to="/" className='h-[100%] rounded-2xl'>
                <img src={SvgLogo} alt='title' className='object-cover h-full w-full'/>
            </Link>
            <div className='flex flex-col text-xl gap-2'>
                <Link to="signup" className='text-zinc-500 font-medium hover:text-zinc-400 transition-all duration-150'>Start your journey</Link>
                <Link to="about" className='text-zinc-500 font-medium hover:text-zinc-400 transition-all duration-150'>About</Link>
                <Link to="contact" className='flex text-zinc-500 font-medium hover:text-zinc-400 transition-all duration-150 items-center gap-2'><FaPhoneAlt className='text-base'/>Contact Us</Link>
            </div>
            <div className='flex gap-8 text-4xl ml-60'>
                <a href="mailto:iamvardhan10@gmail.com" className='flex justify-center items-center p-2 rounded-xl  bg-richblack-700 bg-opacity-80 hover:bg-red-400 hover:bg-opacity-80 transition-all duration-1000'><GoMail /></a>
                <Link to="https://github.com/hrshvrdhnsingh" className='flex justify-center items-center p-2 rounded-xl  bg-richblack-700 bg-opacity-80 hover:bg-purple-500 hover:bg-opacity-80 transition-all duration-1000'><FaGithub /></Link>
                <Link to="https://www.linkedin.com/in/harshvardhan-singh-4p3sh17" className='flex justify-center items-center p-2 rounded-xl bg-richblack-700 bg-opacity-80 hover:bg-blue-600 hover:bg-opacity-80 transition-all duration-1000'><FaLinkedinIn /></Link>
            </div>
        </div>
    )
}

export default Footer
