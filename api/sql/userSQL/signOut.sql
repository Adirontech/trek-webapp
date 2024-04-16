UPDATE UserSessions 
SET exp_date = CURRENT_TIMESTAMP
WHERE session_key = $1