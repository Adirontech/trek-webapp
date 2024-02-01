SELECT
    t.id,
    ud.first_name || ' ' || ud.last_name AS leader_name,
    t.date,
    t.purpose,
    t.duration,
    t.party_size,
    start_poi.name AS start,
    ARRAY_TO_STRING(ARRAY_AGG(dest_poi.name), ', ') AS destinations
FROM
    Trips t
INNER JOIN
    Users u ON t.leader = u.id
INNER JOIN
    UserData ud ON u.data_id = ud.id
INNER JOIN
    POIs start_poi ON t.start = start_poi.id
INNER JOIN
    TripDestinations d ON t.id = d.trip_id
INNER JOIN
    POIs dest_poi ON d.destination = dest_poi.id
GROUP BY
    t.id,
    leader_name,
    t.date,
    start_poi.name,
    t.purpose,
    t.duration,
    t.party_size;