INSERT INTO Rangers (id)
SELECT U.id
FROM Users U
WHERE U.username = $1 AND EXISTS (
    SELECT 1
    FROM UserSessions US
    INNER JOIN Rangers R ON US.user_id = R.id
    WHERE US.session_key = $2
);