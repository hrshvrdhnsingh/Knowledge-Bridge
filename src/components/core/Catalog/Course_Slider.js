import React, { useEffect, useState } from "react"
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react"
// Import Swiper styles
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
// Import required modules
import { FreeMode, Pagination, Navigation } from "swiper"
import CourseCard from "./Course_Card"

const CourseSlider = ({Courses}) => {
    return (
        <>
            {
                Courses?.length ? (
                    <Swiper slidesPerView={2.5} spaceBetween={20} loop={1} pagination={true} modules={[Pagination, FreeMode, Navigation]} className="mySwiper" autoplay={{delay: 200, disableOnInteraction: false,}} navigation={true} >
                        {
                            Courses.map((course, index) => (
                                <SwiperSlide key={index} className="h-[70%]">
                                    <CourseCard course={course} className="" Height={"h-[600px]"}/>
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>
                ) : (
                    <div></div>
                )
            }
        </>
    )
}

export default CourseSlider
