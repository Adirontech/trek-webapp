import React, {Component} from "react";

class Login extends Component {
    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
            passwordconf: "",
            createAccount: false,
        };
    }

    signIn = (e) => {
        this.setState({
            createAccount: false
        })
    }

    create = (e) => {
        this.setState({
            createAccount: true
        });
    };

    change = (e) => {
        const {name, value} = e.target;
        this.setState({
            [name]: value
        });
    };

    submit = (e) => {
        e.preventDefault();
        console.log("Logged In");
    } 

    render() {
        const isCreate = this.state.createAccount;
        if(isCreate){
            return(
                <div className="">
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
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-gray-600 text-sm">Password</label>
                                            <input
                                                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-green-400"
                                                type="text"
                                                name="password"
                                                value={this.state.password}
                                                onChange={this.change}
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-gray-600 text-sm">Password Confirmation</label>
                                            <input
                                                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-green-400"
                                                type="text"
                                                name="passwordConf"
                                                value={this.state.passwordconf}
                                                onChange={this.change}
                                            />
                                        </div>
                                        <button className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700" type="submit">Log In</button>
                                        <button className="text-xs text-left hover:text-green-900" onClick={this.signIn}>Sign In</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }else {
            return(
                <div className="">
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
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-gray-600 text-sm">Password</label>
                                            <input
                                                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-green-400"
                                                type="text"
                                                name="password"
                                                value={this.state.password}
                                                onChange={this.change}
                                            />
                                        </div>
                                        <button className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700" type="submit">Log In</button>
                                        <button className="text-xs text-left hover:text-green-900" onClick={this.create}>Create Account</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    
    }
    
}

export default Login;