import React from 'react'
import './homepage.css'
import { HiUsers } from "react-icons/hi";
import { ImTree } from "react-icons/im";

const CourseCard = ({cardData, currentCard, setCurrentCard}) => {
    return (
        <div data-aos="zoom-in-down" data-aos-easing="ease-in-out" className={`cursor-pointer h-[35vh] flex flex-col -rotate-6 p-3 card-data w-3/12 sm:w-full sm:h-[30vh] gap-3 justify-between items-center ${currentCard === cardData?.heading ?"text-slate-200 bg-richblack-700" : "text-white bg-richblack-500"}`} onClick={() => setCurrentCard(cardData?.heading)}>
            <div className='flex gap-5 flex-col'>
                <div className={`font-bold text-xl ${currentCard === cardData?.heading ? "text-richblack-300" : "text-slate-400"}`}>{cardData?.heading}</div>
                <div className={`text-base `}>{cardData?.description}</div>
            </div>
            <div className='flex flex-row justify-between items-center w-11/12'>
                <div className='flex items-center'>
                    <HiUsers /><p>{cardData?.level}</p>
                </div>
                <div className='flex items-center'>
                    <ImTree /> <p>{cardData?.lessionNumber}</p>
                </div>
            </div>
        </div>
    )
}

export default CourseCard
