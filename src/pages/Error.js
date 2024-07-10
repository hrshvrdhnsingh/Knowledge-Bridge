import React from 'react'
import { Link } from 'react-router-dom'
import { FaArrowLeft } from "react-icons/fa6";

const Error = () => {
    return (
        <div className='flex justify-center items-center w-screen h-screen flex-col gap-8'>
            <div className='flex flex-col justify-center items-center w-full'>
              <h1 className='text-8xl font-bold bg-gradient-to-l from-[#f093fb] to-[#f5576c] text-transparent bg-clip-text '>404</h1>
              <p className='bg-gradient-to-r from-[#f093fb] to-[#f5576c] text-transparent bg-clip-text  text-3xl'>Page not found</p> 
            </div>
            <Link to="/" className='w-2/12 sm:w-max sm:px-3 h-[8%] rounded-xl text-2xl flex justify-center gap-4 items-center text-zinc-700 bg-slate-200 hover:scale-95 duration-200'>
                <FaArrowLeft />Go Back 
            </Link>
        </div>
    )
}

export default Error
