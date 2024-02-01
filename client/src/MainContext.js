import {createContext} from "react";

const MainContext = createContext({
    isLandAllocationPlanner: "",
    setIsLandAllocationPlanner: () => {}
});

export default MainContext;