CREATE OR REPLACE FUNCTION create_trip(
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
        INSERT INTO Trips (leader, date, start, purpose, duration, party_size) VALUES(
            p_leader, p_date, p_start, p_purpose, p_duration, p_party_size
        );
        RAISE NOTICE 'Trip Created';
    ELSE
        RAISE EXCEPTION 'Not authenticated';
    END IF;
END $$ LANGUAGE PLPGSQL;

SELECT create_trip($1, $2, $3, $4, $5, $6, $7);
