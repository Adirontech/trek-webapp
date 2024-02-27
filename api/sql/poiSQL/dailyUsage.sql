SELECT COUNT(t.id) AS trip_count, SUM(t.party_size) AS visitors
FROM POIs p
INNER JOIN TripDestinations td ON p.id = td.destination
INNER JOIN Trips t ON td.trip_id = t.id
WHERE 
    p.id = $1 AND
    DATE(t.date) = DATE($2)