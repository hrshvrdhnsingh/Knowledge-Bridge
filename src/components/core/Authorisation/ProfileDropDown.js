/* eslint-disable no-unused-vars */
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import useOnClickOutside from "../../../hooks/usOnClickOutside";
import { logout } from "../../../services/operations/authAPI";

const ProfileDropDown = () => {
    const { user } = useSelector((state) => state.profile);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const ref = useRef(null);
    useOnClickOutside(ref, () => setOpen(false));

    if (!user) return null;

    return (
        <Link to="/dashboard/my-profile" className=" w-max rounded-full border-richblack-600">
            <img
                src={user?.image}
                alt={`profile-${user?.firstName}`}
                className="aspect-square w-[38px] rounded-full object-cover"
            />
        </Link>
    );
};

export default ProfileDropDown;
