import React, {useState, isValidElement} from "react";

const Login = () => {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConf, setPasswordConf] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [createAccount, setCreateAccount] = useState(false);
    const [errors, setErrors] = useState({});
            

    function changeForm(e) {
        setUserName("");
        setPassword("");
        setFirstName("");
        setLastName("");
        setPhone("");
        setPasswordConf("");
        setCreateAccount(!createAccount);
        setErrors({});
    };

    function change(e){
        const {name, value} = e.target;
        let errors = {};
        if(name === "username"){
            setUserName(value);
            errors["username"] = "";
        }
        if(name === "password"){
            setPassword(value);
            errors["password"] = "";
        }
        if(name === "firstname"){
            setFirstName(value);
            errors["firstname"] = "";
        }
        if(name === "lastname"){
            setLastName(value);
            errors["lastname"] = "";
        }
        if(name === "phone"){
            setPhone(value);
            errors["phone"] = "";
        }
        if(name === "passwordconf"){
            setPasswordConf(value)
            errors["passwordconf"] = "";
            if(value === password){
                errors["match"] = "";
            }
        }
        setErrors(errors);
    };

    function validate(){
        let isValid = true;
        let errors = {};
        if(!userName){
            isValid = false;
            errors["username"] = "Please enter a username";
        }
        if(!password){
            isValid = false;
            errors["password"] = "Please enter a password";
        }
        if(!firstName){
            isValid = false;
            errors["firstname"] = "Please enter a first name";
        }
        if(!lastName){
            isValid = false;
            errors["lastname"] = "Please enter a last name";
        }
        if(!phone){
            isValid = false;
            errors["phone"] = "Please enter a phone number";
        }
        if(!passwordConf){
            isValid = false;
            errors["passwordconf"] = "Please confirm your password";
        }
        if(password !== passwordConf){
            isValid = false;
            errors["match"] = "Passwords do not match";
        }
        setErrors(errors);
        return isValid;
    }

    function submit(e) {
        if(createAccount){
            if(validate()){

            }
        }else{
            if(validate()){

            }
        }
        e.preventDefault();
        console.log("Logged In");
    } 

    if(createAccount){
        return(
                <div className="bg-black w-full">
                    <div className=" flex items-center justify-center bg-black bg-login bg-scroll bg-cover w-screen  2xl:h-screen">
                        <div className=" flex flex-col items-center justify-center pb-5">
                            <img className="w-60 py-5" alt="Logo" src="AWA-logo.png" /> 
                            <div className="bg-white p-6 rounded-lg shadow-md w-72">
                                <h2 className="text-2xl font-semibold mb-4 text-center">Create Account</h2>
                                <form className="" onSubmit={submit}>
                                    <div className="mb-4">
                                        <label className="block text-gray-600 text-sm">First Name</label>
                                        <input
                                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-green-400"
                                            type="text"
                                            name="firstname"
                                            value={firstName}
                                            onChange={change}
                                        />
                                        <div className=" text-xs text-red-500">{errors.firstname}</div>
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-600 text-sm">Last Name</label>
                                        <input
                                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-green-400"
                                            type="text"
                                            name="lastname"
                                            value={lastName}
                                            onChange={change}
                                        />
                                        <div className=" text-xs text-red-500">{errors.lastname}</div>
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-600 text-sm">Phone</label>
                                        <input
                                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-green-400"
                                            type="tel"
                                            name="phone"
                                            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                                            placeholder="XXX-XXX-XXXX"
                                            value={phone}
                                            onChange={change}
                                        />
                                        <div className=" text-xs text-red-500">{errors.phone}</div>
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-600 text-sm">Username</label>
                                        <input
                                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-green-400"
                                            type="text"
                                            name="username"
                                            value={userName}
                                            onChange={change}
                                        />
                                        <div className=" text-xs text-red-500">{errors.username}</div>
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-600 text-sm">Password</label>
                                        <input
                                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-green-400"
                                            type="password"
                                            name="password"
                                            value={password}
                                            onChange={change}
                                        />
                                        <div className=" text-xs text-red-500">{errors.password}</div>

                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-600 text-sm">Password Confirmation</label>
                                        <input
                                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-green-400"
                                            type="password"
                                            name="passwordconf"
                                            value={passwordConf}
                                            onChange={change}
                                        />
                                        <div className=" text-xs text-red-500">{errors.passwordconf}</div>
                                        <div className=" text-xs text-red-500">{errors.match}</div>
                                    </div>
                                    <button className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700" type="submit">Log In</button>
                                    <button className="text-xs text-left hover:text-green-900 relative top-2" onClick={changeForm}>Sign In</button>
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
                                <form className="" onSubmit={submit}>
                                    <div className="mb-4">
                                        <label className="block text-gray-600 text-sm">Username</label>
                                        <input
                                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-green-400"
                                            type="text"
                                            name="username"
                                            value={userName}
                                            onChange={change}
                                            
                                        />
                                        <div className=" text-xs text-red-500">{errors.username}</div>

                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-600 text-sm">Password</label>
                                        <input
                                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-green-400"
                                            type="password"
                                            name="password"
                                            value={password}
                                            onChange={change}
                                        />
                                        <div className=" text-xs text-red-500">{errors.password}</div>
                                    </div>
                                    <button className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700" type="submit">Log In</button>
                                    <button className="text-xs text-left hover:text-green-900 relative top-2" onClick={changeForm}>Create Account</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
        );
    }
}

export default Login;