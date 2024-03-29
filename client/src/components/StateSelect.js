/**
 * StateSelect.js - Component for selecting a state.
 * This component provides a dropdown menu for selecting a state.
 */

 import React from "react"; // Importing React
 import { useState } from "react"; // Importing useState hook
 
 /**
  * StateSelect - Functional component for selecting a state.
  * @param {Object} props - Component props
  * @param {Function} props.handleChange - Function to handle change in selected state
  * @param {string} props.value - Selected state value
  * @returns {JSX.Element} - Rendered component
  */
 const StateSelect = (props) => {
     /**
      * Function to handle change in selected state.
      * @param {Event} e - Change event
      */
     const change = (e) => {
         props.handleChange(e); // Calling handleChange function with the event
     }
 
     // Render the component
     return (
         <div className="flex flex-col md:ml-1 md:mr-1 2xl:mr-4 md:w-28 w-full">
             <div className="flex flex-row justify-between">
                 <label className="text-sm">State</label>
                 <div className="text-red">*</div>
             </div>
             {/* Dropdown menu for selecting a state */}
             <select value={props.value} name="state" onChange={change} className="border border-gray rounded focus:outline-none">
                 <option value="" className="text-gray" disabled selected></option>
                 {/* List of state options */}
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
     );
 }
 
 export default StateSelect; // Exporting StateSelect component
 