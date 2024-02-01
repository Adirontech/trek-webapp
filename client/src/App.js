import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import Home from './pages/Home'
import MainContext from "./MainContext";
import { useState } from "react";

const App = () => {
    const [isLandAllocationPlanner, setIsLandAllocationPlanner] = useState(false);
    
    return (
        <MainContext.Provider value={{
            isLandAllocationPlanner,
            setIsLandAllocationPlanner
        }}>
            <BrowserRouter>
                <Routes>
                    <Route path='login' element={<Login/>} />
                    <Route path='' element={<Home/>} />
                </Routes>
            </BrowserRouter>
        </MainContext.Provider>
    )
}

export default App;