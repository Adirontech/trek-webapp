import React from "react";
import { useState, useEffect } from "react";
import { RxDropdownMenu } from 'react-icons/rx';
import { MultiSelect } from 'react-multi-select-component';
import '../assets/stylesheets/POISelect.css'

const POISelect = (props) => {
    const [selected, setSelected] = useState([]);

    const points = [
        {
        label: '1',
        value: '1'
        },
        {
        label: '2',
        value: '2'
        },
        {
        label: '3',
        value: '3'
        },
        {
        label: '4',
        value: '4'
        },
        {
        label: '5',
        value: '5'
        },
        {
        label: '6',
        value: '6'
        },
        {
        label: '7',
        value: '7'
        },
        {        
        label: '4',
        value: '4'
        },
        {
        label: '5',
        value: '5'
        },
        {
        label: '6',
        value: '6'
        },
        {
        label: '7',
        value: '7'
        }
    ]

    useEffect(() => {
        props.handleChange(selected);
    }, [selected]);

    return (
        <div className="flex flex-col w-full">
            <div className="flex flex-row justify-between">
                <label className="text-sm">Points Of Interest</label>
                <div className="text-red">*</div>
            </div>
            <MultiSelect
                options={points}
                labelledBy="Points of Interest"
                onChange={setSelected}
                hasSelectAll={false}
                value={selected}
                showCheckbox={true}
                className="multiSelect"
            />
        </div>
    )
}

export default POISelect;