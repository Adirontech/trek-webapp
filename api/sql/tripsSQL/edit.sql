/**
 * edit.sql - SQL script for creating a function to edit a trip in the database.
 * This script defines a PL/pgSQL function called edit_trip, which updates an existing trip record in the Trips table.
 * The function takes parameters for trip ID, leader ID, date, start location ID, purpose, duration, party size, and session key for authentication.
 * It checks if the provided session key is valid by querying the UserSessions table.
 * If authenticated, it updates the trip details in the Trips table based on the provided trip ID.
 */

CREATE OR REPLACE FUNCTION edit_trip(
    p_id INT,
    p_first_name VARCHAR,
    p_last_name VARCHAR,
    p_street VARCHAR,
    p_city VARCHAR,
    p_state CHAR(2),
    p_zip_code CHAR(5),
    p_date DATE,
    p_start INT,
    p_pois TEXT[],
    p_purpose TEXT,
    p_phone TEXT,
    p_duration INT,
    p_party_size INT,
    p_session_key VARCHAR
) RETURNS VOID AS $$
DECLARE
    v_session_key VARCHAR;
    v_creator_id INT;
    poi INT;
BEGIN
    SELECT session_key, user_id
    INTO v_session_keyt, v_creator_id
    FROM UserSessions
    WHERE session_key = p_session_key;

    -- Checking if a session key was found
    IF FOUND THEN
        -- Updating the trip details in the Trips table based on the provided trip ID
        UPDATE Trips
        SET creator = v_creator_id,
            first_name = p_first_name,
            last_name = p_last_name,
            street = p_street,
            city = p_city,
            state = p_state,
            zip_code = p_zip_code,
            date = p_date,
            start = p_start,
            purpose = p_purpose,
            phone = p_phone,
            duration = p_duration,
            party_size = p_party_size
        WHERE id = p_id;

        DELETE FROM TripDestinations td
        WHERE td.trip_id = p_id;

        FOREACH poi IN ARRAY p_pois
        LOOP
            INSERT INTO TripDestinations (trip_id, destination) VALUES(
                p_id, CAST(poi AS INT)
            );
        END LOOP;

        RAISE NOTICE 'Trip Updated';
    ELSE
        -- Throwing an exception if not authenticated
        RAISE EXCEPTION 'Not authenticated';
    END IF;
END $$ LANGUAGE PLPGSQL;

SELECT edit_trip(CAST($1 AS INT), $2, $3, $4, $5, $6, $7, CAST($8 AS DATE), CAST($9 AS INT), string_to_array(CAST($10, VARCHAR), ','), $11, $12, CAST($13 AS INT), CAST($14 AS INT), $15);