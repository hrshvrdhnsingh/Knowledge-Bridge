import React from 'react'
import Sidebar from '../Sidebar'
import ChangeProfilePicture from './ChangeProfilePicture'
import EditProfile from './EditProfile'
import UpdatePassword from './UpdatePassword'
import DeleteAccount from './DeleteAccount'

const Settings = () => {
    return (
        <div className='flex w-screen min-h-screen justify-center'>
            <Sidebar />
            <div className='mt-[13vh] w-7/12 ml-36 flex flex-col gap-5 p-4'>
                <h1 className='font-bold text-4xl p-3 text-white'>Edit Profile</h1>
                <ChangeProfilePicture />
                <EditProfile />
                <UpdatePassword />
                <DeleteAccount />
            </div>
        </div>
    )
}

export default Settings
