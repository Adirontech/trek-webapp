/**
 * Register.js - Component for registering trip leader information.
 * This component allows users to register trip leader information, including personal details and trip information.
 * It includes form fields for first name, last name, street, city, state, zip code, phone, trip purpose, starting point, number of nights, party size, and start date.
 * Users can also select points of interest for their trip.
 */

 import React from "react"; // Importing React
 import { useState, useEffect } from "react"; // Importing useState and useEffect hooks
 import Navbar from "../components/Navbar"; // Importing Navbar component
 import StateSelect from "../components/StateSelect"; // Importing StateSelect component
 import POISelect from "../components/POISelect"; // Importing POISelect component
 import { useNavigate, useLocation } from 'react-router-dom';
 
 /**
  * Register - Functional component for registering trip leader information.
  * @returns {JSX.Element} - Rendered component
  */
 const Register = () => {
     const navigate = useNavigate(); // Hook for navigating to different routes
     const location = useLocation(); // Hook for getting the current location

     const searchParams = new URLSearchParams(location.search);
     const tripConfirmCode = searchParams.get('trip');

     // State variables for error handling, creation status, POI key, phone hover state, and form data
     const [error, setError] = useState(false);
     const [created, setCreated] = useState(false);
     const [poiKey, setPoiKey] = useState(Math.floor(Math.random()) * 100 + 1);
     const [phoneHover, setPhoneHover] = useState(false);
     const [isFirstRender, setIsFirstRender] = useState(true);
     const [registerData, setRegisterData] = useState({
         first_name: '',
         last_name: '',
         street: '',
         city: '',
         state: '',
         zip_code: '',
         date: '',
         start: '',
         pois: [],
         purpose: '',
         phone: '',
         duration: '',
         party_size: '',
         session_key: ''
     });
     const [pois, setPois] = useState([]);
     const [trailHeads, setTrailHeads] = useState([]);
     const [showTrailHeads, setShownTrailHeads] = useState([]);
 
     

     // Effect hook to validate access to edit a currently existing trip
     useEffect(() => {
        const codeAccessValidate = async () => {
            const key = sessionStorage.getItem('sessionKey');

            const response = await fetch(`${process.env.REACT_APP_API_URL}/trips/belongs-to-key?code=${tripConfirmCode}&key=${key}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
    
            const tripAccessValidResponse = await response.json();
            if (!tripAccessValidResponse.belongs_to) {
               navigate('/');
            }

            /* Page has been loaded with proper access to edit a currently existing trip */
            const tripDataResponse = await fetch(`${process.env.REACT_APP_API_URL}/trips/info-from-code-key?code=${tripConfirmCode}&key=${key}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const existingTripData = await tripDataResponse.json();
            if (existingTripData) {
                
                function formatTimestamp(timestamp) {
                    const date = new Date(timestamp);
                    const formattedDate = date.toISOString().slice(0,10);
                    return formattedDate;
                }

                setRegisterData({
                    first_name: existingTripData.first_name,
                    last_name: existingTripData.last_name,
                    street: existingTripData.street,
                    city: existingTripData.city,
                    state: existingTripData.state,
                    zip_code: existingTripData.zip_code,
                    date: formatTimestamp(existingTripData.date),
                    start: existingTripData.start,
                    pois: (existingTripData.destinations.join(",")),
                    purpose: existingTripData.purpose,
                    phone: existingTripData.phone,
                    duration: existingTripData.duration,
                    party_size: existingTripData.party_size,
                    session_key: key
                });
            }
        }
        if (tripConfirmCode != null) {
           codeAccessValidate();
        }
    }, [tripConfirmCode]);

     // Effect hook to fetch user info and update session key
     useEffect(() => {
         const key = sessionStorage.getItem('sessionKey');
         if(key){
             setRegisterData((json) => ({
                 ...json,
                 session_key: key,
             }));
         }
         if(isFirstRender){
             setIsFirstRender(false);
             getUserInfo();
             getPois();
         }
     }, [registerData.session_key]);
     
     // Function to handle form field changes
     const change = (e) => {
         const {name, value} = e.target;
         setRegisterData((json) => ({
             ...json,
             [name]: value,
         }));
         setError(false);
         setCreated(false);
     };
      
     // Function to handle mouse enter event for phone info icon
     const phoneEnter = (e) => {
         setPhoneHover(true);
     };
 
     // Function to handle mouse leave event for phone info icon
     const phoneLeave = (e) => {
         setPhoneHover(false);
     };
 
     // Function to handle changes in selected POIs
     const POIChange = (e) => {
         let points = '';
         let areas = []; // the area(s) the POI(s) in
         let i = 0;
         let newTrailHeads = []; // resetting shownTrailHeads to those in the same wilderness area as POI(s)
         e.forEach(element => {
             if(i === 0){
                 points = element.value;
                areas.push(element.area);
             }else{
                points = points + ',' + element.value;
                areas.push(element.area);
             }
             i++;
         });
         trailHeads.forEach(t => {
            if(areas.includes(t.area)){
                newTrailHeads.push(t);
            }
         });
         if(newTrailHeads.length > 0){
            setShownTrailHeads(newTrailHeads);
         }
         setRegisterData((json) => ({
             ...json,
             "pois": points
         }));
     };
 
     // Function to validate registration form
     const validateRegister = () => {
         let isValid = true;
         if( !registerData.first_name || !registerData.last_name || !registerData.street || !registerData.city || !registerData.state || !registerData.zip_code || !registerData.pois || !registerData.duration || !registerData.party_size || !registerData.date ){
             isValid = false;
         }
         if(!isValid){
             setError(true);
         }
         return isValid;
     };
 
     // Function to clear registration form
     const clearForm = () => {
         setRegisterData({
             first_name: '',
             last_name: '',
             street: '',
             city: '',
             state: '',
             zip_code: '',
             date: '',
             start: '',
             pois: '',
             purpose: '',
             phone: '',
             duration: '',
             party_size: '',
             session_key: ''
         });
         setPoiKey(Math.floor(Math.random() * 100) + 1);
     };
 
     // Function to fetch user info
     async function getUserInfo() {
         const key = sessionStorage.getItem('sessionKey');
         try{
             const response = await fetch(`http://localhost:5000/user/user-info?key=${encodeURIComponent(key)}`);
             if ( !response.ok ) {
                 throw new Error(`HTTP error! Status: ${response.status}`);
             }
             const data = await response.json();
             if(data){
                 let dataArray = String(data.data).replace(/^\(|\)$/g, '').replace(/"/g, '').split(',');
                 setRegisterData({
                     first_name: dataArray[1],
                     last_name: dataArray[2],
                     street: dataArray[3],
                     city: dataArray[4],
                     state: dataArray[5],
                     zip_code: dataArray[6],
                     date: '',
                     start: '',
                     pois: '',
                     purpose: '',
                     phone: dataArray[7],
                     duration: '',
                     party_size: '',
                     session_key: ''
                 });
             }
         } catch ( error ) {
             console.log('Error:', error);
         }
     };

     //Function to retrieve POIs
     async function getPois() {
        try {
            const response = await fetch('http://localhost:5000/poi');
            if (!response.ok){
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const pois = await response.json();
            if(pois){
                let poiOptions = [];
                let trailHeads = [];
                pois.forEach(p => { // converts pois json to format acceptable by POISelect
                    if(p.type !== 'Trailhead'){
                        poiOptions.push({
                            label: p.name,
                            value: p.id,
                            area: p.wilderness_area
                        });
                    }else{
                        trailHeads.push({
                            label: p.name,
                            value: p.id,
                            area: p.wilderness_area
                        });
                    }
                });
                setPois(poiOptions);
                setTrailHeads(trailHeads);
                setShownTrailHeads(trailHeads);
            }
        } catch( error ){
            console.log('Error: ', error);
        }
     };
 
     // Function to register trip
     async function register(e) {
         e.preventDefault();
         if( validateRegister() ){
             try{
                 if(tripConfirmCode == null){
                    const options = {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(registerData)
                    };
                    const response = await fetch(`${process.env.REACT_APP_API_URL}/trips`, options);
                    if ( !response.ok ) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    const data = await response.json();
                    if(data.message === 'Trip Created'){
                        const key = sessionStorage.getItem('sessionKey');
                        setCreated(true);
                        clearForm();
                        if (key != null) {
                            navigate('/profile');
                        }
                        else {
                            navigate('/');
                        }
                    }
                 }
                 else {
                    const key = sessionStorage.getItem('sessionKey');
                    const options = {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(registerData)
                    }
                    const response = await fetch(`${process.env.REACT_APP_API_URL}/trips?code=${tripConfirmCode}&key=${key}`, options);
                    if ( !response.ok ) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    const data = await response.json();
                    if(data.message === 'Trip Updated'){
                        setCreated(true);
                        clearForm();
                        navigate('/profile');
                    }
                 }
                 
             } catch ( error ) {
                 console.log('Error:', error);
             }
         }
     };
 
     // Render the component
     return (
         <div>
             <div className="md:h-screen bg-cover bg-home bg-center bg-fixed bg-no-repeat hero p-8">
                 <Navbar />
                     <div className="flex flex-col items-start justify-center mt-10 w-full sm:w-9/12 xl:w-5/12 ml-auto mr-auto bg-white p-4 rounded-lg shadow-md">
                         <h1 className="text-xl mr-auto ml-auto relative bottom-1">Trip Leader Information</h1>
                         <div className="flex flex-col items-start justify-center w-full">
                             <div className="flex flex-col md:flex-row justify-start my-2 w-full">
                                 {/* Form fields for first name and last name */}
                                 <div className="flex flex-col md:ml-1 md:mr-3 w-full md:w-3/6">
                                     <div className="flex flex-row justify-between">
                                         <label className="text-sm">First Name</label>
                                         <div className="text-red">*</div>
                                     </div>
                                     <input
                                         className="border border-gray rounded focus:outline-none focus:border-green-400"
                                         name="first_name"
                                         type="text"
                                         required
                                         value={registerData.first_name}
                                         onChange={change}
                                     />
                                 </div>
                                 <div className="flex flex-col md:ml-3 w-full md:w-3/6">
                                     <div className="flex flex-row justify-between">
                                         <label className="text-sm">Last Name</label>
                                         <div className="text-red">*</div>
                                     </div>
                                     <input
                                         className="border border-gray rounded focus:outline-none focus:border-green-400"
                                         name="last_name"
                                         type="text"
                                         value={registerData.last_name}
                                         onChange={change}
                                     />
                                 </div>
                             </div>
                             {/* Form fields for street, city, state, zip code, and phone */}
                             <div className="flex md:flex-row flex-col justify-start md:my-2 w-full">
                                 <div className="flex flex-col md:ml-1 md:mr-3 w-full md:w-3/6">
                                     <div className="flex flex-row justify-between">
                                         <label className="text-sm">Street</label>
                                         <div className="text-red">*</div>
                                     </div>
                                     <input
                                         className="border border-gray rounded focus:outline-none focus:border-green-400"
                                         name="street"
                                         type="text"
                                         value={registerData.street}
                                         onChange={change}
                                     />
                                 </div>
                                 <div className="flex flex-col md:ml-3 md:mr-1 md:w-3/6 w-full">
                                     <div className="flex flex-row justify-between">
                                         <label className="text-sm">City</label>
                                         <div className="text-red">*</div>
                                     </div>
                                     <input
                                         className="border border-gray rounded focus:outline-none focus:border-green-400"
                                         name="city"
                                         type="text"
                                         value={registerData.city}
                                         onChange={change}
                                     />
                                 </div>
                             </div>
                             {/* Form fields for state, zip code, and phone */}
                             <div className="flex md:flex-row flex-col justify-start md:my-2 w-full">
                                 {/* State selection dropdown */}
                                 <StateSelect value={registerData.state} handleChange={change}/>
                                 <div className="flex flex-col md:ml-1 md:mr-1 xl:ml-1 xl:mr-1 2xl:ml-4 2xl:mr-4 md:w-2/5 w-full">
                                     <div className="flex flex-row justify-between">
                                         <label className="text-sm">Zip Code</label>
                                         <div className="text-red">*</div>
                                     </div>
                                     <input
                                         className="border border-gray rounded focus:outline-none focus:border-green-400"
                                         name="zip_code"
                                         type="number"
                                         value={registerData.zip_code}
                                         onChange={change}
                                     />
                                 </div>
                                 <div className="flex flex-col 2xl:ml-4 md:ml-1 md:mr-1 relative top-1 md:w-2/5 w-full">
                                     <div className="flex flex-row justify-between">
                                         <label className="text-sm">Phone</label>
                                         {/* Phone info icon */}
                                         <svg onMouseEnter={phoneEnter} onMouseLeave={phoneLeave} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 z-10">
                                             <path fillRule="evenodd" d="M15 8A7 7 0 1 1 1 8a7 7 0 0 1 14 0ZM9 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM6.75 8a.75.75 0 0 0 0 1.5h.75v1.75a.75.75 0 0 0 1.5 0v-2.5A.75.75 0 0 0 8.25 8h-1.5Z" clipRule="evenodd" />
                                         </svg>
                                     </div>
                                     <input
                                         className="border border-gray rounded focus:outline-none focus:border-green-400 relative top-1"
                                         name="phone"
                                         placeholder="XXX-XXX-XXXX"
                                         type="tel"
                                         value={registerData.phone}
                                         onChange={change}
                                     />
                                     {/* Phone info message */}
                                     {phoneHover ? 
                                         <div className="z-20 text-xs text-red">
                                             We recommend providing your cell-phone number for safety purposes
                                         </div>
                                     :
                                         <div></div>
                                     }
                                 </div>
                             </div>
                         </div>
                         <h2 className="text-xl ml-auto mr-auto">Trip Information</h2>
                             <div className="flex flex-col items-start justify-center w-full">
                                 {/* Form fields for trip purpose, POIs, starting point, number of nights, party size, and start date */}
                                 <div className="flex flex-row justify-start my-2 w-full">
                                     <textarea placeholder="Trip Purpose" value={registerData.purpose} name="purpose" onChange={change} className="border border-gray rounded focus:outline-none focus:border-green-400 w-full"/>
                                 </div>
                                 <div className="flex flex-row justify-start my-2 w-full">
                                     <div key={poiKey} className=" md:w-3/5 w-full md:mr-4">
                                         {/* POI selection component */}
                                         <POISelect pois={pois} handleChange={POIChange} preselected={registerData.pois}/>
                                     </div>
                                     <div className="flex flex-col md:w-2/5 w-full">
                                         <div className="flex flex-row justify-between">
                                             <label className="text-sm">Starting Point</label>
                                             <div className="text-red">*</div>
                                         </div>
                                         {/* Starting point selection dropdown */}
                                         <select name="start" value={registerData.start} onChange={change} className="border border-gray rounded focus:outline-none focus:border-green-400">
                                             <option value='' disabled selected></option>
                                             {showTrailHeads.map((th, index) => (
                                                <option key={index} value={th.value}>{th.label}</option>
                                             ))}
                                         </select>
                                     </div>
                                 </div>
                                 <div className="flex md:flex-row flex-col justify-start md:my-2 w-full">
                                     {/* Form fields for number of nights, party size, and start date */}
                                     <div className="flex flex-col md:ml-1 md:mr-1 2xl:mr-4 md:w-2/6 w-full">
                                         <div className="flex flex-row justify-between">
                                                 <label className="text-sm">Number of Nights</label>
                                                 <div className="text-red">*</div>
                                         </div>
                                         <input
                                             className="border border-gray rounded focus:outline-none focus:border-green-400"
                                             type="number"
                                             min={0}
                                             onChange={change}
                                             name="duration"
                                             value={registerData.duration}
                                         />
                                     </div>
                                     <div className="flex flex-col md:ml-1 md:mr-1 xl:ml-1 xl:mr-1 2xl:ml-4 2xl:mr-4 md:w-2/6 w-full">
                                         <div className="flex flex-row justify-between leading-normal">
                                                 <label className="text-sm">Party Size</label>
                                                 <div className="text-red">*</div>
                                         </div>
                                         <input
                                             className="border border-gray rounded focus:outline-none focus:border-green-400"
                                             type="number"
                                             min={1}
                                             onChange={change}
                                             name="party_size"
                                             value={registerData.party_size}
                                         />
                                     </div>               
                                     <div className="flex flex-col 2xl:ml-4 md:ml-1 md:mr-1 relative top-1 md:w-2/6 w-full">
                                         <div className="flex flex-row justify-between leading-normal relative bottom-1">
                                                 <label className="text-sm">Start Date</label>
                                                 <div className="text-red">*</div>
                                         </div>
                                         <input
                                             className="border border-gray rounded focus:outline-none focus:border-green-400 relative bottom-1"
                                             type="date"
                                             placeholder="Date"
                                             onChange={change}
                                             name="date"
                                             value={registerData.date}
                                         />
                                     </div>
                                 </div>
                                 {/* Error message for required fields */}
                                 {error ?
                                 <div className="flex flex-row text-sm text-red justify-center mt-2 w-full">
                                     Please provide the required fields indicated by the red asterisk *
                                 </div>
                                 :
                                 <div></div>
                                 }
                                 {/* Success message upon successful registration */}
                                 {created ? 
                                 <div className="flex flex-row text-sm text-green justify-center w-full">
                                     Trip Registered
                                 </div>
                                 :
                                 <div></div>
                                 }
                                 {/* Button to submit registration */}
                                 <div className="flex flex-row justify-center mt-2 w-full">
                                     <button onClick={register} className="bg-green text-white rounded hover:bg-green w-2/5 relative top-1 h-8">Submit</button>
                                 </div>
                             </div>
                     </div>
             </div>
     </div>
     );
 }
 
 export default Register;
 