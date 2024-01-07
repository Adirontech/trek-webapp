CREATE OR REPLACE FUNCTION edit_trip(
    p_id INT,
    p_leader INT,
    p_date DATE,
    p_start INT,
    p_purpose TEXT,
    p_duration INT,
    p_party_size INT,
    p_session_key VARCHAR
) RETURNS VOID AS $$
DECLARE
    v_session_key VARCHAR;
BEGIN
    SELECT session_key
    INTO v_session_key
    FROM UserSessions
    WHERE session_key = p_session_key;

    IF FOUND THEN
        UPDATE Trips
        SET leader = p_leader,
            date = p_date,
            start = p_start,
            purpose = p_purpose,
            duration = p_duration,
            party_size = p_party_size
        WHERE id = p_id;
        RAISE NOTICE 'Trip Updated';
    ELSE
        RAISE EXCEPTION 'Not authenticated';
    END IF;
END $$ LANGUAGE PLPGSQL;

SELECT edit_trip($1, $2, $3, $4, $5, $6, $7, $8);