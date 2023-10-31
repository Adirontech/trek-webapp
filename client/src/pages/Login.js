import React, {Component, isValidElement} from "react";

class Login extends Component {
    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
            passwordconf: "",
            createAccount: false,
            errors: {},
        };
    }

    changeForm = (e) => {
        const createAccount = this.state.createAccount;
        this.setState({
            createAccount: !createAccount,
            username: "",
            password: "",
            passwordconf: "",
            errors: {},
        });
    };

    change = (e) => {
        const {name, value} = e.target;
        let errors = {};
        this.setState({
            [name]: value
        });
        if(name === "username"){
            errors["username"] = "";
        }
        if(name === "password"){
            errors["password"] = "";
        }
        if(name === "passwordconf"){
            const pw = this.state.password;
            errors["passwordconf"] = "";
            if(value === pw){
                errors["match"] = "";
            }
        }
        this.setState({
            errors: errors
        })
    };

    validate() {
        let isValid = true;
        let errors = {};
        let user = this.state.username;
        let pw = this.state.password;
        let pwconf = this.state.passwordconf;
        if(!user){
            isValid = false;
            errors["username"] = "Please enter a username";
        }
        if(!pw){
            isValid = false;
            errors["password"] = "Please enter a password";
        }
        if(!pwconf){
            isValid = false;
            errors["passwordconf"] = "Please confirm your password";
        }
        if(pw !== pwconf){
            isValid = false;
            errors["match"] = "Passwords do not match";
        }
        this.setState({
            errors: errors
        });
        return isValid;
    }

    submit = (e) => {
        const isCreate = this.state.createAccount;
        if(isCreate){
            if(this.validate()){

            }
        }else{
            if(this.validate()){

            }
        }
        e.preventDefault();
        console.log("Logged In");
    } 

    render() {
        const isCreate = this.state.createAccount;
        if(isCreate){
            return(
                    <div className="bg-black w-full">
                        <div className=" flex items-center justify-center bg-black bg-login bg-cover h-screen w-screen">
                            <div className=" flex flex-col items-center justify-center">
                                <img className="w-52 py-5" alt="Logo" src="circle_logo.png" /> 
                                <div className="bg-white p-6 rounded-lg shadow-md w-72">
                                    <h2 className="text-2xl font-semibold mb-4 text-center">Create Account</h2>
                                    <form className="" onSubmit={this.submit}>
                                        <div className="mb-4">
                                            <label className="block text-gray-600 text-sm">Username</label>
                                            <input
                                                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-green-400"
                                                type="text"
                                                name="username"
                                                value={this.state.username}
                                                onChange={this.change}
                                            />
                                            <div className=" text-xs text-red-500">{this.state.errors.username}</div>
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-gray-600 text-sm">Password</label>
                                            <input
                                                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-green-400"
                                                type="password"
                                                name="password"
                                                value={this.state.password}
                                                onChange={this.change}
                                            />
                                            <div className=" text-xs text-red-500">{this.state.errors.password}</div>

                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-gray-600 text-sm">Password Confirmation</label>
                                            <input
                                                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-green-400"
                                                type="password"
                                                name="passwordconf"
                                                value={this.state.passwordconf}
                                                onChange={this.change}
                                            />
                                            <div className=" text-xs text-red-500">{this.state.errors.passwordconf}</div>
                                            <div className=" text-xs text-red-500">{this.state.errors.match}</div>
                                        </div>
                                        <button className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700" type="submit">Log In</button>
                                        <button className="text-xs text-left hover:text-green-900 relative top-2" onClick={this.changeForm}>Sign In</button>
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
                                <img className="w-52 py-5" alt="Logo" src="circle_logo.png" /> 
                                <div className="bg-white p-6 rounded-lg shadow-md w-72">
                                    <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>
                                    <form className="" onSubmit={this.submit}>
                                        <div className="mb-4">
                                            <label className="block text-gray-600 text-sm">Username</label>
                                            <input
                                                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-green-400"
                                                type="text"
                                                name="username"
                                                value={this.state.username}
                                                onChange={this.change}
                                                
                                            />
                                            <div className=" text-xs text-red-500">{this.state.errors.username}</div>

                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-gray-600 text-sm">Password</label>
                                            <input
                                                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-green-400"
                                                type="password"
                                                name="password"
                                                value={this.state.password}
                                                onChange={this.change}
                                            />
                                            <div className=" text-xs text-red-500">{this.state.errors.password}</div>
                                        </div>
                                        <button className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700" type="submit">Log In</button>
                                        <button className="text-xs text-left hover:text-green-900 relative top-2" onClick={this.changeForm}>Create Account</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
            );
        }
    }  
}

export default Login;