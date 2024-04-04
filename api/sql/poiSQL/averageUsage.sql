Select p.name AS POI, DATE_TRUNC($1, t.date) AS Start_Date, AVG(t.id) AS Average_Trips, AVG(t.party_size) AS Average_Visitors
FROM POIs p
INNER JOIN TripDestinations td ON p.id = td.destination
INNER JOIN Trips t ON td.trip_id = t.id
WHERE 
    (t.date BETWEEN CAST($2 AS DATE) AND CAST($3 AS DATE)
        AND p.type IN (
            SELECT CAST(value AS poi_type_enum)
                FROM UNNEST(string_to_array($4, ',')) AS value
            )
            AND Average_Visitors BETWEEN $5 AND $6)
    OR (t.date BETWEEN CAST($2 AS DATE) AND CAST($3 AS DATE)
        AND p.id IN (
            SELECT CAST(value AS INTEGER)
                FROM UNNEST(string_to_array($7, ',')) AS value
            )
            AND Average_Visitors BETWEEN $5 AND $6)
GROUP BY p.name, DATE_TRUNC($1, t.date)
ORDER BY Start_Date;