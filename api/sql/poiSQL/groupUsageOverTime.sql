SELECT p.id AS poi_id, COUNT(td.trip_id) AS count
FROM POIs p
JOIN TripDestinations td ON p.id = td.destination
JOIN Trips t ON td.trip_id = t.id
WHERE p.id IN (
	SELECT CAST(value AS INTEGER)
		FROM UNNEST(string_to_array($1, ',')) AS value
	)
    AND t.date BETWEEN CAST($2 AS DATE) AND CAST($3 AS DATE)
GROUP BY p.id;