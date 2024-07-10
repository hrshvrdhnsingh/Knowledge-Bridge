import React, { useState } from 'react'
import {sidebarLinks} from '../../../data/dashboard-links';
import {logout} from '../../../services/operations/authAPI';
import { useDispatch, useSelector } from 'react-redux';
import SidebarLink from './SidebarLink';
import './dashboard.css';
import { VscSignOut } from 'react-icons/vsc';
import { useNavigate } from 'react-router-dom';
import ConfirmationModal from '../../common/ConfirmationModal';

const Sidebar = () => {
    const {loading : authLoading} = useSelector( (state) => state.auth);
    const {user, loading : profileLoading} = useSelector ((state) => state.profile);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [confirmationModal, setConfirmationModal] = useState('')

    if(profileLoading || authLoading) {
        return (
            <div className=''>SPINNER</div>
        )
    }

    return (
        <div className='flex flex-col'>
            <div className='sidebar flex items-center fixed w-[12vw] sm:w-[24vw] sm:px-0 mt-[9vh] sm:mt-[7vh] flex-col left-0 top-0 border-richblack-700 border-r-[2px] h-[91vh] py-3 bg-richblack-100'> 
                <div className='w-full mt-8'>
                    {
                        sidebarLinks.map( (link) => {
                            if(link.type && user?.accountType !== link.type) return null;
                            return (
                                <SidebarLink link={link} iconName={link.icon} key={link.id}/>
                            )
                        })
                    } 
                </div>
                <div className='h-[1px] bg-richblack-700 mt-8 w-10/12'></div>
                <div className='flex flex-col w-full gap-2 mt-8'>
                    <SidebarLink link={{name:"Settings", path:"/dashboard/settings"}} iconName="VscSettingsGear" />
                    <button onClick={ () => setConfirmationModal({
                        text1: "Are you Sure ?" , text2: "You will be logged out of your account", 
                        btn1Text: "Log-Out", btn2Text: "Cancel", btn1Handler: () => dispatch(logout(navigate)),
                        btn2Handler: () => setConfirmationModal(null),
                    })} className='cursor-pointer'>

                        <div className='ml-3 sm:ml-2 flex items-center gap-6 sm:gap-2 text-lg sm:text-sm font-medium text-zinc-500'>
                            <VscSignOut className='sm:text-2xl'/> <span>Logout</span>
                        </div>
                    </button>
                </div>
            </div>
            {/* If the modal value exists then, display the modal. */}
            {confirmationModal && <ConfirmationModal modalData={confirmationModal}/>}
        </div>
    )
}

export default Sidebar
