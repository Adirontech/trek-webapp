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
 
     // Hardcoded points of interest data
     const points = [
         { label: '1', value: '1' },
         { label: '2', value: '2' },
         { label: '3', value: '3' },
         { label: '4', value: '4' },
         { label: '5', value: '5' },
         { label: '6', value: '6' },
         { label: '7', value: '7' },
         { label: '4', value: '4' },
         { label: '5', value: '5' },
         { label: '6', value: '6' },
         { label: '7', value: '7' }
     ];
 
     // useEffect hook to handle changes in selected POIs
     useEffect(() => {
         props.handleChange(selected); // Calling handleChange function with selected POIs
     }, [selected]);
 
     // Render the component
     return (
         <div className="flex flex-col w-full">
             <div className="flex flex-row justify-between">
                 <label className="text-sm">Points Of Interest</label>
                 <div className="text-red">*</div>
             </div>
             {/* MultiSelect component for selecting POIs */}
             <MultiSelect
                 options={points} // Options for POIs
                 labelledBy="Points of Interest" // Accessibility label
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
 