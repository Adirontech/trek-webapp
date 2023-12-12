SELECT
    t.id,
    t.leader,
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
GROUP BY
    t.id,
    t.leader,
    t.date,
    t.start,
    t.purpose,
    t.duration,
    t.party_size;