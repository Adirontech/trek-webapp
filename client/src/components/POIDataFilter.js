/**
 * POISelect.js - Component for selecting points of interest (POIs).
 * This component provides a multi-select dropdown menu for selecting POIs.
 */

import React, { useState, useEffect, useRef } from "react"; // Importing React and necessary hooks
import  Slider  from 'rc-slider'; // Importing Quantity Slider component
import '../assets/stylesheets/POISelect.css'; // Importing component-specific CSS
import 'rc-slider/assets/index.css'; // Importing CSS for Quantity Slider
import POISelect from "./POISelect";
import '../assets/stylesheets/POIDataFilter.css'; // Importing component-specific CSS

const config = require("../config/config"); // Importing configuration variables

/**
 * POIDataFilter - Functional component for filter menu on land allocation page
 * @param {Object} props - Component props
 * @param {Function} props.handleChange - Function to handle change in selected POIs
 * @returns {JSX.Element} - Rendered component
 */
const POIDataFilter = (props) => {
    const [pois, setPois] = useState([]); // State for POIs
    const [shownTypes, setShownTypes] = useState(['Trailhead', 'Peak', 'Scenic', 'Lodge', 'Leanto']); // State for POIs to be shown based off area type selected
    const isFirstRender = useRef(true); // State for first render
    const [filter, setFilter] = useState({
        minVal: props.filterOptions.min,
        maxVal: props.filterOptions.max,
        absMax: props.filterOptions.max,
        types: {
            Trailhead: props.filterOptions.Trailhead,
            Peak: props.filterOptions.Peak,
            Scenic: props.filterOptions.Scenic,
            Lodge: props.filterOptions.Lodge,
            Leanto: props.filterOptions.Leanto
        },
        from: props.filterOptions.from,
        to: props.filterOptions.to,
        steps: {
            day: false,
            week: false,
            month: false,
            year: false
        },
        average: false,
        selected: []
    }); // State for filter options
    const [marks, setMarks] = useState({
        [props.filterOptions.min]:  `${props.filterOptions.min}`,
        [props.filterOptions.max]: `${props.filterOptions.max}`
    });

    useEffect(() => {
        if(isFirstRender.current){
            isFirstRender.current = false;
            getPois();
            document.getElementsByClassName('gray')[0].innerHTML = 'Select Points of Interest';
        }
    }, []);
    
    useEffect(() => {
        setFilter({...filter,
            minVal: props.filterOptions.min,
            maxVal: props.filterOptions.max,
            absMax: props.filterOptions.max,
            types: {
                Trailhead: props.filterOptions.Trailhead,
                Peak: props.filterOptions.Peak,
                Scenic: props.filterOptions.Scenic,
                Lodge: props.filterOptions.Lodge,
                Leanto: props.filterOptions.Leanto
            },
            from: props.filterOptions.from,
            to: props.filterOptions.to,
            steps: {
                ...filter.steps,
                [props.filterOptions.step]: true
            },
            average: props.filterOptions.average
        });
        setMarks({
            [props.filterOptions.min]:  `${props.filterOptions.min}`,
            [props.filterOptions.max]: `${props.filterOptions.max}`
        });
        let types = [];
        for(const type in filter.types){
            if(props.filterOptions[type]){
                types.push(type);
            }
        }
        setShownTypes(types);

    }, [props.filterOptions]);

    /**
     * Function to get all POIs
     * @returns {Object} - pois
     */
    async function getPois() {
        const key = sessionStorage.getItem('sessionKey');
        let poiMap = [];
        try {
            const response = await fetch(config.apiURL + `/poi?key=${encodeURIComponent(key)}`);
            if (!response.ok){
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const pois = await response.json();
            if(pois){
                pois.forEach((poi) => {
                    poiMap.push({ value: poi.id, label: poi.name, type: poi.type});
                });
                setPois(poiMap);
            }
        } catch( error ){
            console.log('Error: ', error);
        }
    };

    const poiChange = (selected) => { // Function to handle change in selected POIs
        const selectedPOIs = selected.map((poi) => poi.value); // Extracting values of selected POIs
        setFilter({ ...filter, selected: selectedPOIs }); // Updating selected POIs in state
    };

    const handleSliderChange = (values) => { // Function to handle change in slider value
        setFilter({ ...filter, minVal: values[0], maxVal: values[1] });
        setMarks({
            0: '0',
            [values[0]]:  `${values[0]}`,
            [values[1]]: `${values[1]}`,
            [filter.absMax]: `${filter.absMax}`
        });
    };

    const handleChange = (e) => { // Function to handle change in filter options that are not selected pois or min/max
        const { name, value, checked, id } = e.target;
        if(name === "area" || name === "average") {
            setFilter({
                ...filter, 
                types: {
                    ...filter.types,
                    [id]: checked
                }
            });
            console.log(name, value, checked, id);
            if(name === "area" && checked){
                let types = shownTypes;
                types.push(id)
                console.log('checked: ', id, types);
                setShownTypes(types);
            }else if(name === "area" && !checked){
                let types = shownTypes.filter((type) => type !== id);
                console.log('unchecked: ', id, types);
                console.log(id);
                setShownTypes(types);
            }
        } else if (name === "step") {
            const increment = ["day", "week", "month", "year"];
            increment.forEach((i) => {
                if(i !== id) {
                    setFilter({ 
                        ...filter,
                        steps: {
                            ...filter.steps,
                            [i]: false
                        }
                    });
                }else {
                    setFilter({ 
                        ...filter,
                        steps: {
                            ...filter.steps,
                            [id]: checked
                        }
                    });
                }
            });
        }else {
            setFilter({ ...filter, [name]: value });
        }
    };

    const apply = () => { // Function to apply filter options
        props.handleFilterChange(filter);
    };

    return (
        console.log(pois),
        <div className="bg-white pt-4 pl-2 sm:pl-4 pr-2 sm:pr-4 pb-3 rounded-lg shadow-md xl:w-2/4 lg:w-7/12 md:w-4/5 w-full">
            <div className="flex flex-col w-full">
                <div className="inline-flex justify-center w-full h-9">
                    <POISelect pois={pois.filter((poi) => shownTypes.includes(poi.type))} registerForm={false} handleChange={poiChange}/>
                </div>
                <div className="flex flex-col sm:flex-row justify-between items-center w-full sm:h-20">
                    <div className="flex flex-row sm:py-1 sm:flex-col justify-between items-center w-full sm:w-1/4 md:pr-2 pr-5 sm:h-20">
                        <div className="flex flex-row w-full justify-around sm:justify-between">
                            <label className="text-lg self-end font-bold">From: </label>
                            <input type="date" onChange={handleChange} name="from" value={filter.from} className="h-8 border-2 rounded-md 2xl:w-32 sm:w-20" />
                        </div>
                        <div className="flex flex-row w-full justify-around sm:justify-between">
                            <label className="text-lg self-end font-bold">To: </label>
                            <input type="date" onChange={handleChange} name="to" value={filter.to} className="h-8 border-2 rounded-md 2xl:w-32 sm:w-20" />
                        </div>
                    </div>
                    <div className="flex flex-col justify-between w-full sm:w-3/4 pt-2 sm:pt-0 sm:h-20">
                        <fieldset className="flex flex-row w-full justify-between md:pl-6 sm:pt-2">
                            <div className="flex flex-row items-center">
                                <label className="text-sm pr-2">Trailhead</label>
                                <input type="checkbox" onChange={handleChange} name="area" id="Trailhead" checked={filter.types.Trailhead} className="border-2 w-6 h-6 rounded-md"></input>
                            </div>
                            <div className="flex flex-row items-center">
                                <label className="text-sm pr-2">Peak</label>
                                <input type="checkbox" onChange={handleChange} name="area" id="Peak" checked={filter.types.Peak} className="border-2 w-6 h-6 rounded-md"></input>
                            </div>
                            <div className="flex flex-row items-center">
                                <label className="text-sm pr-2">Scenic</label>
                                <input type="checkbox" onChange={handleChange} name="area" id="Scenic" checked={filter.types.Scenic} className="border-2 w-6 h-6 rounded-md"></input>
                            </div>
                            <div className="flex flex-row items-center">
                                <label className="text-sm pr-2">Lodge</label>
                                <input type="checkbox" onChange={handleChange} name="area" id="Lodge" checked={filter.types.Lodge} className="border-2 w-6 h-6 rounded-md"></input>
                            </div>
                            <div className="flex flex-row items-center">
                                <label className="text-sm pr-2">Leanto</label>
                                <input type="checkbox" onChange={handleChange} name="area" id="Leanto" checked={filter.types.Leanto} className="border-2 w-6 h-6 rounded-md"></input>
                            </div>
                        </fieldset>
                        <div className="flex flex-row w-full justify-between md:pl-6 sm:pb-1">
                            <fieldset className="flex flex-row sm:w-5/6 justify-between 2xl:pr-24 xl:pr-12 md:pr-6 sm:pb-1">
                                <div className="flex flex-row items-center">
                                    <label className="text-sm pr-2">Daily</label>
                                    <input type="radio" onChange={handleChange} name="step" id="day" checked={filter.day} className="border-2 w-6 h-6 rounded-md"></input>
                                </div>
                                <div className="flex flex-row items-center">
                                    <label className="text-sm pr-2">Weekly</label>
                                    <input type="radio" onChange={handleChange} name="step" id="week" checked={filter.week} className="border-2 w-6 h-6 rounded-md"></input>
                                </div>
                                <div className="flex flex-row items-center">
                                    <label className="text-sm pr-2">Monthly</label>
                                    <input type="radio" onChange={handleChange} name="step" id="month" checked={filter.month} className="border-2 w-6 h-6 rounded-md"></input>
                                </div>
                                <div className="flex flex-row items-center">
                                    <label className="text-sm pr-2">Yearly</label>
                                    <input type="radio" onChange={handleChange} name="step" id="year" checked={filter.year} className="border-2 w-6 h-6 rounded-md"></input>
                                </div>
                            </fieldset>
                            <div className="flex flex-row justify-end items-center sm:w-1/6">
                                <label className="text-sm pr-2">Average</label>
                                <input type="checkbox" onChange={handleChange} name="average" id="average" value={filter.average} className="border-2 w-6 h-6 rounded-md"></input>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row justify-end w-full h-9 pt-3 mb-1">
                    <div className="flex flex-col w-3/6 md:pl-6">
                        <Slider
                            range
                            min={0}
                            max={filter.absMax}
                            marks={marks}
                            value={[filter.minVal, filter.maxVal]}
                            pushable
                            onChange={handleSliderChange}
                        />
                        <label className="text-xs sm:text-sm text-center ">Number of Visitors</label>
                    </div>
                    <div className="flex flex-row w-2/6 md:pl-0 lg:pl-4 xl:pl-8 justify-around">
                        <label className="text-md sm:text-lg font-bold">Min: {filter.minVal}</label>
                        <label className="text-md sm:text-lg font-bold">Max: {filter.maxVal}</label>
                    </div>
                    <div className="flex flex-row justify-end w-1/6">
                        <button className="bg-green font-bold w-24 h-8 sm:left-1 relative rounded" onClick={apply}>
                            Apply
                        </button>
                    </div> 
                </div>
            </div>
        </div>
    );
};

export default POIDataFilter; // Exporting PoiDataFilter component