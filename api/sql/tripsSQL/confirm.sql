CREATE OR REPLACE FUNCTION confirm_trip(_confirm_code CHAR(7))
RETURNS BOOLEAN AS $$
DECLARE
    _checked_in BOOLEAN;
BEGIN
    IF CHAR_LENGTH(_confirm_code) <> 7 THEN
        RETURN NULL;
    END IF;

    SELECT checked_in INTO _checked_in
    FROM trips
    WHERE confirm_code = _confirm_code;
    
    IF _checked_in IS NULL THEN
        RETURN NULL;
    ELSIF _checked_in THEN
        RETURN FALSE;
    ELSE
        UPDATE trips
        SET checked_in = TRUE
        WHERE confirm_code = _confirm_code;
        RETURN TRUE;
    END IF;
END $$ LANGUAGE PLPGSQL;

SELECT confirm_trip($1);