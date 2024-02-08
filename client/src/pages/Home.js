import '../assets/stylesheets/App.css';
import Navbar from '../components/Navbar';
import Login from './Login';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    
    const navigate = useNavigate();

    




    const navigateToLogin = () => {
        if(signIn){
            alert("user is signed in! this would go to the registration page")
        }
        else{
             navigate('/login');

        }
    }
    

    return (
        <div className="h-screen bg-cover bg-home bg-center bg-fixed bg-no-repeat hero p-8">
            <Navbar />
            <div className='flex flex-col items-center justify-center h-full'>
                <div className='text-5xl text-white font-semibold'>
                    Adirondack Mountains
                </div>
                <div className='text-9xl text-white font-bold'>
                    T.R.E.K.
                </div>
                <button className="text-white text-2xl font-bold py-2 px-4 border border-black rounded bg-green mt-20" onClick={navigateToLogin}>
                    Get Started
                </button>
            </div>
        </div>
    )
}

export default Home;