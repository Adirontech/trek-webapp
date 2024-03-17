/**
 * POISelect.js - Component for selecting points of interest (POIs).
 * This component provides a multi-select dropdown menu for selecting POIs.
 */

import React, { useState, useEffect } from "react"; // Importing React and necessary hooks
import  Slider  from 'rc-slider'; // Importing Quantity Slider component
import '../assets/stylesheets/POISelect.css'; // Importing component-specific CSS
import 'rc-slider/assets/index.css'; // Importing CSS for Quantity Slider
import POISelect from "./POISelect";

/**
 * POIDataFilter - Functional component for filter menu on land allocation page
 * @param {Object} props - Component props
 * @param {Function} props.handleChange - Function to handle change in selected POIs
 * @returns {JSX.Element} - Rendered component
 */
const POIDataFilter = (props) => {
    const [selected, setSelected] = useState([]); // State for selected POIs
    const [min, setMin] = useState(0); // State for minimum encounters
    const [max, setMax] = useState(100); // State for maximum encounters

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

    const marks = {
        0: '0',
        100: '100'
    };

    const poiChange = (selected) => { // Function to handle change in selected POIs
        console.log(selected)// Calling handleChange function with selected POIs
    };

    const handleSliderChange = (range) => {
        setMin(range[0]);
        setMax(range[1]);
    }

    return (
        <div className="bg-white p-4 rounded-lg shadow-md w-3/5">
            <div className="flex flex-col w-full">
                <div className="inline-flex justify-center w-full h-9">
                    <POISelect pois={pois} registerForm={false} handleChange={poiChange}/>
                </div>
                <div className="flex flex-row justify-between items-center w-full h-9 pb-2">
                    <div className="flex flex-col w-1/4">
                        <div className="flex flex-row justify-between w-full pr-12">
                            <label className="text-md" style={{ alignSelf: "center" }}>From: </label>
                            <input type="date" className="h-8 border-2 rounded-md" />
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
                <div className="flex flex-row justify-between w-full h-9">
                    <div className="flex flex-col w-1/4">
                        <div className="flex flex-row justify-between w-full pr-12">
                            <label className="text-md text-center">To: </label>
                            <input type="date" className="h-8 border-2 rounded-md" />
                        </div>
                    </div>
                    <div className="flex flex-row w-2/4">
                        <div className="flex flex-col w-1/2 pl-6">
                            <Slider
                                range
                                min={0}
                                max={100}
                                marks={marks}
                                defaultValue={[0, 100]}
                                value={[min, max]}
                                pushable
                                onChange={handleSliderChange}
                            />
                            <label className="text-sm text-center ">Number of Encounters</label>
                        </div>
                        <div className="flex flex-col w-1/2 pl-8">
                            <label className="text-sm">Min: {min}</label>
                            <label className="text-sm">Max: {max}</label>
                        </div>
                    </div>
                    <div className="flex flex-row justify-end w-1/4">
                        <button className="bg-green font-bold w-20 h-8 relative top-2 rounded">
                            Apply
                        </button>
                    </div>  
                </div>
            </div>
        </div>
    );
};

export default POIDataFilter; // Exporting PoiDataFilter component