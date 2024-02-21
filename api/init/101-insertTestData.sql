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
    (1, '01-01-2023 12:00:00', 1, 'Test Trip from Heart Lake', 1, 2),
    (2, '01-05-2023 12:00:00', 3, 'Test Trip from Upper Works', 2, 1);

INSERT INTO TripDestinations
    (trip_id, destination)
VALUES
    (1, 4),
    (1, 5),
    (2, 6),
    (2, 7),
    (2, 8);