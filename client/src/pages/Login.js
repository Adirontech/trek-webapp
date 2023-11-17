import React, {useState} from "react";
import { useNavigate } from 'react-router-dom';

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
            

    const changeForm = (e) => {
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
        if( name === "username" ){
            errors["userName"] = "";
        }
        if( name === "password" ){
            errors["password"] = "";
        }
        if( name === "first_name" ){
            errors["firstName"] = "";
        }
        if( name === "last_name" ){
            errors["lastName"] = "";
        }
        if( name === "phone" ){
            errors["phone"] = "";
        }
        if( name === "passwordConf" ){
            setPasswordConf(value);
            errors["passwordConf"] = "";
            if( value === createData.password ){
                errors["match"] = "";
            }
        }
        setErrors(errors);
    };

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