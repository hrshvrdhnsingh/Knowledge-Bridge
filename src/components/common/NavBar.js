import React, { useEffect, useState } from 'react'
import Logo from '../../assets/Logo/Widom.png'
import './Common.css';
import { Link, matchPath, useLocation } from 'react-router-dom';
import { NavbarLinks } from '../../data/navbar-links';
import { useSelector } from 'react-redux';
import { FiShoppingCart } from "react-icons/fi";
import ProfileDropDown from '../core/Authorisation/ProfileDropDown';
import { apiConnector } from '../../services/apiConnector';
import {categories} from '../../services/apis'; 
import { IoIosArrowDropdown } from "react-icons/io";
import { ACCOUNT_TYPE } from "../../utils/constants"
 
/* const subLinks = [
    {
        title: "Python",
        link: "/catalog/python"
    },
    {
        title: "Web Development",
        link: "/catalog/web-development"
    },

] */

const NavBar = () => {
    const {token} = useSelector( (state) => state.auth );
    const {user} = useSelector( (state) => state.profile );
    const {totalItems} = useSelector( (state) => state.cart );
    const location = useLocation();
    //To highlght the navbar option that we are on
    const RouteMatch = (route) => {  
        return route ? matchPath({path:route}, location.pathname) : false;
    }

    const [subLinks, setSubLinks] = useState([]);
    const [loading, setLoading] = useState();

    const fetchSubLinks = async() => {
        setLoading(true)
        try{
            const result = await apiConnector("GET", categories.CATEGORIES_API);
            console.log("Printing SubLinks result : ", result);
            setSubLinks(result.data.allCategories)
        }
        catch(err) {
            console.log(err.message);
            console.log("Could not fetch the category list.")
        }
        setLoading(false)
    }
    
    useEffect( () => {
        fetchSubLinks();
    }, []);

    return (
        <div className='relative w-full h-[9vh] flex justify-evenly items-center navbar border-b-2 border-richblack-700'>
            <div className='w-3/12 h-full overflow-hidden'><Link to="/"><img className='object-cover' src={Logo} alt='Logo'/></Link></div>
            <nav>
                <ul className='flex gap-4 text-slate-200 font-base text-lg'>
                    {
                        NavbarLinks.map((link, index) => {
                            return (
                                <li key={index}>
                                    <Link to={link?.path}><p className={` ${RouteMatch(link?.path) ? "text-slate-400" : "text-slate-200"}`}>{link.title}</p></Link>
                                </li>
                            )
                        })
                    }
                </ul>
            </nav>
            {/*  Login/ Sign-up/ Dashboard */}
            <div className='flex flex-row justify-center items-center gap-6 text-slate-200'>
                {/* For logged-in student */}
                {
                    user && user?.accountType !== "Instructor" && (
                        <Link to="/dashboard/cart" className='relative p-2'>
                            <FiShoppingCart className='text-zinc-400 text-xl'/>
                            {
                                totalItems > 0 && (
                                    <span className='absolute z-100 top-[-10%] left-[70%] text-cyan-300'> {totalItems} </span>
                                )
                            }
                        </Link>
                    )
                }
                {/* For a token to not exist in the local storage*/}
                {
                    token === null && (
                        <Link to="/login">
                        <div className='p-2 px-3 bg-richblack-500 font-semibold rounded-xl hover:scale-95 duration-300'>Login</div>
                        </Link>
                    )
                }
                {
                    token === null && (
                        <Link to="/signup">
                        <div className='p-2 px-3 bg-richblack-500 font-semibold rounded-xl hover:scale-95 duration-300'>Sign up</div>
                        </Link>
                    )
                }
                {/* Profile picture shown in the dashbard.*/}
                {
                    token !== null && <ProfileDropDown />
                }
            </div>
        </div>
    )
}

export default NavBar
