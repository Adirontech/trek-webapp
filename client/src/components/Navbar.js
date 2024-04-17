import { useContext, useEffect } from 'react';
import MainContext from '../MainContext';
import profileIcon from '../assets/images/profile-icon.png';
import React, {useRef, useState} from "react";
import { useNavigate } from 'react-router-dom';

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
                <a className="mr-8" href="/">Home</a>
                <a className="mr-8" href="/">About</a>
                <a href="http://localhost:3000/register">Trip Registration</a>
                {allocator && <a className="ml-8" href="http://localhost:3000/landAllocation">Land Allocation</a>}
            </div>
            {/* profile - right */}
            <div className=''>
                <a href="http://localhost:3000/profile"><img src={profileIcon} height={40} width={40}/></a>
            </div>
        </nav>
    )
}

export default Navbar;