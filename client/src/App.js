import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import Home from './pages/Home';
import Register from './pages/Register';
import Profile from "./pages/Profile";
import ChangePassword from './pages/ChangePassword';
import CheckIn from "./pages/CheckIn";
import ProfilePerms from "./pages/ProfilePerms";
import MainContext from "./MainContext";
import { useState } from "react";
import LandAllocation from "./pages/LandAllocation";

const App = () => {
    const [isLandUsagePlanner, setIsLandUsagePlanner] = useState(false);

    return (
        <MainContext.Provider value={{
            isLandUsagePlanner,
            setIsLandUsagePlanner
        }}>
            <BrowserRouter>
                <Routes>
                    <Route path='' element={<Home/>} />
                    <Route path='login' element={<Login/>} />
                    <Route path='register' element={<Register />} />
                    <Route path='landAllocation' element={<LandAllocation/>} />
                    <Route path='profile' element={<Profile/>} />
                    <Route path='change-password' element={<ChangePassword/>} />
                    <Route path='check-in' element={<CheckIn/>} />
                    <Route path='permissions' element={<ProfilePerms/>} />
                </Routes>
            </BrowserRouter>
        </MainContext.Provider>
    )
}

export default App;