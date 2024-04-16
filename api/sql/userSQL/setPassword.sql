WITH updated AS (
    UPDATE Users
    SET password = $3
    FROM UserSessions as us
    WHERE us.user_id = Users.id AND us.session_key = $1 AND Users.password = $2
    RETURNING *
)
SELECT COUNT(*) FROM updated;