import React, { useEffect, useState } from "react";

import '../assets/stylesheets/App.css'; // Importing the CSS file for styling
import { useNavigate } from 'react-router-dom'; // Importing useNavigate hook for navigation

const config = require("../config/config");

const ProfileTerms = () => {
    const navigate = useNavigate(); // Hook for navigating to different routes

    async function getAllocatorInfo() {
        const key = sessionStorage.getItem('sessionKey');
        try {
            if(key != null) {
                const loggedInResponse = await fetch(`${config.apiURL}/user/isAllocator?key=${encodeURIComponent(key)}`);
                return loggedInResponse.json();
            }
            return { success: false, message: "No session key found"}
        }
        catch (error) {
            console.error("Error: " + error);
            return { success: false, message: error.message };
        }

    }

    const [allocatorInfo, setAllocatorInfo] = useState("");
    const [error, setError] = useState("");

    const [allocatorUser, setAllocatorUser] = useState("");

    useEffect(() => {
        getAllocatorInfo()
          .then(data => setAllocatorInfo(data))
          .catch(error => console.error("Error: " + error));
    }, []);

    if (allocatorInfo && !allocatorInfo.success) {
        navigate('/');
        return;
    }

    async function setAllocator(event){
        event.preventDefault();
        if(allocatorUser === ""){
            setError("Field not filled out.")
            return;
        }
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({"key": sessionStorage.getItem('sessionKey'), "allocatorUser": allocatorUser})
        };
        const response = await fetch(config.apiURL + `/user/make-allocator`, options);
        if ( !response.ok ) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        
        if(data.success) {
            alert(`${allocatorUser} is now a land allocator.`);
            return;
        }
        setError("An error occurred.");
    }

    return(
        <div className="bg-black w-full">
        {/* Login form */}
            <div className=" flex items-center justify-center bg-black bg-login bg-cover h-screen w-screen">
                <div className=" flex flex-col items-center justify-center">
                    <div className="bg-white p-6 rounded-lg shadow-md w-72">
                        <h2 className="text-2xl font-semibold mb-4 text-center">Make Land Allocator</h2>
                        <form className="" onSubmit={setAllocator}>
                            <div className="mb-4">
                                <label className="block text-gray-600 text-sm">Username</label>
                                <input
                                    className="w-full p-2 border border-gray rounded focus:outline-none focus:border-green-400"
                                    type="text"
                                    name="allocator_username"
                                    value={allocatorUser}
                                    onChange={(e) => setAllocatorUser(e.target.value)}
                                />
                            </div>
                            <div className="pb-2 text-xs text-red">{error}</div>
                            <button className="w-full bg-green text-white p-2 rounded hover:bg-green" type="submit">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfileTerms;
