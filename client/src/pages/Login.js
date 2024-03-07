import React, { useState, useContext} from "react";
import { useNavigate } from 'react-router-dom';
import MainContext from "../MainContext";

const Login = () => {
    const navigate = useNavigate(); // Hook for navigating to different routes
    const [passwordConf, setPasswordConf] = useState(""); // State variable for password confirmation
    const [createAccount, setCreateAccount] = useState(false); // State variable for toggling between login and create account
    const [errors, setErrors] = useState({}); // State variable for form errors
    const [createData, setCreateData] = useState({ // State variable for create account form data
        username: '',
        password: '',
        first_name: '',
        last_name: '',
        phone: '',
        is_ranger: false,
    });
    const [signInData, setSignInData] = useState({ // State variable for login form data
        username: '',
        password: ''
    });
    const {
        setIsLandUsagePlanner
    } = useContext(MainContext);
            
     /**
      * Function to switch between login and create account forms.
      * Clears all entered data and errors.
      */
    const changeForm = () => {
        setCreateData({
            username: '',
            password: '',
            first_name: '',
            last_name: '',
            phone: '',
            is_ranger: false,
        });
        setSignInData({
            username: '',
            password: ''
        });
        setPasswordConf("");
        setCreateAccount(!createAccount);
        setErrors({});
    };

    /**
     * Function to handle changes in form input fields.
     * Updates form data and clears relevant errors.
     * @param {*} e - Event object
     */
    const change = (e) => {
        const {name} = e.target;
        let value;

        // check if 'e' has the checked property, indicating it's a checkbox (land usage planner)
        if (e.target.hasOwnProperty('checked')) {
            value = e.target.checked;
        }
        else {
            value = e.target.value;
        }

        let errors = {};
        // Sets entered data to createData or signInData depending on the 'createAccount' state value.
        if ( createAccount && (name !== "passwordConf") ){ // 'passwordConf' is not included in createData because it is not sent in the request.
            setCreateData((json) => ({
                ...json,
                [name]: value,
            }));
        }
        else{
            setSignInData((json) => ({
                ...json,
                [name]: value,
            }));
        }
        // The switch checks which relevant errors need to be cleared based on the input field, and then set them to be clear/empty.
        switch (true) {
            // Clearing relevant errors based on the input field
            case name === "username":
                errors["userName"] = "";
                break;
            case name === "password":
                errors["password"] = "";
                break;
            case name === "first_name":
                errors["firstName"] = "";
                break;
            case name === "last_name":
                errors["lastName"] = "";
                break;
            case name === "phone":
                errors["phone"] = "";
                break;
            case name === "passwordConf":
                setPasswordConf(value);
                errors["passwordConf"] = "";
                if( value === createData.password ){
                    errors["match"] = "";
                }
                break;
            default:
                break;
        }
        setErrors(errors);
    };

     /**
      * Function to validate create account form data.
      * Checks if all required fields are filled and passwords (given PW & confirmation PW) match.
      * Updates errors and returns true or false.
      * @returns {boolean} - Indicates if form data is valid or not.
      */
    const validateCreate = () => {
        let isValid = true;
        let errors = {};
        if( !createData.username ){
            isValid = false;
            errors["userName"] = "Please enter a username";
        }
        if( !createData.password ){
            isValid = false;
            errors["password"] = "Please enter a password";
        }
        if( !createData.first_name ){
            isValid = false;
            errors["firstName"] = "Please enter a first name";
        }
        if( !createData.last_name ){
            isValid = false;
            errors["lastName"] = "Please enter a last name";
        }
        if( !createData.phone ){
            isValid = false;
            errors["phone"] = "Please enter a phone number";
        }
        if( !passwordConf ){
            isValid = false;
            errors["passwordConf"] = "Please confirm your password";
        }
        if( createData.password !== passwordConf ){
            isValid = false;
            errors["match"] = "Passwords do not match";
        }
        setErrors(errors);
        return isValid;
    };

     /**
      * Function to validate login form data.
      * Checks if username and password are entered.
      * Updates errors and returns true or false.
      * @returns {boolean} - Indicates if form data is valid or not.
      */
    const validateSignIn = () => {
        let isValid = true;
        let errors = {};
        if( !signInData.username ){
            isValid = false;
            errors["userName"] = "Please enter a username";
        }
        if( !signInData.password ){
            isValid = false;
            errors["password"] = "Please enter a password";
        }
        setErrors(errors);
        return isValid;
    };

     /**
      * Function to create a new user and sign them in.
      * Validates form data and makes API requests.
      * Sets user ID and session key in session storage.
      * Redirects user to landing page if requests are successful.
      * @param {*} e - Event object
      */
    async function create(e) {
        e.preventDefault();
        if( validateCreate() ){ // First, validate the data  
            try{ // If the create data is validated, build & submit a create API request.
                const cOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(createData)
                };
                const cResponse = await fetch('http://localhost:5000/user/', cOptions);
                if ( !cResponse.ok ) {
                    throw new Error(`HTTP error (1)! Status: ${cResponse.status}`);
                }
                const cData = await cResponse.json(); // Await the create API response; a user ID should be returned
                if( cData.user_id ) { // If a user is created & a user ID is returned, set the userID in the browsers session data.
                    console.log(cData.user_id);
                    sessionStorage.setItem('userId', cData.user_id);
                    const sOptions = {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ username: createData.username, password: createData.password })
                    };
                    const sResponse = await fetch('http://localhost:5000/user/', sOptions);
                    if ( !sResponse.ok ) {
                        throw new Error(`HTTP error (2)! Status: ${sResponse.status}`);
                    }
                    const sData = await sResponse.json(); // Await API response for setting the userID
                    if( sData.session_key ) { // Then makes a sign in API request which returns a sessionKey that is set in the browsers session data.
                        sessionStorage.setItem('sessionKey', sData.session_key);
                        navigate('/'); // Since all requests have been successful, redirect new user to the landing page.
                    }
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
    };

     /**
      * Function to sign in a user.
      * Validates form data and makes API requests.
      * Sets session key in session storage.
      * Redirects user to landing page if request is successful.
      * @param {*} e - Event object
      */
    async function signIn(e) {
        let errors = {};
        e.preventDefault();
        if( validateSignIn() ){ // First, validate the form data
            try{ // If form data is valid, build & submit a sign-in API request
                const options = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(signInData)
                };
                const response = await fetch('http://localhost:5000/user/', options);
                if ( !response.ok ) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                if( data.session_key ){ //If a session key is returned, store it and redirect the user to the landing page.
                    sessionStorage.setItem('sessionKey', data.session_key);
                    navigate('/');
                }else{ // If session key is not returned, set an error for an incorrect username or password.
                    errors["userNotFound"] = "Incorrect username or password";
                    setErrors(errors);
                }
            } catch ( error ) { // Catch and log any errors that are set/created
                console.log('Error:', error);
            }
        }
    };

    // Conditional rendering based on createAccount state
    if(createAccount){
        return(
                <div className="bg-black w-full">
                {/* Create account form */}
                    <div className=" flex items-center justify-center bg-black bg-login bg-scroll bg-cover w-screen  2xl:h-screen">
                        <div className=" flex flex-col items-center justify-center pb-5">
                            <img className="w-60 py-5" alt="Logo" src="AWA-logo.png" /> 
                            <div className="bg-white p-6 rounded-lg shadow-md w-72">
                                <h2 className="text-2xl font-semibold mb-4 text-center">Create Account</h2>
                                <form className="" onSubmit={create}>
                                    <div className="mb-4">
                                        <label className="block text-gray-600 text-sm">First Name</label>
                                        <input
                                            className="w-full p-2 border border-gray rounded focus:outline-none focus:border-green-400"
                                            type="text"
                                            name="first_name"
                                            value={createData.first_name}
                                            onInput={change}
                                        />
                                        <div className=" text-xs text-red">{errors.firstName}</div>
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-600 text-sm">Last Name</label>
                                        <input
                                            className="w-full p-2 border border-gray rounded focus:outline-none focus:border-green-400"
                                            type="text"
                                            name="last_name"
                                            value={createData.last_name}
                                            onChange={change}
                                        />
                                        <div className=" text-xs text-red">{errors.lastName}</div>
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-600 text-sm">Phone</label>
                                        <input
                                            className="w-full p-2 border border-gray rounded focus:outline-none focus:border-green-400"
                                            type="tel"
                                            name="phone"
                                            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                                            placeholder="XXX-XXX-XXXX"
                                            value={createData.phone}
                                            onChange={change}
                                        />
                                        <div className=" text-xs text-red">{errors.phone}</div>
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-600 text-sm">Username</label>
                                        <input
                                            className="w-full p-2 border border-gray rounded focus:outline-none focus:border-green-400"
                                            type="text"
                                            name="username"
                                            placeholder=" "
                                            value={createData.username}
                                            onChange={change}
                                        />
                                        <div className=" text-xs text-red">{errors.userName}</div>
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-600 text-sm">Password</label>
                                        <input
                                            className="w-full p-2 border border-gray rounded focus:outline-none focus:border-green-400"
                                            type="password"
                                            name="password"
                                            value={createData.password}
                                            onChange={change}
                                        />
                                        <div className=" text-xs text-red">{errors.password}</div>

                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-600 text-sm">Password Confirmation</label>
                                        <input
                                            className="w-full p-2 border border-gray rounded focus:outline-none focus:border-green-400"
                                            type="password"
                                            name="passwordConf"
                                            value={passwordConf}
                                            onChange={change}
                                        />
                                        <div className=" text-xs text-red">{errors.passwordConf}</div>
                                        <div className=" text-xs text-red">{errors.match}</div>
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-600 text-sm">Are you a land allocation planner?</label>
                                        <input
                                            className="w-full h-6 p-2 border border-gray rounded focus:outline-none focus:border-green-400"
                                            type="checkbox"
                                            name="is_ranger"
                                            value={createData.is_ranger}
                                            onChange={(e) => {
                                                setIsLandUsagePlanner(e.target.checked);
                                                change(e);
                                            }}
                                        />
                                    </div>
                                    <button className="w-full bg-green text-white p-2 rounded hover:bg-green" type="submit">Create Account</button>
                                    <button className="text-xs text-left hover:text-green relative top-2" onClick={changeForm}>Sign In</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
        );
    }else {
        return(
                <div className="bg-black w-full">
                {/* Login form */}
                    <div className=" flex items-center justify-center bg-black bg-login bg-cover h-screen w-screen">
                        <div className=" flex flex-col items-center justify-center">
                            <img className="w-60 py-5" alt="Logo" src="AWA-logo.png" /> 
                            <div className="bg-white p-6 rounded-lg shadow-md w-72">
                                <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>
                                <form className="" onSubmit={signIn}>
                                    <div className="mb-4">
                                        <label className="block text-gray-600 text-sm">Username</label>
                                        <input
                                            className="w-full p-2 border border-gray rounded focus:outline-none focus:border-green-400"
                                            type="text"
                                            name="username"
                                            value={signInData.username}
                                            onChange={change}
                                            
                                        />
                                        <div className=" text-xs text-red">{errors.userName}</div>

                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-600 text-sm">Password</label>
                                        <input
                                            className="w-full p-2 border border-gray rounded focus:outline-none focus:border-green-400"
                                            type="password"
                                            name="password"
                                            value={signInData.password}
                                            onChange={change}
                                        />
                                        <div className=" text-xs text-red">{errors.password}</div>
                                        <div className=" text-xs text-red">{errors.userNotFound}</div>
                                    </div>
                                    <button className="w-full bg-green text-white p-2 rounded hover:bg-green" type="submit">Log In</button>
                                    <button className="text-xs text-left hover:text-green relative top-2" onClick={changeForm}>Create Account</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
        );
    }
}

export default Login;