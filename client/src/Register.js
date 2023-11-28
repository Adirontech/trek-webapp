import React from "react";
import { useState } from "react";

const Register = () => {

    


    return (
        <div className="Register">
            <div className="title">

                <h1>Trip Registration</h1>

            </div>
            <div className="form">
               
                <form>
                    <h2>User Information</h2>
                        <label>First Name</label>
                            <input type= "text"/>
                        <label>Last Name</label>
                            <input type= "text"/>
                        <label>Street Address</label>
                            <input type= "text"/>
                        <label>City</label>
                            <input type= "text"/>
                        <label>State</label>
                            <input type= "text"/>
                        <label>Zip Code</label>
                            <input type= "text"/>
                        <label>Phone Number</label>
                    <h2>Trip Information</h2>
                        <textarea>
                            Enter information here!
                        </textarea>
                    <input type= "submit"/>
                    

                </form>

            </div>
            
        </div>
        



    );

}

export default Register; 