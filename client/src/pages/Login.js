import React, {useState, isValidElement} from "react";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordconf, setPasswordConf] = useState("");
    const [createAccount, setCreateAccount] = useState(false);
    const [errors, setErrors] = useState({});
            

    function changeForm(e) {
        setUsername("");
        setPassword("");
        setPasswordConf("");
        setCreateAccount(!createAccount);
        setErrors({});
    };

    function change(e){
        const {name, value} = e.target;
        let errors = {};
        if(name === "username"){
            setUsername(value);
            errors["username"] = "";
        }
        if(name === "password"){
            setPassword(value);
            errors["password"] = "";
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
        if(!username){
            isValid = false;
            errors["username"] = "Please enter a username";
        }
        if(!password){
            isValid = false;
            errors["password"] = "Please enter a password";
        }
        if(!passwordconf){
            isValid = false;
            errors["passwordconf"] = "Please confirm your password";
        }
        if(password !== passwordconf){
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
                    <div className=" flex items-center justify-center bg-black bg-login bg-cover h-screen w-screen">
                        <div className=" flex flex-col items-center justify-center">
                            <img className="w-60 py-5" alt="Logo" src="AWA-logo.png" /> 
                            <div className="bg-white p-6 rounded-lg shadow-md w-72">
                                <h2 className="text-2xl font-semibold mb-4 text-center">Create Account</h2>
                                <form className="" onSubmit={submit}>
                                    <div className="mb-4">
                                        <label className="block text-gray-600 text-sm">Username</label>
                                        <input
                                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-green-400"
                                            type="text"
                                            name="username"
                                            value={username}
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
                                            value={passwordconf}
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
                                            value={username}
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