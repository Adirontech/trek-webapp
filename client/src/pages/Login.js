import React, { useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import MainContext from "../MainContext";

const Login = () => {
    const navigate = useNavigate();
    const [passwordConf, setPasswordConf] = useState("");
    const [createAccount, setCreateAccount] = useState(false);
    const [errors, setErrors] = useState({});
    const [createData, setCreateData] = useState({
        username: '',
        password: '',
        first_name: '',
        last_name: '',
        phone: ''
    });
    const [signInData, setSignInData] = useState({
        username: '',
        password: ''
    });
    const {
        isLandUsagePlanner, 
        setIsLandUsagePlanner
    } = useContext(MainContext);
            
    /**
     * Changes the form.
     * Clears all entered data and errors.
     */
    const changeForm = () => {
        setCreateData({
            username: '',
            password: '',
            first_name: '',
            last_name: '',
            phone: ''
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
     * Sets entered data to createData or signInData depending on the 'createAccount' state value.
     * Does not include passwordConf in createData as it is not sent in the request.
     * The switch checks which errors need to be cleared and sets them.
     * @param {*} e - event
     */
    const change = (e) => {
        const {name, value} = e.target;
        let errors = {};
        if ( createAccount && (name !== "passwordConf") ){
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
        switch (true) {
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
     * This is a validator for data creating an account.
     * It checks to see if there is a value for all required fields and compares the password with the confirmation password.
     * Updates errors and returns true or false.
     * @returns Boolean
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
     * This is a validator for signing in.
     * It ensures there is a username and password entered, sets errors, and returns true or false
     * @returns Boolean
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
     * This function creates a user and signs them in, redirecting them to the landing page.
     * It first validates the data and makes a create API request. 
     * Getting the user id from the create API response, it sets the userID in the browsers session data.
     * Then makes a sign in API request which returns a sessionKey that is set in the browsers session data.
     * Finally redirects the user to the landing page given all the requests were successful
     * @param {} e - event
     */
    async function create(e) {
        e.preventDefault();
        if( validateCreate() ){
            try{
                const cOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(createData)
                };
                const cResponse = await fetch('http://localhost:5000/user/', cOptions);
                if ( !cResponse.ok ) {
                    throw new Error(`HTTP error! Status: ${cResponse.status}`);
                }
                const cData = await cResponse.json();
                if( cData.user_id ) {
                    sessionStorage.setItem('userId', cData.user_id);
                    const sOptions = {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ username: createData.username, password: createData.password })
                    };
                    const sResponse = await fetch('http://localhost:5000/user/', sOptions);
                    if ( !sResponse.ok ) {
                        throw new Error(`HTTP error! Status: ${sResponse.status}`);
                    }
                    const sData = await sResponse.json();
                    if( sData.session_key ) {
                        sessionStorage.setItem('sessionKey', sData.session_key);
                        navigate('/');
                    }
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
    };

    /**
     * This function signs in a user, stores a session key, and redirects the user to the landing page.
     * It first validates the data and makes the sign in API request.
     * If a session key is returned, it is stored and the user is redirected to the landing page.
     * If not, it sets an error for an incorrect username or password.
     * @param {*} e - event
     */
    async function signIn(e) {
        let errors = {};
        e.preventDefault();
        if( validateSignIn() ){
            try{
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
                if( data.session_key ){
                    sessionStorage.setItem('sessionKey', data.session_key);
                    navigate('/');
                }else{
                    errors["userNotFound"] = "Incorrect username or password";
                    setErrors(errors);
                }
            } catch ( error ) {
                console.log('Error:', error);
            }
        }
    };

    if(createAccount){
        return(
                <div className="bg-black w-full">
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
                                        <label className="block text-gray-600 text-sm">Are you a land usage planner?</label>
                                        <input
                                            className="w-full h-6 p-2 border border-gray rounded focus:outline-none focus:border-green-400"
                                            type="checkbox"
                                            name="landPlanner"
                                            value={isLandUsagePlanner}
                                            onChange={(e) => {
                                                setIsLandUsagePlanner(e.target.checked);
                                            }}
                                        />
                                    </div>
                                    <button className="w-full bg-green text-white p-2 rounded hover:bg-green" type="submit" onClick={() => {navigate('/')}}>Create Account</button>
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