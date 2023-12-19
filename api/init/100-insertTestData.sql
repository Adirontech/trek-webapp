INSERT INTO POIs (id, name, type)
VALUES 
    (1, 'Trailhead A', 'Trailhead'),
    (2, 'Trailhead B', 'Trailhead'),
    (3, 'Trailhead C', 'Trailhead'),
    (4, 'Location 1', 'Trail Location'),
    (5, 'Location 2', 'Trail Location'),
    (6, 'Location 3', 'Trail Location'),
    (7, 'Location 4', 'Trail Location'),
    (8, 'Location 5', 'Trail Location');

INSERT INTO UserData
    (id, first_name, last_name, phone)
VALUES
    (1, 'Alice', 'Tester', '555-555-5555'),
    (2, 'Bob', 'Tester', '555-555-6666');

INSERT INTO Users
    (id, username, password, data_id)
VALUES
    (1, 'alice', 'password', 1),
    (2, 'bob', 'password', 2);

INSERT INTO Trips
    (leader, date, start, purpose, duration, party_size)
VALUES
    (1, '01-01-2023 12:00:00', 1, 'Test Trip from A', 1, 2),
    (2, '01-05-2023 12:00:00', 3, 'Test Trip from C', 2, 1);

INSERT INTO TripDestinations
    (trip_id, destination)
VALUES
    (1, 4),
    (1, 5),
    (2, 6),
    (2, 7),
    (2, 8);