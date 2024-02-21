/**
 * signIn.sql - SQL script for creating a session key upon user sign-in.
 * This script defines a function named session_key that takes a username, password, and session key
 * as input parameters and returns a session key upon successful sign-in.
 * It checks if the provided username and password match a record in the Users table.
 * If a match is found, it inserts a record into the UserSessions table with the user's ID and session key.
 * It then returns the session key.
 * If no match is found, it raises an exception indicating that the user was not found.
 */

CREATE OR REPLACE FUNCTION session_key(
    p_username VARCHAR,
    p_password VARCHAR,
    p_sessionKey VARCHAR
) RETURNS VARCHAR AS $$
DECLARE
    v_user_id INTEGER;
BEGIN
    SELECT id
    INTO v_user_id
    FROM Users
    WHERE username = p_username AND password = p_password;

    IF FOUND THEN
        INSERT INTO UserSessions (user_id, session_key)
        VALUES (v_user_id, p_sessionKey);
        RAISE NOTICE 'Session Key: %', p_sessionKey;
        RETURN p_sessionKey;
    ELSE
        RAISE EXCEPTION 'User not found';
    END IF;
END $$ LANGUAGE PLPGSQL;

SELECT session_key($1, $2, $3); -- Call the session_key function with provided parameters
