import React, { useEffect, useState } from "react";
import POIDataFilter from "../components/POIDataFilter";
import Navbar from "../components/Navbar";

const config = require("../config/config");

const LandAllocation = () => {
    const [data, setData] = useState([]);
    const [isFirstRender, setIsFirstRender] = useState(true);
    const [filterOptions, setFilterOptions] = useState({
        step: 'day',
        from: '',
        to: '',
        types: '',
        pois: '',
        min: '',
        max: '0'
    });

    useEffect(() => {
        if(isFirstRender){
            setIsFirstRender(false);
            getPOIUsageData();
        }
    });

    /**
     * Function to get all POI usage data
     */
    const getPOIUsageData = async () => {
        if(!sessionStorage.getItem('sessionKey')){
            return console.error('No session key found');
        }else{
            try{
                const response = await fetch(`${config.apiURL}/poi/allUsage?session_key=${sessionStorage.getItem('sessionKey')}`);
                if(response.status === 200){
                    const data = await response.json();
                    console.log(data);
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

    return (
        <div className="h-screen bg-cover bg-home bg-center bg-fixed bg-no-repeat hero pt-8 pb-8 sm:p-8">
            <Navbar />
            <div className='flex flex-col items-center w-full'>
                <div className="flex flex-row mt-9 w-full justify-center">
                    <POIDataFilter
                    
                    />
                </div>
            </div>
            {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
        </div>
    );
}

export default LandAllocation;
