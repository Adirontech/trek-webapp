DROP TABLE IF EXISTS TripDestinations CASCADE;

CREATE TABLE TripDestinations (
    trip_id INT,
    destination INT,
    FOREIGN KEY (trip_id) REFERENCES Trips(id),
    FOREIGN KEY (destination) REFERENCES POIs(id)
)