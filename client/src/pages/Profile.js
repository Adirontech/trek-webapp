import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";

import '../assets/stylesheets/App.css'; // Importing the CSS file for styling
import Navbar from '../components/Navbar'; // Importing the Navbar component for navigation

const Profile = () => {
    async function getUserInfo() {
        const key = sessionStorage.getItem('sessionKey');
        try {
            if(key != null) {
                const loggedInResponse = await fetch(`${process.env.REACT_APP_API_URL}/user/user-info?key=${encodeURIComponent(key)}`);
                return loggedInResponse.json();
            }
            return { success: false, message: "No session key found"}
        }
        catch (error) {
            console.error("Error: " + error);
            return { success: false, message: error.message };
        }
    }

    async function getUserTrips() {
        const key = sessionStorage.getItem('sessionKey');
        try {
            if(key != null) {
                const loggedInResponse = await fetch(`${process.env.REACT_APP_API_URL}/trips/info-from-key?key=${encodeURIComponent(key)}`);
                return loggedInResponse.json();
            }
            return { success: false, message: "No session key found"}
        }
        catch (error) {
            console.error("Error: " + error);
            return { success: false, message: error.message };
        }
    }

    const [userInfo, setUserInfo] = useState(null);
    const [userTrips, setUserTrips] = useState(null);

    useEffect(() => {
        getUserInfo()
          .then(data => setUserInfo(data))
          .catch(error => console.error("Error: " + error));
    }, []);

    useEffect(() => {
        getUserTrips()
            .then(data => setUserTrips(data))
            .catch(error => console.error("Error: " + error));
    }, []);

    function formatTimestamp(timestamp) {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: true };
        const date = new Date(timestamp);
        const formattedDate = date.toLocaleString('en-US', options).replace(',', '');
    
        return formattedDate;
    }

    if (userInfo && !userInfo.success) {
        return <Navigate to='/login' />
    }
    if (userInfo){
        const dataArray = userInfo.data.slice(1, -1).split(",");
        let userData = {
            user_id: parseInt(dataArray[0]),
            first_name: dataArray[1],
            last_name: dataArray[2],
            address: dataArray[3] && dataArray[3].startsWith('"') && dataArray[3].endsWith('"') ? dataArray[3].slice(1, -1) : dataArray[3],
            city: dataArray[4],
            state: dataArray[5],
            zip: dataArray[6],
            phone: dataArray[7]
        }

        let tripList = [];

        if (userTrips) {
            tripList = [userTrips];
        }

        return (
            <div className="h-screen bg-cover bg-home bg-center bg-fixed bg-no-repeat hero p-8">
                {/* Rendering the navigation bar */}
                <Navbar />
                <div className="flex flex-col items-start justify-center mt-10 w-full sm:w-11/12 ml-auto mr-auto bg-white p-4 rounded-lg shadow-md">
                    <div className='flex flex-row items-start w-full'>
                        <div className="w-1/3">
                            <div className="bg-gray bg-opacity-50 m-1 rounded-md">
                                <h1 className="text-3xl font-bold text-center">
                                {userData && userData['first_name'] && userData['last_name'] && `${userData['first_name']} ${userData['last_name']}`}
                                </h1>
                                {userData && 
                                    <form className="w-11/12 m-2 pb-2">
                                        <div className="flex w-full m-1">
                                            <label className="w-1/2 mr-auto text-center">First Name</label>
                                            <input className="w-1/2 ml-auto" defaultValue={userData['first_name']} />
                                        </div>
                                        <div className="flex w-full m-1">
                                            <label className="w-1/2 mr-auto text-center">Last Name</label>
                                            <input className="w-1/2 ml-auto" defaultValue={userData['last_name']} />
                                        </div>
                                        <div className="flex w-full m-1">
                                            <label className="w-1/2 mr-auto text-center">Address</label>
                                            <input className="w-1/2 ml-auto" defaultValue={userData['address']} />
                                        </div>
                                        <div className="flex w-full m-1">
                                            <label className="w-1/2 mr-auto text-center">City</label>
                                            <input className="w-1/2 ml-auto" defaultValue={userData['city']} />
                                        </div>
                                        <div className="flex w-full m-1">
                                            <label className="w-1/2 mr-auto text-center">State</label>
                                            <input className="w-1/2 ml-auto" defaultValue={userData['state']} />
                                        </div>
                                        <div className="flex w-full m-1">
                                            <label className="w-1/2 mr-auto text-center">Zip</label>
                                            <input className="w-1/2 ml-auto" defaultValue={userData['zip']} />
                                        </div>
                                        <div className="flex w-full m-1">
                                            <label className="w-1/2 mr-auto text-center">Phone</label>
                                            <input className="w-1/2 ml-auto" defaultValue={userData['phone']} />
                                        </div>
                                        <button className="mx-auto mt-3 block bg-green pl-3 pr-3 rounded-md text-white" type="submit">
                                            Update
                                        </button>
                                    </form>
                                }
                            </div>
                            <div className="bg-gray bg-opacity-50 m-1 rounded-md p-2">
                                <h1 className="text-2xl font-bold text-center">Profile Options</h1>
                                <Link to='/change-password'>
                                    <button className="mx-auto mt-3 block bg-green pl-3 pr-3 rounded-md text-white" type="submit">
                                        Change Password
                                    </button>
                                </Link>
                            </div>
                        </div>
                        <div className="w-2/3 bg-gray bg-opacity-50 m-1 rounded-md">
                            {userTrips && 
                                <table className="w-11/12 mx-auto m-2 rounded-sm border border-black">
                                    <thead className="bg-gray">
                                        <tr className="border border-b-1 border-black">
                                            {/* Add table headers as needed */}
                                            <th>ID</th>
                                            <th>Date</th>
                                            <th>Start</th>
                                            <th>Destinations</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {userTrips.map((trip, index) => (
                                            <tr key={index} className={index % 2 === 0 ? 'bg-gray bg-opacity-80' : ''}>
                                                <td className="w-1/12 text-center border-r border-black">{trip.confirm_code}</td>
                                                <td className="w-1/4 text-center border-r border-black">{formatTimestamp(trip.date)}</td>
                                                <td className="w-1/6 text-center border-r border-black">{trip.start}</td>
                                                <td className="w-1/2 text-center">{trip.destinations}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            }
                            {/* {userTrips && <pre>{JSON.stringify(userTrips, null, 2)}</pre>} */}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Profile;
