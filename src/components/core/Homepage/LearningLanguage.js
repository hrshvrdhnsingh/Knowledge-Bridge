import React from 'react'
import { TypeAnimation } from 'react-type-animation'
import './homepage.css';
import Progress from '../../../assets/Images/Know_your_progress.svg'
import Compare from '../../../assets/Images/Compare_with_others.svg'
import Lesson from '../../../assets/Images/Plan_your_lessons.svg'
import CTAButton from './Buttons';

const LearningLanguageSection = () => {
    return (
        <div className='w-full flex items-center justify-center mt-12'>
            <div className='flex flex-col w-11/12 sm:w-full justify-center items-center '>
                <div className='text-6xl sm:text-5xl sm:p-2 font-bold p-4 bg-gradient-to-r from-[#f093fb] via-[#46aef7] to-[#f5576c] text-transparent bg-clip-text '>
                    <TypeAnimation sequence={[
                        "Your Swiss Knife for learning any language", 1000,
                        "Your Swiss Knife for getting ahead of the competition", 1000]} 
                    repeat={Infinity} cursor={true} omitDeletionAnimation={false} speed={20} className='highlight-text'
                    />
                </div>
                <div className='text-center sm:text-base text-lg text-richblack-200 w-11/12 h-full sm:mt-4'>Making learning multiple languages easy, with 20+ languagess, realistic voice-over, progress-tracking, custom schedule and more.</div>
                <div className='flex sm:h-[20vh] flex-row items-center gap-1 w-full mt-8' data-aos="zoom-out-up" data-aos-easing="ease-in-out">
                    <img src={Progress} alt='Know your Progress' className='sm:overflow-visible object-contain w-11/12 sm:w-[43%] sm:h-full translate-x-32 sm:translate-x-8'/>
                    <img src={Compare} alt='Know your Progress' className='object-contain sm:overflow-visible w-11/12 sm:w-[43%] translate-x-8' />
                    <img src={Lesson} alt='Know your Progress' className='object-contain sm:overflow-visible w-11/12 sm:w-[45%] -translate-x-28 sm:-translate-x-52'/>
                </div>
                <div className='mt-8'>
                    <CTAButton active={true} linkto={"/singup"}>
                        <div>Learn more</div>
                    </CTAButton>
                </div>
            </div>
        </div>
    )
}

export default LearningLanguageSection
