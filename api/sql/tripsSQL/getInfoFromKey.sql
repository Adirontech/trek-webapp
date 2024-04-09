SELECT
    t.id,
    t.date,
    p1.name AS start,
    t.purpose,
    t.duration,
    t.party_size,
    ARRAY_TO_STRING(ARRAY_AGG(p2.name), ', ') AS destinations
FROM
    Trips t
INNER JOIN
    TripDestinations d ON t.id = d.trip_id
INNER JOIN
    UserSessions s ON s.user_id = t.creator
INNER JOIN
    POIs p1 ON t.start = p1.id
INNER JOIN
    POIs p2 ON d.destination = p2.id
WHERE
    s.session_key = $1 AND
    t.creator = s.user_id
GROUP BY
    t.id,
    t.date,
    p1.name,
    t.purpose,
    t.duration,
    t.party_size;