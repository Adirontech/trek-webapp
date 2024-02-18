import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import Home from './pages/Home';
import Ranger from './pages/Ranger';
import Register from './pages/Register';
import MainContext from "./MainContext";
import { useState } from "react";

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
                    <Route path='register' element={<Register/>} />
                    <Route path='ranger' element={<Ranger/>} />
                </Routes>
            </BrowserRouter>
        </MainContext.Provider>
    )
}

export default App;