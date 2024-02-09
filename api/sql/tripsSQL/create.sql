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

        RAISE NOTICE 'Trip Created';
    ELSE
        RAISE EXCEPTION 'Not authenticated';
    END IF;
END $$ LANGUAGE PLPGSQL;

SELECT create_trip($1, $2, $3, $4, $5, $6, CAST($7 AS DATE), CAST($8 AS INT), string_to_array($9, ','), $10, $11, CAST($12 AS INT), CAST($13 AS INT), $14);
