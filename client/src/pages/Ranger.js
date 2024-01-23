import React, { useEffect, useState } from "react";

const Ranger = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch('http://localhost:5000/trips/all') // replace with your actual API endpoint
            .then(response => response.json())
            .then(data => setData(data));
    }, []);

    return (
        <div className="bg-gradient-to-b from-green-800 to-green-950 h-screen">
            <p>
                Ranger view data:
            </p>
            {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
        </div>
    );
}

export default Ranger;