import React from "react";
import { useState } from "react";
import Navbar from "../components/Navbar";
import StateSelect from "../components/StateSelect";
import POISelect from "../components/POISelect";

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
        pois: [],
        duration: '',
        partysize: '',
        date: ''
    });
    const [selected, setSelected] = useState({});
    
    const change = (e) => {
        const {name, value} = e.target;
        let errors = {};
        if(name === "poi"){
            setSelected((json) => ({
                ...json,
                [name]: value
            }));
        }
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
            case name === "state":
                errors["state"] = "";
                break;
            case name === "zipcode":
                errors["zipcode"] = "";
                break;
            case name === "phone":
                errors["phone"] = "";
                break;
            case name === "start":
                errors["start"] = "";
                break;
            case name === "poi":
                errors["poi"] = "";
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
        console.log(registerData);
    };

    const POIChange = (e) => {
        console.log(e);
    }

    const selectChange = (e) => {
        console.log(e);
    }

    return (
        <div>
            <div className="md:h-screen bg-cover bg-home bg-center bg-fixed bg-no-repeat hero p-8">
                <Navbar />
                    <div className="flex flex-col items-start justify-center mt-10 w-full sm:w-9/12 xl:w-5/12 ml-auto mr-auto bg-white p-4 rounded-lg shadow-md">
                        <h1 className="text-xl mr-auto ml-auto relative bottom-1">User Information</h1>
                        <div className="flex flex-col items-start justify-center w-full">
                            <div className="flex flex-col md:flex-row justify-start my-2 w-full">
                                <div className="flex flex-col md:ml-1 md:mr-3 w-full md:w-3/6">
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
                                <div className="flex flex-col md:ml-3 w-full md:w-3/6">
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
                            <div className="flex md:flex-row flex-col justify-start md:my-2 w-full">
                                <div className="flex flex-col md:ml-1 md:mr-3 w-full md:w-3/6">
                                    <label className="text-sm">Street</label>
                                    <input
                                        className="border border-gray rounded focus:outline-none focus:border-green-400"
                                        name="street"
                                        type="text"
                                        value={registerData.street}
                                        onChange={change}
                                    />
                                </div>
                                <div className="flex flex-col md:ml-3 md:mr-1 md:w-3/6 w-full">
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
                            <div className="flex md:flex-row flex-col justify-start md:my-2 w-full">
                                <StateSelect handleChange={change}/>
                                <div className="flex flex-col md:ml-1 md:mr-1 xl:ml-1 xl:mr-1 2xl:ml-4 2xl:mr-4 md:w-2/5 w-full">
                                    <div className="flex flex-row justify-between">
                                        <label className="text-sm">Zip Code</label>
                                    </div>
                                    <input
                                        className="border border-gray rounded focus:outline-none focus:border-green-400"
                                        name="zipcode"
                                        type="number"
                                        value={registerData.zipcode}
                                        onChange={change}
                                    />
                                </div>
                                <div className="flex flex-col 2xl:ml-4 md:ml-1 md:mr-1 md:w-2/5 w-full">
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
                        <h2 className="text-xl ml-auto mr-auto">Trip Information</h2>
                            <div className="flex flex-col items-start justify-center w-full">
                                <div className="flex flex-row justify-start my-2 w-full">
                                    <textarea placeholder="Trip Notes" className="border border-gray rounded focus:outline-none focus:border-green-400 w-full"/>
                                </div>
                                <div className="flex md:flex-row flex-col justify-start md:my-2 w-full">
                                    <div className="flex flex-col md:ml-1 md:mr-3 md:w-2/5 w-full">
                                        <div className="flex flex-row justify-between">
                                            <label className="text-sm">Starting Point</label>
                                            <div className="text-red">*</div>
                                        </div>
                                        <select className="border border-gray rounded focus:outline-none focus:border-green-400">
                                            <option value='' disabled selected></option>
                                            <option value='2'>One</option>
                                        </select>
                                    </div>
                                    <div className="md:mr-3 md:w-3/5 w-full">
                                        <POISelect handleChange={POIChange}/>
                                    </div>
                                </div>
                                <div className="flex md:flex-row flex-col justify-start md:my-2 w-full">
                                    <div className="flex flex-col md:ml-1 md:mr-1 2xl:mr-4 md:w-2/6 w-full">
                                        <div className="flex flex-row justify-between">
                                                <label className="text-sm">Number of Nights</label>
                                                <div className="text-red">*</div>
                                        </div>
                                        <input
                                            className="border border-gray rounded focus:outline-none focus:border-green-400"
                                            type="number"
                                            min={0}
                                        />
                                    </div>
                                    <div className="flex flex-col md:ml-1 md:mr-1 xl:ml-1 xl:mr-1 2xl:ml-4 2xl:mr-4 md:w-2/6 w-full">
                                        <div className="flex flex-row justify-between leading-normal">
                                                <label className="text-sm">Party Size</label>
                                                <div className="text-red">*</div>
                                        </div>
                                        <input
                                            className="border border-gray rounded focus:outline-none focus:border-green-400"
                                            type="number"
                                            min={1}
                                        />
                                    </div>               
                                    <div className="flex flex-col 2xl:ml-4 md:ml-1 md:mr-1 relative top-1 md:w-2/6 w-full">
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
                                    <button className="bg-green text-white rounded hover:bg-green w-2/5 relative top-1 h-8">Submit</button>
                                </div>
                            </div>
                    </div>
            </div>
    </div>
    );
}

export default Register; 