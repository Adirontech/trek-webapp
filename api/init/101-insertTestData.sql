INSERT INTO UserData
    (id, first_name, last_name, phone, address, city, state, zip)
VALUES
    (1, 'Alice', 'Tester', '555-555-5555', '1 sesime', 'lakewood', 'NY', '13456'),
    (2, 'Bob', 'Tester', '555-555-6666', '2 sesimee', 'buffalo', 'NY', '09090');

INSERT INTO Users
    (id, username, password, data_id)
VALUES
    (1, 'alice', 'b109f3bbbc244eb82441917ed06d618b9008dd09b3befd1b5e07394c706a8bb980b1d7785e5976ec049b46df5f1326af5a2ea6d103fd07c95385ffab0cacbc86', 1), -- password is 'password'
    (2, 'bob', 'b109f3bbbc244eb82441917ed06d618b9008dd09b3befd1b5e07394c706a8bb980b1d7785e5976ec049b46df5f1326af5a2ea6d103fd07c95385ffab0cacbc86', 2); -- password is 'password'

INSERT INTO Trips
    (creator, first_name, last_name, street, city, state, zip_code, date, start, purpose, phone, duration, party_size)
VALUES
<<<<<<<< HEAD:api/init/101-insertTestData.sql
    (1, '01-01-2023 12:00:00', 1, 'Test Trip from Heart Lake', 1, 2),
    (2, '01-05-2023 12:00:00', 3, 'Test Trip from Upper Works', 2, 1);
========
    (1, 'Joe', 'Poe', '1 maple', 'lakewood', 'NY', '11111', '01-01-2023 12:00:00', 1, 'Test Trip from A', '444-444-4444', 1, 2),
    (2, 'Poe', 'Joe', '2 maple', 'lakewood', 'NY', '22222', '01-05-2023 12:00:00', 3, 'Test Trip from C', '333-333-3333', 2, 1);
>>>>>>>> main:api/init/100-insertTestData.sql

INSERT INTO TripDestinations
    (trip_id, destination)
VALUES
    (1, 4),
    (1, 5),
    (2, 6),
    (2, 7),
    (2, 8);