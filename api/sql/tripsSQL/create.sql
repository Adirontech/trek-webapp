/**
 * create.sql - SQL script for creating a function to create a trip in the database.
 * This script defines a PL/pgSQL function called create_trip, which inserts a new trip record into the Trips table.
 * The function takes parameters for leader ID, date, start location ID, purpose, duration, party size, and session key for authentication.
 * It checks if the provided session key is valid by querying the UserSessions table.
 * If authenticated, it inserts the trip details into the Trips table.
 */

CREATE OR REPLACE FUNCTION create_trip(
    p_leader INT, -- Leader ID for the trip
    p_date DATE, -- Date of the trip
    p_start INT, -- Start location ID for the trip
    p_purpose TEXT, -- Purpose of the trip
    p_duration INT, -- Duration of the trip
    p_party_size INT, -- Size of the party for the trip
    p_session_key VARCHAR -- Session key for authentication
) RETURNS VOID AS $$
DECLARE
    v_session_key VARCHAR; -- Variable to hold the session key retrieved from the UserSessions table
BEGIN
    -- Retrieving the session key from the UserSessions table
    SELECT session_key
    INTO v_session_key
    FROM UserSessions
    WHERE session_key = p_session_key;

    -- Checking if a session key was found
    IF FOUND THEN
        -- Inserting the trip details into the Trips table
        INSERT INTO Trips (leader, date, start, purpose, duration, party_size) VALUES(
            p_leader, p_date, p_start, p_purpose, p_duration, p_party_size
        );
        -- Notifying that the trip was created
        RAISE NOTICE 'Trip Created';
    ELSE
        -- Throwing an exception if not authenticated
        RAISE EXCEPTION 'Not authenticated';
    END IF;
END $$ LANGUAGE PLPGSQL;

-- Calling the create_trip function with placeholder parameters
SELECT create_trip($1, $2, $3, $4, $5, $6, $7);
