import React from "react";

// const config = require("config/config");

const LandUsagePlanning = () => {
    // const [data, setData] = useState(null);

    // useEffect(() => {
    //     fetch(config.apiURL + '/trips/all')
    //         .then(response => response.json())
    //         .then(data => setData(data));
    // }, []);

    return (
        <div className="bg-gradient-to-b from-green-800 to-green-950 h-screen">
            <p>
                Land Usage Planning Page
            </p>
            {/* {data && <pre>{JSON.stringify(data, null, 2)}</pre>} */}
        </div>
    );
}

export default LandUsagePlanning;
