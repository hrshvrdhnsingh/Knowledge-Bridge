import React, { useState } from 'react'
import { HomePageExplore } from '../../../data/homepage-explore';
import HighLightText from './HighLightText';
import CourseCard from './CourseCard';

const tabsName = ["Free", "New to Coding", "Most Popular", "Skill Paths", "Career Paths",];

const ExploreMore = () => {
    const [currentTab, setCurrentTab] = useState(tabsName[0]);
    const [courses, setCourses] = useState(HomePageExplore[0].courses);
    const [currentCard, setCurrentCard] = useState(HomePageExplore[0].courses[1].heading);

    const setMyCards = (value) => {
        setCurrentTab(value);
        const result = HomePageExplore.filter((course) => course.tag === value);
        setCourses(result[0].courses);
        setCurrentCard(result[0].courses[0].heading);
    }

    return (
        <div className='flex flex-col w-full justify-center items-center mt-20 gap-2'>
            <div className='font-bold text-5xl p-3 text-white'>Unlock the <HighLightText text={"Power of Code"} /></div>
            <div className='text-xl text-richblack-200 text-center'>Learn to build anything you can imagine.</div>
            <div className='flex flex-row bg-richblack-600 text-richblack-200 p-1 gap-2 rounded-full mt-6'>
                {
                    tabsName.map((entry, i) => {
                        return (
                            <div className={`flex flex-row gap-2 items-center p-2 ${currentTab === entry ? "bg-richblack-900" : "bg-richblack-600"} rounded-full transition-all duration-200 cursor-pointer hover:bg-richblack-900 hover:text-richblack-200`} key={entry} onClick={() => setMyCards(entry)} >
                                {entry}
                            </div>
                        )
                    })
                }
            </div>
            <div className='w-full gap-16 flex flex-row items-center justify-center mt-12 p-8'>
                {
                    courses.map( (element, index) => {
                        return (<CourseCard key={element} cardData={element} currentCard={currentCard} setCurrentCard={setCurrentCard} />)
                    })
                }
            </div>
        </div>
    )
}

export default ExploreMore
