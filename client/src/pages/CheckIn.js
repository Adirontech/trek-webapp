import React, { useState } from "react";
import awaLogo from "../assets/images/awa-logo.png";

const CheckIn = () => {
    const [checkinCode, setCheckinCode] = useState("");
    async function checkIn() {
      // TODO make checkin function


    // returns null if doesnt exist
    // returns false if already checked in
    // returns true for check in
    }

    return (
        <div className="bg-black w-full">
            <div className=" flex items-center justify-center bg-black bg-checkin bg-cover h-screen w-screen">
                <div className=" flex flex-col items-center justify-center">
                    <div className="bg-white p-6 rounded-lg shadow-md w-72">
                        <h1 className="text-2xl font-semibold mb-4 text-center">Check In</h1>
                        <img  src={awaLogo} alt="AWA Logo"/>

                        <form onSubmit={checkIn} className="pt-4">
                            <div className="mb-4">
                                <label className="block text-gray-600 text-sm">Confirmation Code</label>
                                <input
                                    className="w-full p-2 border border-gray rounded focus:outline-none focus:border-green-400"
                                    type="text"
                                    name="current_password"
                                    value={checkinCode}
                                    onChange={(e) => setCheckinCode(e.target.value)}
                                />
                            </div>

                            {/* display info about how to get checkin/confirmation code */}
                            <div className="flex flex-row">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-8 h-4 z-10 pr-1">
                                    <path fillRule="evenodd" d="M15 8A7 7 0 1 1 1 8a7 7 0 0 1 14 0ZM9 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM6.75 8a.75.75 0 0 0 0 1.5h.75v1.75a.75.75 0 0 0 1.5 0v-2.5A.75.75 0 0 0 8.25 8h-1.5Z" clipRule="evenodd" />
                                </svg>
                                <div className="z-20 text-xs text-red pb-4">Login to your account and navigate to your profile page to view your confirmation code.</div>
                            </div>
                            
                            <button className="w-full bg-green text-white p-2 rounded hover:bg-green" type="submit">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CheckIn;