import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";

import '../assets/stylesheets/App.css'; // Importing the CSS file for styling
import { useNavigate } from 'react-router-dom'; // Importing useNavigate hook for navigation
import Navbar from '../components/Navbar'; // Importing the Navbar component for navigation

const config = require("../config/config");

const ChangePassword = () => {
    const navigate = useNavigate(); // Hook for navigating to different routes

    async function getUserInfo() {
        const key = sessionStorage.getItem('sessionKey');
        try {
            if(key != null) {
                const loggedInResponse = await fetch(`${config.apiURL}/user/user-info?key=${encodeURIComponent(key)}`);
                return loggedInResponse.json();
            }
            return { success: false, message: "No session key found"}
        }
        catch (error) {
            console.error("Error: " + error);
            return { success: false, message: error.message };
        }

    }

    const [userInfo, setUserInfo] = useState("");
    const [error, setError] = useState("");

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    useEffect(() => {
        getUserInfo()
          .then(data => setUserInfo(data))
          .catch(error => console.error("Error: " + error));
    }, []);

    if (userInfo && !userInfo.success) {
        navigate('/login');
        return;
    }

    async function changePassword(event){
        event.preventDefault();
        if(oldPassword === "" || newPassword === "" || confirmPassword === ""){
            setError("Not all fields are filled.")
            return;
        }
        if(newPassword !== confirmPassword){
            setError("Passwords do not match.")
            return;
        }
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({"key": sessionStorage.getItem('sessionKey'), "oldPassword": oldPassword, "newPassword": newPassword})
        };
        const response = await fetch('http://localhost:5000/user/change-password', options);
        if ( !response.ok ) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        
        console.log(data);
        if(data.success && data.message.count != null && data.message.count > 0) {
            navigate('/profile');
            alert("Password changed successfully.");
            return;
        }
        setError("Current password incorrect.");
    }

    return(
        <div className="bg-black w-full">
        {/* Login form */}
            <div className=" flex items-center justify-center bg-black bg-login bg-cover h-screen w-screen">
                <div className=" flex flex-col items-center justify-center">
                    <div className="bg-white p-6 rounded-lg shadow-md w-72">
                        <h2 className="text-2xl font-semibold mb-4 text-center">Change Password</h2>
                        <form className="" onSubmit={changePassword}>
                            <div className="mb-4">
                                <label className="block text-gray-600 text-sm">Current Password</label>
                                <input
                                    className="w-full p-2 border border-gray rounded focus:outline-none focus:border-green-400"
                                    type="password"
                                    name="current_password"
                                    value={oldPassword}
                                    onChange={(e) => setOldPassword(e.target.value)}
                                />

                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-600 text-sm">New Password</label>
                                <input
                                    className="w-full p-2 border border-gray rounded focus:outline-none focus:border-green-400"
                                    type="password"
                                    name="new_password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-600 text-sm">Confirm New Password</label>
                                <input
                                    className="w-full p-2 border border-gray rounded focus:outline-none focus:border-green-400"
                                    type="password"
                                    name="new_password_confirm"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
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

export default ChangePassword;
