SELECT EXISTS(
    SELECT 1
    FROM UserSessions sk
    JOIN Users u ON sk.user_id = u.id
    WHERE sk.session_key = $1
        AND EXISTS (SELECT id FROM Rangers WHERE id = u.id)
) AS is_allocator;