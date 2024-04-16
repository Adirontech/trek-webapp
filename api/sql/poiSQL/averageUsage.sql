/**
This query returns the average usage of POI(s) over a given time period (second and third params).
It returns the POI name, ID, type, average trip count, and average visitor count for the POI.
Filters the results based on the POI type (fourth param), POI ID (fifth param), and average visitor count (sixth and seventh params).
Groups the results by the step indicated by the first param. i.e. day, month, year, etc.
Orders the results by the start date.
*/
WITH Stats AS (
    SELECT 	p.name AS POI,
			p.id AS POI_ID,
			p.type AS type,
           	DATE_TRUNC($1, t.date) AS Start_Date, 
           	COUNT(t.id) AS Trip_Count, 
           	SUM(t.party_size) AS Visitors
    FROM POIs p
    INNER JOIN TripDestinations td ON p.id = td.destination
    INNER JOIN Trips t ON td.trip_id = t.id
    WHERE 
        (t.date BETWEEN CAST($2 AS DATE) AND CAST($3 AS DATE)
            AND p.type IN (
                SELECT UNNEST(string_to_array($4, ','))::poi_type_enum
            )
        )
        OR (t.date BETWEEN CAST($2 AS DATE) AND CAST($3 AS DATE)
            AND p.id IN (
                SELECT CAST(value AS INTEGER)
                    FROM UNNEST(string_to_array($5, ',')) AS value
                )
            )
    GROUP BY p.name, p.id, DATE_TRUNC($1, t.date)
)
SELECT POI, POI_ID, type,
       CAST(AVG(Trip_Count) AS INTEGER) AS Avg_Trip_Count,
       CAST(AVG(Visitors) AS INTEGER) AS Avg_Visitors
FROM Stats
GROUP BY POI, POI_ID, type
HAVING AVG(Visitors) BETWEEN $6 AND $7
ORDER BY POI_ID;