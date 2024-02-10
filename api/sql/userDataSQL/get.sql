CREATE OR REPLACE FUNCTION getUserData(
    p_sessionKey VARCHAR
) RETURNS TABLE(
    id SERIAL,
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
    SELECT user_id
    INTO v_user_id
    FROM UserSessions
    WHERE session_key = p_sessionKey;

    IF FOUND THEN
        SELECT data_id
        INTO v_data_id
        FROM User
        WHERE id = v_user_id;

        RETURN QUERY
        SELECT *
        FROM UserData
        WHERE data_id = v_data_id;

    ELSE
        RAISE EXCEPTION 'User not found';
    END IF;
END $$ LANGUAGE PLPGSQL;

SELECT getUserData($1);