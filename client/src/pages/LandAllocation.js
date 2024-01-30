import React, { useEffect, useState } from "react";

const LandAllocation = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch('http://localhost:5000/trips/all')
            .then(response => response.json())
            .then(data => setData(data));
    }, []);

    return (
        <div className="bg-gradient-to-b from-green-800 to-green-950 h-screen">
            <p>
                Land Allocation view data:
            </p>
            {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
        </div>
    );
}

export default LandAllocation;
