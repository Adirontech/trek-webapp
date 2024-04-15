SELECT
    t.id,
    t.date,
    t.start,
    t.purpose,
    t.duration,
    t.party_size,
    ARRAY_AGG(d.destination) AS destinations
FROM
    Trips t
INNER JOIN
    TripDestinations d ON t.id = d.trip_id
INNER JOIN
    UserSessions s ON s.user_id = t.creator
WHERE
	s.session_key = $1 AND
    t.creator = s.user_id
GROUP BY
    t.id,
    t.date,
    t.start,
    t.purpose,
    t.duration,
    t.party_size;