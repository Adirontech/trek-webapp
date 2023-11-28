DROP TABLE IF EXISTS Trips CASCADE;

CREATE TABLE Trips (
    id SERIAL PRIMARY KEY,
    leader INT NOT NULL,
    date TIMESTAMP NOT NULL,
    start INT NOT NULL,
    purpose TEXT,
    duration INT,
    party_size INT,
    FOREIGN KEY (leader) REFERENCES Users(id),
    FOREIGN KEY (start) REFERENCES POIs(id)
);
