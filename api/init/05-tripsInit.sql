DROP TABLE IF EXISTS Trips CASCADE;

CREATE TABLE Trips (
    id SERIAL PRIMARY KEY,
    confirm_code CHAR(7) NOT NULL,
    creator INT NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    street VARCHAR(100) NOT NULL,
    city VARCHAR(50) NOT NULL,
    state CHAR(2) NOT NULL,
    zip_code CHAR(5) NOT NULL,
    date DATE NOT NULL,
    start INT NOT NULL,
    purpose TEXT,
    phone TEXT,
    duration INT NOT NULL,
    party_size INT NOT NULL,
    FOREIGN KEY (creator) REFERENCES Users(id),
    FOREIGN KEY (start) REFERENCES POIs(id)
);
