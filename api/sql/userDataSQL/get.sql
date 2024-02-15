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