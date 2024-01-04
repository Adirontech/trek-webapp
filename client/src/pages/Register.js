import React from "react";
import { useState } from "react";
import Navbar from "../components/Navbar";

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

    /**
     * Sets entered data to createData or signInData depending on the 'createAccount' state value.
     * Does not include passwordConf in createData as it is not sent in the request.
     * The switch checks which errors need to be cleared and sets them.
     * @param {*} e - event
     */
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

    return (
        <div>
            <div className="h-screen bg-cover bg-home bg-center bg-fixed bg-no-repeat hero p-8">
                <Navbar />
                <div className="flex flex-col items-center justify-center h-screen">
                    <div className="w-700 bg-white p-4 rounded-lg shadow-md">
                        <h1 className="ml-1 text-xl">User Registration</h1>
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
                                <div className="flex flex-col ml-1 mr-4 w-1/5">
                                    <div className="flex flex-row justify-between">
                                        <label className="text-sm">State</label>
                                    </div>
                                    <select className="border border-gray rounded focus:outline-none">
                                        <option value="" className="text-gray" disabled selected></option>
                                        <option value="AL">Alabama</option>
                                        <option value="AK">Alaska</option>
                                        <option value="AZ">Arizona</option>
                                        <option value="AR">Arkansas</option>
                                        <option value="CA">California</option>
                                        <option value="CO">Colorado</option>
                                        <option value="CT">Connecticut</option>
                                        <option value="DE">Delaware</option>
                                        <option value="FL">Florida</option>
                                        <option value="GA">Georgia</option>
                                        <option value="HI">Hawaii</option>
                                        <option value="ID">Idaho</option>
                                        <option value="IL">Illinois</option>
                                        <option value="IN">Indiana</option>
                                        <option value="IA">Iowa</option>
                                        <option value="KS">Kansas</option>
                                        <option value="KY">Kentucky</option>
                                        <option value="LA">Louisiana</option>
                                        <option value="ME">Maine</option>
                                        <option value="MD">Maryland</option>
                                        <option value="MA">Massachusetts</option>
                                        <option value="MI">Michigan</option>
                                        <option value="MN">Minnesota</option>
                                        <option value="MS">Mississippi</option>
                                        <option value="MO">Missouri</option>
                                        <option value="MT">Montana</option>
                                        <option value="NE">Nebraska</option>
                                        <option value="NV">Nevada</option>
                                        <option value="NH">New Hampshire</option>
                                        <option value="NJ">New Jersey</option>
                                        <option value="NM">New Mexico</option>
                                        <option value="NY">New York</option>
                                        <option value="NC">North Carolina</option>
                                        <option value="ND">North Dakota</option>
                                        <option value="OH">Ohio</option>
                                        <option value="OK">Oklahoma</option>
                                        <option value="OR">Oregon</option>
                                        <option value="PA">Pennsylvania</option>
                                        <option value="RI">Rhode Island</option>
                                        <option value="SC">South Carolina</option>
                                        <option value="SD">South Dakota</option>
                                        <option value="TN">Tennessee</option>
                                        <option value="TX">Texas</option>
                                        <option value="UT">Utah</option>
                                        <option value="VT">Vermont</option>
                                        <option value="VA">Virginia</option>
                                        <option value="WA">Washington</option>
                                        <option value="WV">West Virginia</option>
                                        <option value="WI">Wisconsin</option>
                                        <option value="WY">Wyoming</option>
                                    </select>
                                </div>
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
                                        className="border border-gray rounded focus:outline-none focus:border-green-400"
                                        name="phone"
                                        placeholder="XXX-XXX-XXXX"
                                        type="tel"
                                        value={registerData.phone}
                                        onChange={change}
                                    />
                                </div>
                            </div>
                        </div>
                        <h2 className="ml-2 text-xl">Trip Information</h2>
                            <div className="flex flex-col items-start justify-center">
                                <div className="flex flex-row justify-start my-2 w-full">
                                    <textarea className="border border-gray rounded focus:outline-none focus:border-green-400 ml-2 mr-2 w-full"/>
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
                                        <div className="flex flex-row justify-between leading-normal">
                                                <label className="text-sm">Start Date</label>
                                                <div className="text-red">*</div>
                                        </div>
                                        <input
                                            className="border border-gray rounded focus:outline-none focus:border-green-400"
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