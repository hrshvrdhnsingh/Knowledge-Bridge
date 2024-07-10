import React from 'react'
import { RiEditBoxLine } from "react-icons/ri";

const ProfileBtn = ({onclick, text}) => {
    return (
        <button onClick={onclick} className='text-black flex bg-yellow-400 bg-opacity-75 h-[10%] hover:scale-95 px-3 cursor-pointer py-1 sm:py-1 rounded-xl justify-center items-center sm:text-base text-xl font-semibold'> 
            <span>{text}</span><RiEditBoxLine />
        </button>
    )
}

export default ProfileBtn
