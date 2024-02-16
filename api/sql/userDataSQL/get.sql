/**
 * get.sql - SQL script for retrieving user data based on session key.
 * This script defines a PL/pgSQL function called getUserData, which returns user data
 * such as first name, last name, address, city, state, zip code, and phone number,
 * based on the provided session key.
 * The function first checks if the session key is associated with a logged-in user.
 * If so, it retrieves the user ID from the UserSessions table and then retrieves the data ID
 * associated with that user from the Users table.
 * Finally, it returns the user data from the UserData table corresponding to the retrieved data ID.
 */

CREATE OR REPLACE FUNCTION getUserData(
    p_sessionKey VARCHAR
) RETURNS TABLE(
    id INT,
    first_name TEXT,
    last_name TEXT,
    address TEXT,
    city TEXT,
    state VARCHAR(2),
    zip VARCHAR(5),
    phone TEXT
) AS $$
DECLARE
    v_user_id INT;
    v_data_id INT;
BEGIN
    SELECT us.user_id
    INTO v_user_id
    FROM UserSessions us
    WHERE us.session_key = p_sessionKey;

    IF FOUND THEN
        SELECT u.data_id
        INTO v_data_id
        FROM Users u
        WHERE u.id = v_user_id;

        IF FOUND THEN
            RETURN QUERY
            SELECT *
            FROM UserData ud
            WHERE ud.id = v_data_id;
        ELSE
            RAISE EXCEPTION 'Could not find data associated with user';
        END IF;
    ELSE
        RAISE EXCEPTION 'User not logged in';
    END IF;
END $$ LANGUAGE PLPGSQL;

SELECT getUserData($1);
