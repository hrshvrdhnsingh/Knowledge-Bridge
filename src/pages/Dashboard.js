import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/core/Dashboard.js/Sidebar';

const Dashboard = () => {
    const {loading : authLoading} = useSelector( (state) => state.auth);
    const {loading : profileLoading} = useSelector ((state) => state.profile);

    if(profileLoading || authLoading) {
        return (
            <div className=''>SPINNER</div>
        )
    }
    return (
        <div className='flex relative w-screen'>
            <Sidebar />
            <div className='overflow-auto'>
                <div className='w-11/12'>
                {/* the outlet element is just used to determine where child routes of parent routes should be displayed within the parent routes instead of a new page */}
                    <Outlet /> 
                </div>
            </div>
        </div>
    )
}

export default Dashboard
