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

SELECT session_key($1, $2, $3);