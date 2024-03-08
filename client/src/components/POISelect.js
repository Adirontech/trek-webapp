/**
 * POISelect.js - Component for selecting points of interest (POIs).
 * This component provides a multi-select dropdown menu for selecting POIs.
 */

 import React, { useState, useEffect } from "react"; // Importing React and necessary hooks
 import { MultiSelect } from 'react-multi-select-component'; // Importing MultiSelect component
 import '../assets/stylesheets/POISelect.css'; // Importing component-specific CSS
 
 /**
  * POISelect - Functional component for selecting points of interest (POIs).
  * @param {Object} props - Component props
  * @param {Function} props.handleChange - Function to handle change in selected POIs
  * @returns {JSX.Element} - Rendered component
  */
 const POISelect = (props) => {
     const [selected, setSelected] = useState([]); // State for selected POIs
 
     // useEffect hook to handle changes in selected POIs
     useEffect(() => {
         props.handleChange(selected); // Calling handleChange function with selected POIs
     }, [selected]);
 
     // Render the component
     return (
         <div className="flex flex-col w-full">
            {props.registerForm &&
             <div className="flex flex-row justify-between">
                 <label className="text-sm">Points Of Interest</label>
                 <div className="text-red">*</div>
             </div>
            }
            {/* MultiSelect component for selecting POIs */}
            <MultiSelect
                options={props.pois} // Options for POIs
                displayValue="Select Points of Interest" // Placeholder text
                onChange={setSelected} // Function to handle change in selection
                hasSelectAll={false} // Disable select all option
                value={selected} // Selected values
                showCheckbox={true} // Show checkboxes
                className="multiSelect" // Custom CSS class
            />
         </div>
     );
 };
 
 export default POISelect; // Exporting POISelect component
 