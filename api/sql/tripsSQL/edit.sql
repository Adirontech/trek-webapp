/**
 * edit.sql - SQL script for creating a function to edit a trip in the database.
 * This script defines a PL/pgSQL function called edit_trip, which updates an existing trip record in the Trips table.
 * The function takes parameters for trip ID, leader ID, date, start location ID, purpose, duration, party size, and session key for authentication.
 * It checks if the provided session key is valid by querying the UserSessions table.
 * If authenticated, it updates the trip details in the Trips table based on the provided trip ID.
 */

CREATE OR REPLACE FUNCTION edit_trip(
    p_id INT, -- Trip ID of the trip to edit
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
        -- Updating the trip details in the Trips table based on the provided trip ID
        UPDATE Trips
        SET leader = p_leader,
            date = p_date,
            start = p_start,
            purpose = p_purpose,
            duration = p_duration,
            party_size = p_party_size
        WHERE id = p_id;
        -- Notifying that the trip was updated
        RAISE NOTICE 'Trip Updated';
    ELSE
        -- Throwing an exception if not authenticated
        RAISE EXCEPTION 'Not authenticated';
    END IF;
END $$ LANGUAGE PLPGSQL;

-- Calling the edit_trip function with placeholder parameters
SELECT edit_trip($1, $2, $3, $4, $5, $6, $7, $8);
