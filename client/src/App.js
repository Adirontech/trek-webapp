import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import Home from './pages/Home';
import Register from './pages/Register';
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
                </Routes>
            </BrowserRouter>
        </MainContext.Provider>
    )
}

export default App;