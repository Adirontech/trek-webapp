DROP TABLE IF EXISTS Trips CASCADE;

CREATE TABLE Trips (
    id SERIAL PRIMARY KEY,
    leader INT,
    date DATETIME,
    start INT,
    destinations INT[] REFERENCES POI(id),
    purpose TEXT,
    duration INT,
    party_size INT,
    FOREIGN KEY (leader) REFERENCES UserData(id),
    FOREIGN KEY (start) REFERENCES POI(id)
)