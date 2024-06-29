import React from 'react'
import Sidebar from './Sidebar'
import { useSelector } from 'react-redux'
import ProfileBtn from './ProfileBtn'
import { useNavigate } from 'react-router-dom'

const MyProfile = () => {
    const {user} = useSelector( (state) => state.profile)
    const navigate = useNavigate();

    return (
        <div className='w-screen h-screen flex justify-center'>
            <Sidebar />
            <div className='mt-[13vh] w-7/12 ml-36 flex flex-col gap-6'>
                <h2 className='font-bold text-4xl p-3 text-white'>My Profile</h2>
                <div className='flex bg-richblack-600 p-2 px-6 rounded-2xl justify-between items-center'>
                    <div className='flex w-[50%] gap-4'>
                        <div className='w-[60px] h-[60px] rounded-full flex items-center border-zinc-300 border-[2px]'><img src={user?.image} alt={`profile-${user?.firstName}`} className='object-fill'/></div>
                        <div className=''>
                            <p className='text-xl font-bold text-white'>{user?.firstName + " " + user?.lastName}</p>
                            <p className='text-lg text-zinc-400'>{user?.email}</p>
                        </div>
                    </div>
                    <ProfileBtn text={"Edit"} onclick={() => navigate("/dashboard/settings")} />
                </div>
                <div className='flex bg-richblack-600 p-2 px-6 rounded-2xl flex-col justify-between min-h-max'>
                    <div className='flex justify-between gap-4 w-full h-max'>
                        <h3 className='text-xl font-bold py-0 text-white'>About</h3>
                        <ProfileBtn text={"Edit"} onclick={() => navigate("/dashboard/settings")} />
                    </div>
                    <p className='text-base w-10/12 pr-5 text-zinc-400 min-h-max'>{user?.additionalDetails?.about  ? user.additionalDetails.about : "Tell us something about yourself" }</p>
                </div>
                <div className='flex bg-richblack-600 p-2 px-6 rounded-2xl justify-between flex-col'>
                    <div className='flex justify-between gap-4 w-full h-max'>
                        <h3 className='text-xl font-bold py-0 text-white'>Peronsal Details</h3>
                        <ProfileBtn text={"Edit"} onclick={() => navigate("/dashboard/settings")} />
                    </div>
                    <div className='flex w-10/12 gap-16'>
                        <div className='flex flex-col w-[50%]'>
                            <div>
                                <p className='text-lg font-medium text-zinc-400'>First Name</p>
                                <p className='font-medium text-zinc-100 px-2'>{user?.firstName}</p>
                            </div>
                            <div>
                                <p className='text-lg font-medium text-zinc-400'>Email</p>
                                <p className='font-medium text-zinc-100 px-2'>{user?.email}</p>
                            </div>
                            <div>
                                <p className='text-lg font-medium text-zinc-400'>Gender</p>
                                <p className='font-medium text-zinc-100 px-2'>{user?.additionalDetails?.gender ? user?.additionalDetails?.gender : "Add your gender"}</p>
                            </div>
                        </div>
                        <div className='flex flex-col w-[50%]'>
                            <div>
                                <p className='text-lg font-medium text-zinc-400'>Last Name</p>
                                <p className='font-medium text-zinc-100 px-2'>{user?.lastName}</p>
                            </div>
                            <div>
                                <p className='text-lg font-medium text-zinc-400'>Phone Number</p>
                                <p className='font-medium text-zinc-100 px-2'>{user?.additionalDetails?.contactNumber ? user?.additionalDetails?.contactNumber : "Add Phone Number"}</p>
                            </div>
                            <div>
                                <p className='text-lg font-medium text-zinc-400'>Date of Birth</p>
                                <p className='font-medium text-zinc-100 px-2'>{user?.additionalDetails?.dateOfBirth ? user.additionalDetails.dateOfBirth : "Add Date of Birth"}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyProfile
