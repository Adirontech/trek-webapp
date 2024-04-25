import { useContext, useEffect } from 'react';
import MainContext from '../MainContext';
import profileIcon from '../assets/images/profile-icon.png';
import React, {useRef, useState} from "react";
import { Link, useNavigate } from 'react-router-dom';

const config = require("../config/config");

const Navbar = () => {
    const isFirstRender = useRef(true);
    const [allocator, setAllocator] = useState(false);
    const navigate = useNavigate();

    const navigateToLogin = () => {
        navigate('/login');
    }

    useEffect(() => {
        isAllocator();
        if(isFirstRender.current){
            isFirstRender.current = false;  
            isAllocator();
        }
    }, []);

    const isAllocator = async () => {
        const key = sessionStorage.getItem('sessionKey');
        if(key === null){
            navigateToLogin();
            return false;
        }else{
            const result = await fetch(`${config.apiURL}/user/isAllocator?key=${key}`);
            const res = await result.json();
            setAllocator(res.data.is_allocator);
        }
    }

    return (
        <nav className="flex justify-between items-center">
            {/* main nav - centered */}
            <div className='text-center text-xl text-white flex-1 font-medium'>
                <Link to="/">Home</Link>
                <Link className="ml-8" to="/register">Trip Registration</Link>
                {allocator && <Link className="ml-8" to="/landAllocation">Land Allocation</Link>}
                {allocator && <Link className="ml-8" to="/permissions">User Permissions</Link>}
            </div>
            {/* profile - right */}
            <div className=''>
                <a href={`${config.apiURL}/profile`}><img src={profileIcon} height={40} width={40}/></a>
            </div>
        </nav>
    )
}

export default Navbar;