import React from "react";
import { useState, useEffect } from "react";
import { RxDropdownMenu } from 'react-icons/rx';
import { MultiSelect } from 'react-multi-select-component';
import '../assets/stylesheets/POISelect.css'

const POISelect = () => {
    const [selected, setSelected] = useState([]);

    const points = [
        {
        label: 'Group 1',
        value: 'Option 1'
        },
        {
        label: 'Group 1',
        value: 'Option 2'
        },
        {
        label: 'Group 1',
        value: 'Option 3'
        },
        {
        label: 'Group 2',
        value: 'Option 4'
        },
        {
        label: 'Group 2',
        value: 'Option 5'
        },
        {
        label: 'Group 2',
        value: 'Option 6'
        },
        {
        label: 'Group 2',
        value: 'Option 7'
        }
    ]


    // const points = this.props.options;

    return (
        <div className="flex flex-col md:mr-1 md:ml-3 w-full">
            <div className="flex flex-row justify-between">
                <label className="text-sm">Points Of Interest</label>
                <div className="text-red">*</div>
            </div>
            <MultiSelect
                options={points}
                labelledBy="Points of Interest"
                onChange={setSelected}
                value={selected}
                showCheckbox={true}
                className="multiSelect"
            />
        </div>
    )
}

export default POISelect;