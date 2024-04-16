UPDATE UserData
SET
    first_name = $2,
    last_name = $3,
    address = $4,
    city = $5,
    state = $6,
    zip = $7,
    phone = $8
FROM UserSessions
WHERE UserSessions.session_key = $1
AND UserSessions.user_id = UserData.id;