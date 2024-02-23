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
 
 /**
  * Register - Functional component for registering trip leader information.
  * @returns {JSX.Element} - Rendered component
  */
 const Register = () => {
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
         pois: '',
         purpose: '',
         phone: '',
         duration: '',
         party_size: '',
         session_key: ''
     });
 
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
         let i = 0;
         e.forEach(element => {
             if(i === 0){
                 points = element.value;
             }else{
                 points = points + ',' + element.value;
             }
             i++;
         });
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
 
     // Function to register trip
     async function register(e) {
         e.preventDefault();
         if( validateRegister() ){
             try{
                 const options = {
                     method: 'POST',
                     headers: { 'Content-Type': 'application/json' },
                     body: JSON.stringify(registerData)
                 };
                 const response = await fetch('http://172.27.48.1:5000/trips/', options);
                 if ( !response.ok ) {
                     throw new Error(`HTTP error! Status: ${response.status}`);
                 }
                 const data = await response.json();
                 if(data.message === 'Trip Created'){
                     setCreated(true);
                     clearForm();
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
                                         <POISelect handleChange={POIChange}/>
                                     </div>
                                     <div className="flex flex-col md:w-2/5 w-full">
                                         <div className="flex flex-row justify-between">
                                             <label className="text-sm">Starting Point</label>
                                             <div className="text-red">*</div>
                                         </div>
                                         {/* Starting point selection dropdown */}
                                         <select name="start" value={registerData.start} onChange={change} className="border border-gray rounded focus:outline-none focus:border-green-400">
                                             <option value='' disabled selected></option>
                                             <option value='2'>One</option>
                                             <option value='2'>One</option>
                                             <option value='2'>One</option>
                                             <option value='2'>One</option>
                                             <option value='2'>One</option>
                                             <option value='2'>One</option>
                                             <option value='2'>One</option>
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
 