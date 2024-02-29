import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const config = require("../config/config");

const Profile = () => {
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

    async function getUserTrips() {
        const key = sessionStorage.getItem('sessionKey');
        try {
            if(key != null) {
                const loggedInResponse = await fetch(`${config.apiURL}/trips/from-key?key=${encodeURIComponent(key)}`);
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

    if (userInfo && !userInfo.success) {
        return <Navigate to='/login' />
    }
    if (userInfo){
        const dataArray = userInfo.data.slice(1, -1).split(",");
        let userData = {
            user_id: parseInt(dataArray[0]),
            first_name: dataArray[1],
            last_name: dataArray[2],
            address: dataArray[3],
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
            <div className="bg-gradient-to-b from-green-800 to-green-950 h-screen">
                <p>
                    User view data:
                </p>
                {userData && <pre>{JSON.stringify(userData, null, 2)}</pre>}
                {userTrips && <pre>{JSON.stringify(userTrips, null, 2)}</pre>}
            </div>
        );
    }
}

export default Profile;
