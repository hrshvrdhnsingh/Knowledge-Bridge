import React from 'react'
import * as Icons from "react-icons/vsc";
import { NavLink, matchPath, useLocation } from 'react-router-dom';

const SidebarLink = ({link, iconName}) => {
    const Icon = Icons[iconName];
    const location = useLocation();
    
    const RouteMatch = (route) => {
        return matchPath({path: route}, location.pathname);
    }
    return (
        <NavLink to={link.path} className={`relative p-2 ${RouteMatch(link.path) ? "bg-yellow-500 bg-opacity-60 text-richblack-900" : "bg-opacity-0 text-zinc-500"} flex gap-4 sm:gap-1 justify-between`}>
            <span className={`absolute bg-yellow-500 left-0 top-0 h-full w-[4px] sm:w-[6px] ${RouteMatch(link.path) ? "opacity-100": "opacity-0"}`}></span>
            <div className='ml-1 flex items-center gap-6 sm:gap-1 sm:ml-0  text-lg sm:text-sm font-medium'>
                <Icon className='text-2xl sm:text-2xl' />
                <span className='sm:text-sm'>{link.name}</span>
            </div>
        </NavLink>
    )
}

export default SidebarLink
