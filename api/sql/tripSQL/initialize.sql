DROP TABLE IF EXISTS Trips CASCADE;

CREATE TABLE Trips (
    id SERIAL PRIMARY KEY,
    leader INT NOT NULL,
    date DATETIME NOT NULL,
    start INT NOT NULL,
    purpose TEXT,
    duration INT,
    party_size INT,
    FOREIGN KEY (leader) REFERENCES User(id),
    FOREIGN KEY (start) REFERENCES POI(id)
)
