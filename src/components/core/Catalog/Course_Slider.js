import React from "react"
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react"
// Import Swiper styles
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
// Import required modules
import { FreeMode, Pagination, Navigation, Autoplay } from "swiper"
import CourseCard from "./Course_Card"

const CourseSlider = ({Courses}) => {
    return (
        <div className="swiper-container">
            {
                Courses?.length ? (
                    <Swiper slidesPerView={2.5} spaceBetween={20} loop={false} pagination={true} modules={[Pagination, FreeMode, Navigation, Autoplay]} className="mySwiper" autoplay={{delay: 4000, disableOnInteraction: false,}} navigation={true} breakpoints={{0: {slidesPerView: 1}, 900:{slidesPerView:2.5, spaceBetween:20}}}>
                        {
                            Courses.map((course, index) => (
                                <SwiperSlide key={index} className="swiper-slide-custom">
                                    <CourseCard course={course} className="" Height={"h-[600px]"}/>
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>
                ) : (
                    <div></div>
                )
            }
        </div>
    )
}

export default CourseSlider