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
    const [filter, setFilter] = useState({
        min: 0,
        max: 100,
        trailhead: '',
        peak: '',
        scenic: '',
        lodge: '',
        leanto: '',
        from: '',
        to: '',
        selected: []
    }); // State for filter options

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

    const handleChange = (e) => { // Function to handle change in filter options 
        const { name, value, checked, id } = e.target;
        console.log(name, value);
        if(name === "slider") {
            setFilter({ ...filter, min: value[0], max: value[1] });
            return;
        } else if(name === "area") {
            console.log("area", value);
            setFilter({ ...filter, [id]: checked });
        } else {
            setFilter({ ...filter, [name]: value });
        }
    };

    return (
        <div className="bg-white pt-4 pl-2 sm:pl-4 pr-2 sm:pr-4 pb-3 rounded-lg shadow-md xl:w-2/4 lg:w-7/12 md:w-4/5 w-full">
            <div className="flex flex-col w-full">
                <div className="inline-flex justify-center w-full h-9">
                    <POISelect pois={pois} registerForm={false} handleChange={poiChange}/>
                </div>
                <div className="flex flex-col sm:flex-row justify-between items-center w-full sm:h-20">
                    <div className="flex flex-row sm:flex-col justify-between items-center w-full sm:w-1/4 md:pr-2 pr-5 sm:h-20">
                        <div className="flex flex-row w-full justify-around sm:justify-between">
                            <label className="text-lg self-end font-bold">From: </label>
                            <input type="date" onChange={handleChange} name="from" value={filter.from} className="h-8 border-2 rounded-md 2xl:w-32 sm:w-20" />
                        </div>
                        <div className="flex flex-row w-full justify-around sm:justify-between">
                            <label className="text-lg self-end font-bold">To: </label>
                            <input type="date" onChange={handleChange} name="to" value={filter.to} className="h-8 border-2 rounded-md 2xl:w-32 sm:w-20" />
                        </div>
                    </div>
                    <div className="flex flex-col w-full sm:w-3/4 pt-2 sm:pt-0">
                        <fieldset className="flex flex-row w-full justify-between md:pl-6">
                            <div className="flex flex-row items-center">
                                <label className="text-sm pr-2">Trailhead</label>
                                <input type="checkbox" onChange={handleChange} name="area" id="trailhead" className="border-2 w-6 h-6 rounded-md"></input>
                            </div>
                            <div className="flex flex-row items-center">
                                <label className="text-sm pr-2">Peak</label>
                                <input type="checkbox" onChange={handleChange} name="area" id="peak" value={filter.peak} className="border-2 w-6 h-6 rounded-md"></input>
                            </div>
                            <div className="flex flex-row items-center">
                                <label className="text-sm pr-2">Scenic</label>
                                <input type="checkbox" onChange={handleChange} name="area" id="scenic" value={filter.scenic} className="border-2 w-6 h-6 rounded-md"></input>
                            </div>
                            <div className="flex flex-row items-center">
                                <label className="text-sm pr-2">Lodge</label>
                                <input type="checkbox" onChange={handleChange} name="area" id="lodge" value={filter.lodge} className="border-2 w-6 h-6 rounded-md"></input>
                            </div>
                            <div className="flex flex-row items-center">
                                <label className="text-sm pr-2">Leanto</label>
                                <input type="checkbox" onChange={handleChange} name="area" id="leanto" value={filter.leanto} className="border-2 w-6 h-6 rounded-md"></input>
                            </div>
                        </fieldset>
                        <div className="flex flex-row justify-between items-center w-full h-9 pt-6">
                            <div className="flex flex-col w-1/2 md:pl-6">
                                <Slider
                                    range
                                    min={0}
                                    max={100}
                                    marks={marks}
                                    name="slider"
                                    defaultValue={[0, 100]}
                                    value={[filter.min, filter.max]}
                                    pushable
                                    onChange={handleChange}
                                />
                                <label className="text-xs sm:text-sm text-center ">Number of Encounters</label>
                            </div>
                            <div className="flex flex-row w-1/2 md:pl-0 lg:pl-4 xl:pl-8 justify-around">
                                <label className="text-md sm:text-lg font-bold">Min: {filter.min}</label>
                                <label className="text-md sm:text-lg font-bold">Max: {filter.max}</label>
                            </div>
                            <div className="flex flex-row justify-end w-1/4">
                                <button className="bg-green font-bold w-24 h-8 relative rounded">
                                    Apply
                                </button>
                            </div>  
                    </div>
                </div>
                </div>
                
            </div>
        </div>
    );
};

export default POIDataFilter; // Exporting PoiDataFilter component