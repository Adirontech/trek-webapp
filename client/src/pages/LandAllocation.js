import React, { useEffect, useState, useRef} from "react";
import POIDataFilter from "../components/POIDataFilter";
import Navbar from "../components/Navbar";
import POIUsageTable from "../components/POIUsageTable";

const config = require("../config/config");

const LandAllocation = () => {
    const [data, setData] = useState([]);
    const isFirstRender = useRef(true);
    const [filterOptions, setFilterOptions] = useState({
        step: 'day',
        from: '',
        to: '',
        types: 'trailhead, peak, scenic, lodge, leanto',
        pois: '',
        min: 0,
        max: 0,
        average: false
    });

    useEffect(() => {
        if(isFirstRender.current){
            isFirstRender.current = false;
            getPOIData();
        }
    }, [data, filterOptions]);

    const handleFilterChange = (e) => {
        console.log(e);
    };

    /**
     * Function to get all POI usage data
     */
    const getPOIData = async () => {
        let max = 0;
        if(!sessionStorage.getItem('sessionKey')){
            return console.error('No session key found');
        }else{
            try{
                const response = await fetch(`${config.apiURL}/poi/allUsage?session_key=${sessionStorage.getItem('sessionKey')}`);
                if(response.status === 200){
                    const data = await response.json();
                    data.forEach(row => {
                        if(Number(row.visitors) > max){
                            max = row.visitors;
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
    const getFilteredData = async (type) => {
        let max = 0;
        if(!sessionStorage.getItem('sessionKey')){
            return console.error('No session key found');
        }else{
            try{
                const response = await fetch(`${config.apiURL}/poi/${type}Usage?
                session_key=${sessionStorage.getItem('sessionKey')}
                &step=${filterOptions.step}
                &from=${filterOptions.from}
                &to=${filterOptions.to}
                &types=${filterOptions.types}
                &pois=${filterOptions.pois}
                &min=${filterOptions.min}
                &max=${filterOptions.max}`);
                if(response.status === 200){
                    const data = await response.json();
                    data.forEach(row => {
                        if(row.visitors > max){
                            max = row.visitors;
                        }
                        row.date = row.date.split('T')[0];
                    });
                    setData(data);
                    setFilterOptions({...filterOptions, max: max});
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
        <div className="h-screen bg-cover bg-home bg-center bg-fixed bg-no-repeat hero pt-8 pb-8 sm:p-8 overflow-y-scroll">
            <Navbar />
            <div className='flex flex-col items-center w-full mb-1'>
                <div className="flex flex-row mt-8 mb-4 w-full justify-center">
                    <POIDataFilter
                        filterOptions = {filterOptions}
                        handleFilterChange = {handleFilterChange}
                    />
                </div>
                <POIUsageTable
                    data = {data}
                />
            </div>
        </div>
    );
}

export default LandAllocation;
