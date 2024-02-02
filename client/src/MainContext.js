import { createContext } from "react";

const MainContext = createContext({
    isLandUsagePlanner: "",
    setIsLandUsagePlanner: () => {}
});

export default MainContext;