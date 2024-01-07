import React from "react";
import { useState, useEffect } from "react";

const POISelect = () => {
    const [selected, setSelected] = useState({});

    const change = (e) => {
        const {name, value} = e.target;
        const points = this.props.options;
        points.array.forEach(element => {
            if(element )
        });
    }


    const points = this.props.options;

    return (
        <div className="flex flex-col mr-1 ml-3 w-80">
            <div className="flex flex-row justify-between">
                <label className="text-sm">Points Of Interest</label>
                <div className="text-red">*</div>
            </div>
            <select onChange={change} multiple className="border border-gray rounded focus:outline-none focus:border-green-400">
                <option value='' disabled selected></option>
                {points.map((poi, index) => (
                    <option key={index} value={poi.value}>{poi.name}</option>
                ))}
            </select>
        </div>
    )
}

export default POISelect;