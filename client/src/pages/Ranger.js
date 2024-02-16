/**
 * Ranger.js - Component for displaying ranger view data.
 * This component fetches trip data from an API endpoint and displays it.
 */

 import React, { useEffect, useState } from "react"; // Importing React and necessary hooks

 // Importing configuration data
 const config = require("../config/config");
 
 const Ranger = () => {
     const [data, setData] = useState(null); // State variable to store fetched data
 
     useEffect(() => {
         // Effect hook to fetch trip data from the API endpoint when the component mounts
         fetch(config.apiURL + '/trips/all')
             .then(response => response.json()) // Parsing the JSON response
             .then(data => setData(data)); // Updating the state with the fetched data
     }, []); // Dependency array to ensure the effect runs only once after component mount
 
     return (
         <div className="bg-gradient-to-b from-green-800 to-green-950 h-screen">
             {/* Rendering the ranger view data */}
             <p>Ranger view data:</p>
             {/* Displaying fetched data in a preformatted block */}
             {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
         </div>
     );
 }
 
 export default Ranger; // Exporting the Ranger component
 