/**
 * POISelect.js - Component for selecting points of interest (POIs).
 * This component provides a multi-select dropdown menu for selecting POIs.
 */

import React, { useState, useEffect } from "react"; // Importing React and necessary hooks
import { MultiSelect } from 'react-multi-select-component'; // Importing MultiSelect component
import '../assets/stylesheets/POISelect.css'; // Importing component-specific CSS
import POISelect from "./POISelect";

/**
 * POIDataFilter - Functional component for filter menu on land allocation page
 * @param {Object} props - Component props
 * @param {Function} props.handleChange - Function to handle change in selected POIs
 * @returns {JSX.Element} - Rendered component
 */
const POIDataFilter = (props) => {
    const [selected, setSelected] = useState([]); // State for selected POIs

    // // useEffect hook to handle changes in selected POIs
    // useEffect(() => {
    //     props.handleChange(selected); // Calling handleChange function with selected POIs
    // }, [selected]);

     const pois = [
        { label: "POI 1", value: "poi1" },
        { label: "POI 2", value: "poi2" },
        { label: "POI 3", value: "poi3"},
        { label: "POI 4", value: "poi4"}
     ];

    const chnage = (selected) => { // Function to handle change in selected POIs
        console.log(selected)// Calling handleChange function with selected POIs
    };

    // Render the component
    return (
        <div className="bg-white p-6 rounded-lg shadow-md w-3/5">
            <div className="flex flex-col w-full">
                <div className="inline-flex justify-center w-full h-9">
                    <POISelect pois={pois} registerForm={false} handleChange={chnage}/>
                </div>
                <div className="flex flex-row justify-between items-center w-full h-9">
                    <div className="flex flex-col w-1/4">
                        <div className="w-full">
                            <label className="text-sm">From</label>
                            <input type="date" className="h-9 border-2 rounded-md" />
                        </div>
                    </div>
                    <div className="flex flex-col w-3/4">
                        <div className="flex flex-row w-full justify-between">
                            <div className="flex flex-row items-center">
                                <label className="text-sm pr-2">Trailhead</label>
                                <button type="radio" className="border-2 w-6 h-6 rounded-md"></button>
                            </div>
                            <div className="flex flex-row items-center">
                                <label className="text-sm pr-2">Peak</label>
                                <button type="radio" className="border-2 w-6 h-6 rounded-md"></button>
                            </div>
                            <div className="flex flex-row items-center">
                                <label className="text-sm pr-2">Scenic</label>
                                <button type="radio" className="border-2 w-6 h-6 rounded-md"></button>
                            </div>
                            <div className="flex flex-row items-center">
                                <label className="text-sm pr-2">Lodge</label>
                                <button type="radio" className="border-2 w-6 h-6 rounded-md"></button>
                            </div>
                            <div className="flex flex-row items-center">
                                <label className="text-sm pr-2">Leanto</label>
                                <button type="radio" className="border-2 w-6 h-6 rounded-md"></button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row justify-between w-11/12 h-9">
                    <div className="flex flex-row justify-between">
                        <label className="text-sm">To</label>
                        <input type="date" className="w-full h-9 border-2 border-gray-200 rounded-md" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default POIDataFilter; // Exporting POISelect component