import { useContext } from 'react';
import MainContext from '../MainContext';
import profileIcon from '../assets/images/profile-icon.png';
import React, {useState} from "react";
import { useNavigate } from 'react-router-dom';


const Navbar = () => {

    const navigate = useNavigate();

    const navigateToLogin = () => {
        navigate('/login');
    }

    return (
        <nav className="flex justify-between items-center">
            {/* main nav - centered */}
            <div className='text-center text-xl text-white flex-1 font-medium'>
                <a className="mr-8" href="">Home</a>
                <a className="mr-8" href="">About</a>
                <a href="http://localhost:3000/register">Trip Registration</a>
            </div>
            {/* profile - right */}
            <div className='absolute right-0'>
                <a href=""><img src={profileIcon} height={40} width={40} onClick ={navigateToLogin}/></a>
            </div>
        </nav>
    )
}

export default Navbar;