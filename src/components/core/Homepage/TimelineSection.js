import React from 'react'
import Logo1 from '../../../assets/timelineLogo/Logo1.svg';
import Logo2 from '../../../assets/timelineLogo/Logo2.svg';
import Logo3 from '../../../assets/timelineLogo/Logo3.svg';
import Logo4 from '../../../assets/timelineLogo/Logo4.svg';
import TimelineImage from '../../../assets/Images/TimeLineimage2.jpg'
import './homepage.css'

const TimeLine = [
    {
      Logo: Logo1,
      Heading: "Leadership",
      Description: "Fully committed to the success of company.",
    },
    {
      Logo: Logo2,
      Heading: "Responsibility",
      Description: "Students will always be our top priority.",
    },
    {
      Logo: Logo3,
      Heading: "Flexibility",
      Description: "The ability to switch is an important skill.",
    },
    {
      Logo: Logo4,
      Heading: "Solve the problem",
      Description: "Code your way to a solution!",
    },
];

const TimelineSection = () => {
    return (
        <div className='flex flex-row items-center sm:flex-col-reverse w-full mt-40 mb-28 p-5 sm:p-0 gap-10 justify-center h-[70vh] sm:h-max'>
            <div className='w-[40%] sm:w-full flex flex-col gap-6 sm:gap-3'>
                {
                    TimeLine.map((ele, i) => {
                        return (
                            <div className="flex flex-row gap-5 items-center" key={i} data-aos="zoom-in-left">
                                <div className='w-[30px] h-[30px] flex items-center'>
                                    <img src={ele.Logo} alt={ele.Logo} className='w-full h-full'/>
                                </div>
                                <div>
                                    <h2 className='text-white font-semibold text-lg sm:text-base'>{ele.Heading}</h2>
                                    <p className='text-richblack-200 text-base sm:text-sm'>{ele.Description}</p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <div className='relative w-[50%] h-full sm:w-full' data-aos="zoom-in" data-aos-easing="ease-in-out"> 
                <div className='w-[100%] h-9/12 flex justify-center items-center bg-slate-500 bg-opacity-70 rounded-3xl'>
                    <img src={TimelineImage} alt='sitting-lady' className='w-10/12 h-11/12 rounded-2xl'/>
                </div>
                
            </div>
        </div>
    )
}

export default TimelineSection
