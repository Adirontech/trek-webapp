import React from "react";
import { useState } from "react";
import Navbar from "../components/Navbar";
import StateSelect from "../components/StateSelect";

const Register = () => {
    const [errors, setErrors] = useState({});
    const [registerData, setRegisterData] = useState({
        firstname: '',
        lastname: '',
        street: '',
        city: '',
        state: '',
        zipcode: '',
        phone: '',
        info: '',
        start: '',
        end: '',
        duration: '',
        partysize: '',
        date: ''
    });

    
    const change = (e) => {
        const {name, value} = e.target;
        let errors = {};
            setRegisterData((json) => ({
                ...json,
                [name]: value,
            }));
        switch (true) {
            case name === "firstname":
                errors["firstname"] = "";
                break;
            case name === "lastname":
                errors["lastname"] = "";
                break;
            case name === "street":
                errors["street"] = "";
                break;
            case name === "city":
                errors["city"] = "";
                break;
            case name === "state":
                errors["state"] = "";
                break;
            case name === "zipcode":
                errors["zipcode"] = "";
                break;
            case name === "phone":
                errors["phone"] = "";
                break;
            case name === "info":
                errors["info"] = "";
                break;
            case name === "start":
                errors["start"] = "";
                break;
            case name === "end":
                errors["end"] = "";
                break;
            case name === "duration":
                errors["duration"] = "";
                break;
            case name === "size":
                errors["size"] = "";
                break;
            case name === "date":
                errors["date"] = "";
                break;
            default:
                break;
        }
        setErrors(errors);
    };

    // const selectChange = (e) => {
    //     console.log(e);
    // }

    return (
        <div>
            <div className="h-screen bg-cover bg-home bg-center bg-fixed bg-no-repeat hero p-8">
                <Navbar />
                <div className="flex flex-col items-center justify-center mt-10">
                    <div className="w-700 bg-white p-4 rounded-lg shadow-md">
                        <h1 className="ml-1 text-xl text-center">User Information</h1>
                        <div className="flex flex-col items-start justify-center">
                            <div className="flex flex-row justify-start my-2 w-full">
                                <div className="flex flex-col ml-1 mr-3 w-3/6">
                                    <div className="flex flex-row justify-between">
                                        <label className="text-sm">First Name</label>
                                        <div className="text-red">*</div>
                                    </div>
                                    <input
                                        className="border border-gray rounded focus:outline-none focus:border-green-400"
                                        name="firstname"
                                        type="text"
                                        required
                                        value={registerData.firstname}
                                        onChange={change}
                                    />
                                </div>
                                <div className="flex flex-col ml-3 mr-1 w-3/6">
                                    <div className="flex flex-row justify-between">
                                        <label className="text-sm">Last Name</label>
                                        <div className="text-red">*</div>
                                    </div>
                                    <input
                                        className="border border-gray rounded focus:outline-none focus:border-green-400"
                                        name="lastname"
                                        type="text"
                                        value={registerData.lastname}
                                        onChange={change}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-row justify-start my-2 w-full">
                                <div className="flex flex-col ml-1 mr-3 w-3/6">
                                    <label className="text-sm">Street</label>
                                    <input
                                        className="border border-gray rounded focus:outline-none focus:border-green-400"
                                        name="street"
                                        type="text"
                                        value={registerData.street}
                                        onChange={change}
                                    />
                                </div>
                                <div className="flex flex-col ml-3 mr-1 w-3/6">
                                    <label className="text-sm">City</label>
                                    <input
                                        className="border border-gray rounded focus:outline-none focus:border-green-400"
                                        name="city"
                                        type="text"
                                        value={registerData.city}
                                        onChange={change}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-row justify-start my-2 w-full">
                                <StateSelect handleChange={change}/>
                                <div className="flex flex-col ml-4 mr-4 w-2/5">
                                    <div className="flex flex-row justify-between">
                                        <label className="text-sm">Zip Code</label>
                                    </div>
                                    <input
                                        className="border border-gray rounded focus:outline-none focus:border-green-400"
                                        name="zipcode"
                                        type="text"
                                        value={registerData.zipcode}
                                        onChange={change}
                                    />
                                </div>
                                <div className="flex flex-col ml-4 mr-1 w-2/5">
                                    <div className="flex flex-row justify-between">
                                        <label className="text-sm">Phone</label>
                                        <div className="text-red">*</div>
                                    </div>
                                    <input
                                        className="border border-gray rounded focus:outline-none focus:border-green-400 relative bottom-1"
                                        name="phone"
                                        placeholder="XXX-XXX-XXXX"
                                        type="tel"
                                        value={registerData.phone}
                                        onChange={change}
                                    />
                                </div>
                            </div>
                        </div>
                        <h2 className="ml-1 text-xl text-center">Trip Information</h2>
                            <div className="flex flex-col items-start justify-center">
                                <div className="flex flex-row justify-start my-2 w-full">
                                    <textarea className="border border-gray rounded focus:outline-none focus:border-green-400 ml-1 mr-1 w-full"/>
                                </div>
                                <div className="flex flex-row justify-start my-2 w-full">
                                    <div className="flex flex-col ml-1 mr-3 w-2/5">
                                        <div className="flex flex-row justify-between">
                                            <label className="text-sm">Starting Point</label>
                                            <div className="text-red">*</div>
                                        </div>
                                        <select className="border border-gray rounded focus:outline-none focus:border-green-400">
                                            <option value='' disabled selected></option>
                                            <option value='2'>One</option>
                                        </select>
                                    </div>
                                    <div className="flex flex-col mr-1 ml-3 w-3/5">
                                        <div className="flex flex-row justify-between">
                                            <label className="text-sm">Points Of Interest</label>
                                            <div className="text-red">*</div>
                                        </div>
                                        <select className="border border-gray rounded focus:outline-none focus:border-green-400">
                                            <option value='' disabled selected></option>
                                            <option value='2' >One</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="flex flex-row justify-start my-2 w-full">
                                    <div className="flex flex-col ml-1 mr-4 w-2/6">
                                        <div className="flex flex-row justify-between">
                                                <label className="text-sm">Duration (# of Nights)</label>
                                                <div className="text-red">*</div>
                                        </div>
                                        <input
                                            className="border border-gray rounded focus:outline-none focus:border-green-400"
                                            type="number"
                                        />
                                    </div>
                                    <div className="flex flex-col ml-4 mr-4 w-2/6">
                                        <div className="flex flex-row justify-between leading-normal">
                                                <label className="text-sm">Party Size</label>
                                                <div className="text-red">*</div>
                                        </div>
                                        <input
                                            className="border border-gray rounded focus:outline-none focus:border-green-400"
                                            type="number"
                                        />
                                    </div>               
                                    <div className="flex flex-col mr-4 m-1 w-2/6">
                                        <div className="flex flex-row justify-between leading-normal relative bottom-1">
                                                <label className="text-sm">Start Date</label>
                                                <div className="text-red">*</div>
                                        </div>
                                        <input
                                            className="border border-gray rounded focus:outline-none focus:border-green-400 relative bottom-1"
                                            type="date"
                                            placeholder="Date"
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-row justify-center mt-2 w-full">
                                    <button className="bg-green text-white rounded hover:bg-green w-2/5">Submit</button>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
    </div>
    );
}

export default Register; 