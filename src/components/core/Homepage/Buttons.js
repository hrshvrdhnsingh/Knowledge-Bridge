import React from 'react'
import { Link } from 'react-router-dom';
import './homepage.css'
const CTAButton = ({children, active, linkto}) => {
  return (
    <Link to={linkto}>
        <div className={`p-1 text-center ${active ? "bg-yellow-300 text-black" : "bg-richblack-700 text-white"} 
                        duration-200 transition-all p-3 sm:p-2 rounded-xl w-full custom-shadow font-semibold sm:text-base sm:py-2`}>
            {children}
        </div>
    </Link>
  )
}

export default CTAButton;
