import React from 'react'
import './Common.css'

const ConfirmationModal = ({modalData}) => {
    return (
        <div className='w-screen fixed left-0 top-0 h-screen z-[999999] bg-richblack-200 bg-opacity-50 flex justify-center items-center'>
            <div data-aos="zoom-out-right" data-aos-easing="ease-in-sine" className='modal w-[27vw] sm:w-[90vw] h-max flex flex-col rounded-3xl border-slate-300 border-[2px] gap-3 p-3 bg-richblack-700 justify-center'>
                <p className='text-3xl text-white p-1 font-bold'>{modalData.text1}</p>
                <p className='text-xl font-medium text-richblack-900'>{modalData.text2}</p>
                <div className='flex w-7/12 justify-evenly '>
                    <button className='bg-yellow-600 p-3 rounded-2xl font-semibold hover:scale-95 duration-200' onClick={modalData.btn1Handler}>{modalData.btn1Text}</button>
                    <button className='bg-richblack-400 p-3 rounded-2xl font-semibold hover:scale-95 duration-200' onClick={modalData.btn2Handler}>{modalData.btn2Text}</button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmationModal
