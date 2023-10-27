import React, {Component} from "react";

class Login extends Component {
    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
        };
    }

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
        return(
            <div className="">
                <div className="bg-black w-full">
                    <div className=" flex items-center justify-center bg-black bg-login bg-cover h-screen w-screen">
                        <div className=" flex flex-col items-center justify-center">
                            <img className="w-52 py-5" alt="Image" src="circle_logo.png" /> 
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
                                    <a className="text-xs text-left focus:text-green-900">Create Account</a>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            

        );
    }
    
}

export default Login;