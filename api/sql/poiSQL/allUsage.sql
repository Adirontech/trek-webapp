/**
This query returns all poi usage grouped by day.
It returns the POI name, ID, type, date, trip count, and visitor count for the POI.
Orders the results by the start date.
*/
Select p.name AS POI, p.id AS POI_ID, p.type AS type, t.date AS Date, COUNT(t.id) AS Trip_Count, SUM(t.party_size) AS Visitors
FROM POIs p
INNER JOIN TripDestinations td ON p.id = td.destination
INNER JOIN Trips t ON td.trip_id = t.id
GROUP BY p.name, p.id, DATE_TRUNC('day', t.date), t.date
ORDER BY t.date;