import React, { useEffect, useState, useRef} from "react";
import POIDataFilter from "../components/POIDataFilter";
import Navbar from "../components/Navbar";
import POIUsageTable from "../components/POIUsageTable";
import { useNavigate } from 'react-router-dom';

const config = require("../config/config");

const LandAllocation = () => {
    const [data, setData] = useState([]);
    const isFirstRender = useRef(true);
    const step = useRef('day');
    const [filterOptions, setFilterOptions] = useState({
        step: step.current,
        from: '',
        to: '',
        Trailhead: true,
        Peak: true,
        Scenic: true,
        Lodge: true,
        Leanto: true,
        pois: '',
        min: 0,
        max: 0,
        average: false
    });
    const navigate = useNavigate();

    useEffect(() => {
        if(isFirstRender.current){
            isFirstRender.current = false;
            getPOIData();
        }
    }, [data, filterOptions]);

    /**
     * Function to apply filter options
     * Puts options into the correct format that the API expects
     * Creates a URL with the filter options as query parameters
     * Calls getFilteredData with the URL
     *  @param {object} options - filter options from POIDataFilter component
     */
    const handleFilterChange = (options) => {
        let types = '';
        let type = '';
        let pois = '';
        for(const [key, value] of Object.entries(options.types)){
            if(types === '' && value){
                types += key;
            }
            else if(value){
                types += ',' + key;
            }
        }
        options.selected.forEach(poi => {
            if(pois === '' && poi){
                pois += poi;
            }
            else{
                pois += ',' + poi;
            }
        });
        if(options.average){
            type = 'average';
        }else{
            type = 'total';
        }
        step.current = options.step;
        const url = `${config.apiURL}/poi/${type}Usage?session_key=${sessionStorage.getItem('sessionKey')}&step=${options.step}&from=${options.from}&to=${options.to}&types=${types}&pois=${pois}&min=${options.minVal}&max=${options.maxVal}`
        getFilteredData(url, options, pois);
    };

    /**
     * Function to get all POI usage data
     */
    const getPOIData = async () => {
        let max = 0;
        if(!sessionStorage.getItem('sessionKey')){
            console.error('No session key found');
            navigate('/login');
        }else{
            try{
                const response = await fetch(`${config.apiURL}/poi/allUsage?session_key=${sessionStorage.getItem('sessionKey')}`);
                if(response.status === 200){
                    const data = await response.json();
                    data.forEach(row => {
                        if(Number(row.registered_visitors) > max){
                            max = Number(row.registered_visitors);
                        }
                        row.date = row.date.split('T')[0];
                    });
                    setFilterOptions({...filterOptions, max: max});
                    setData(data);
                }else{
                    console.error('Failed to get data');
                }
            }
            catch(error){
                console.error(error);
            }
        }
    }

    /**
     * Function to get filtered POI usage data
     * @param {string} type - average or total(daily)
     */
    const getFilteredData = async (url, options, pois) => {
        let max = 0;
        if(!sessionStorage.getItem('sessionKey')){
            console.error('No session key found');
            navigate('/login');
        }else{
            try{
                const response = await fetch(url);
                if(response.status === 200){
                    const data = await response.json();
                    if(data.length === 0){
                        console.error('No data found');
                        alert('No data found');
                        return;
                    }
                    data.forEach(row => {
                        if(!options.average){
                            if(Number(row.registered_visitors) > max){
                                max = Number(row.registered_visitors);
                            }
                            row.date = row.start_date.split('T')[0];
                        }else{
                            if(Number(row.avg_registered_visitors) > max){
                                max = Number(row.avg_registered_visitors);
                            }
                        }
                    });
                    setData(data);
                    setFilterOptions({
                        ...filterOptions, 
                        from: options.from,
                        to: options.to,
                        min: options.minVal,
                        max: max,
                        average: options.average,
                        step: options.step,
                        Trailhead: options.types.Trailhead,
                        Peak: options.types.Peak,
                        Scenic: options.types.Scenic,
                        Lodge: options.types.Lodge,
                        Leanto: options.types.Leanto,
                        pois: pois
                    });
                }else{
                    console.error('Failed to get data');
                }
            }
            catch(error){
                console.error(error);
            }
        }
    }

    return (
        <div className="h-screen bg-cover bg-BJW_9 bg-center bg-fixed bg-no-repeat hero pt-8 pb-8 sm:p-8 overflow-y-scroll">
            <Navbar />
            <div className='flex flex-col items-center w-full mb-1'>
                <div className="flex flex-row mt-8 mb-4 w-full justify-center">
                    <POIDataFilter
                        filterOptions = {filterOptions}
                        step = {step.current}
                        handleFilterChange = {handleFilterChange}
                    />
                </div>
                <POIUsageTable
                    data = {data}
                    average = {filterOptions.average}
                />
            </div>
        </div>
    );
}

export default LandAllocation;
