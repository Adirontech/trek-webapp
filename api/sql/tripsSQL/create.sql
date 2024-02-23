/**
 * create.sql - SQL script for creating a function to create a trip in the database.
 * This script defines a PL/pgSQL function called create_trip, which inserts a new trip record into the Trips table.
 * The function takes parameters for leader ID, date, start location ID, purpose, duration, party size, and session key for authentication.
 * It checks if the provided session key is valid by querying the UserSessions table.
 * If authenticated, it inserts the trip details into the Trips table.
 */

CREATE OR REPLACE FUNCTION create_trip(
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
    v_trip_id INT;
    poi INT;
BEGIN
    SELECT session_key, user_id
    INTO v_session_key, v_creator_id
    FROM UserSessions
    WHERE session_key = p_session_key;

    -- Checking if a session key was found
    IF FOUND THEN
        INSERT INTO Trips (creator, first_name, last_name, street, city, state, zip_code, date, start, purpose, phone, duration, party_size) VALUES(
            v_creator_id, p_first_name, p_last_name, p_street, p_city, p_state, p_zip_code, p_date, p_start, p_purpose, p_phone, p_duration, p_party_size
        )
        RETURNING id INTO v_trip_id;

        FOREACH poi IN ARRAY p_pois
        LOOP
            INSERT INTO TripDestinations (trip_id, destination) VALUES(
                v_trip_id, CAST(poi AS INT)
            );
        END LOOP;

        INSERT INTO TripDestinations (trip_id, destination) VALUES(
            v_trip_id, p_start
        );

        RAISE NOTICE 'Trip Created';
    ELSE
        -- Throwing an exception if not authenticated
        RAISE EXCEPTION 'Not authenticated';
    END IF;
END $$ LANGUAGE PLPGSQL;

SELECT create_trip($1, $2, $3, $4, $5, $6, CAST($7 AS DATE), CAST($8 AS INT), string_to_array($9, ','), $10, $11, CAST($12 AS INT), CAST($13 AS INT), $14);
