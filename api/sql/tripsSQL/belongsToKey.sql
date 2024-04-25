CREATE OR REPLACE FUNCTION belongs_to(_confirm_code CHAR(7), _session_key VARCHAR(100))
RETURNS BOOLEAN AS $$
DECLARE
    _trip_id INTEGER;
BEGIN
    SELECT t.id INTO _trip_id
    FROM Trips AS t
    INNER JOIN UserSessions AS us
    ON t.creator = us.user_id
    WHERE us.session_key = _session_key AND t.confirm_code = _confirm_code;
    
    IF _trip_id IS NULL THEN
        RETURN FALSE;
    ELSE
        RETURN TRUE;
    END IF;
END $$ LANGUAGE PLPGSQL;

SELECT belongs_to($1, $2);