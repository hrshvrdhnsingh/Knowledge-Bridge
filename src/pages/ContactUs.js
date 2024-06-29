import React from 'react'
import ContactUsForm from '../components/core/ContactPage/ContactUsForm'
import './pages.css' 

const ContactUs = () => {
    return (
        <div className='w-screen flex flex-col mt-[9vh] items-center'>
            <div className='light-bg flex items-center justify-center px-40 h-[60vh] w-full gap-12'>
                <div className='contact-card w-[30%] bg-richblack-700 px-4 py-12 rounded-3xl flex flex-col justify-center'>
                    <h1 className='text-2xl p-1 text-white'>Chat with us</h1>
                    <p className='text-lg text-zinc-500'>Our friendly team is here to help.</p>
                    <p className='text-lg font-medium text-richblack-200'>info@studynotion.com</p>
                </div>
                <div className='contact-card w-[30%] bg-richblack-700 px-4 py-12 rounded-2xl flex flex-col justify-center'>
                    <h1 className='text-2xl p-1 text-white'>Visit us</h1>
                    <p className='text-lg text-zinc-500'>Come and say hello at our office HQ.</p>
                    <h4 className='text-lg font-medium text-richblack-200'>Mohan Nagar, Seraikela-Kharsawan, Jamshedpur - 831013</h4>
                </div>
                <div className='contact-card w-[30%] bg-richblack-700 px-4 py-12 rounded-3xl flex flex-col justify-center'>
                    <h1 className='text-2xl p-1 text-white'>Call us</h1>
                    <p className='text-lg text-zinc-500'>Mon - Fri from 8am to 5pm</p>
                    <p className='text-lg font-medium text-richblack-200'>+123 420 0069</p>
                </div>
            </div>
            <ContactUsForm heading={"Got an Idea? We've got the skills. Let's team up"} description={"Tell us more about yourself and what you're got in mind."}/>
        </div>
    )
}

export default ContactUs
