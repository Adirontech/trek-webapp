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
    (1, 'alice', 'b109f3bbbc244eb82441917ed06d618b9008dd09b3befd1b5e07394c706a8bb980b1d7785e5976ec049b46df5f1326af5a2ea6d103fd07c95385ffab0cacbc86', 1), -- password is 'password'
    (2, 'bob', 'b109f3bbbc244eb82441917ed06d618b9008dd09b3befd1b5e07394c706a8bb980b1d7785e5976ec049b46df5f1326af5a2ea6d103fd07c95385ffab0cacbc86', 2); -- password is 'password'

INSERT INTO Trips
    (leader, date, start, purpose, duration, party_size)
VALUES
    (1, '01-01-2023 12:00:00', 1, 'Test Trip from A', 1, 2),
    (2, '01-05-2023 12:00:00', 2, 'Test Trip from C', 2, 1),
    (2, '02-01-2023 12:00:00', 3, 'Test Trip from B', 1, 3),
    (1, '02-05-2023 12:00:00', 1, 'Test Trip from D', 3, 1),
    (2, '03-01-2023 12:00:00', 2, 'Test Trip from A', 2, 3),
    (1, '03-05-2023 12:00:00', 3, 'Test Trip from C', 1, 2),
    (1, '04-01-2023 12:00:00', 1, 'Test Trip from B', 3, 1),
    (2, '04-05-2023 12:00:00', 2, 'Test Trip from D', 2, 3),
    (2, '05-01-2023 12:00:00', 3, 'Test Trip from A', 3, 2),
    (1, '05-05-2023 12:00:00', 1, 'Test Trip from C', 2, 1),
    (2, '06-01-2023 12:00:00', 2, 'Test Trip from B', 1, 3),
    (1, '06-05-2023 12:00:00', 3, 'Test Trip from D', 3, 2),
    (1, '07-01-2023 12:00:00', 1, 'Test Trip from A', 2, 1),
    (2, '07-05-2023 12:00:00', 2, 'Test Trip from C', 1, 3),
    (2, '08-01-2023 12:00:00', 3, 'Test Trip from B', 3, 2),
    (1, '08-05-2023 12:00:00', 1, 'Test Trip from D', 2, 1),
    (2, '09-01-2023 12:00:00', 2, 'Test Trip from A', 3, 1),
    (1, '09-05-2023 12:00:00', 3, 'Test Trip from C', 1, 2),
    (1, '10-01-2023 12:00:00', 1, 'Test Trip from B', 2, 3),
    (2, '10-05-2023 12:00:00', 2, 'Test Trip from D', 3, 1);

INSERT INTO TripDestinations
    (trip_id, destination)
VALUES
    (1, 4),
    (1, 5),
    (2, 6),
    (2, 7),
    (2, 8),
    (3, 1),
    (3, 2),
    (4, 3),
    (4, 4),
    (5, 5),
    (5, 6),
    (5, 7),
    (6, 8),
    (7, 1),
    (7, 2),
    (7, 3),
    (8, 4),
    (8, 5),
    (8, 6),
    (9, 7),
    (9, 8),
    (10, 1),
    (10, 2),
    (10, 3),
    (11, 4),
    (11, 5),
    (11, 6),
    (12, 7),
    (12, 8),
    (13, 1),
    (13, 2),
    (13, 3),
    (14, 4),
    (14, 5),
    (14, 6),
    (15, 7),
    (15, 8),
    (16, 1),
    (16, 2),
    (16, 3),
    (17, 4),
    (17, 5),
    (17, 6),
    (18, 7),
    (18, 8),
    (19, 1),
    (19, 2),
    (19, 3),
    (20, 4),
    (20, 5),
    (20, 6);
