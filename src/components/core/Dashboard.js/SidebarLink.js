import React from 'react'
import * as Icons from "react-icons/vsc";
import { useDispatch } from 'react-redux';
import { NavLink, matchPath, matchRoutes, useLocation } from 'react-router-dom';

const SidebarLink = ({link, iconName}) => {
    const Icon = Icons[iconName];
    const location = useLocation();
    const dispatch = useDispatch();

    const RouteMatch = (route) => {
        return matchPath({path: route}, location.pathname);
    }
    return (
        <NavLink to={link.path} className={`relative p-2 ${RouteMatch(link.path) ? "bg-yellow-500 bg-opacity-60 text-richblack-900" : "bg-opacity-0 text-zinc-500"} flex gap-4 justify-between`}>
            <span className={`absolute bg-yellow-500 left-0 top-0 h-full w-[4px] ${RouteMatch(link.path) ? "opacity-100": "opacity-0"}`}></span>
            <div className='ml-1 flex items-center gap-6 text-lg font-medium'>
                <Icon className='' />
                <span>{link.name}</span>
            </div>
        </NavLink>
    )
}

export default SidebarLink
