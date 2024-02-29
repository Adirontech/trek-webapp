/**
 * getAll.sql - SQL script for retrieving all trips with their associated destinations.
 * This script selects trip information including ID, leader ID, date, start location ID, purpose, duration, party size,
 *   and an array of destinations for each trip from the Trips table, joining it with the TripDestinations table.
 * It groups the results by trip ID, leader ID, date, start location ID, purpose, duration, and party size.
 * The array_agg function is used to aggregate multiple destination values into an array for each trip.
 */

SELECT
    t.id, -- Trip ID
    t.leader, -- Leader ID for the trip
    t.date, -- Date of the trip
    t.start, -- Start location ID for the trip
    t.purpose, -- Purpose of the trip
    t.duration, -- Duration of the trip
    t.party_size, -- Size of the party for the trip
    ARRAY_AGG(d.destination) AS destinations -- Array of destinations for the trip
FROM
    Trips t -- Trips table alias
INNER JOIN
    TripDestinations d ON t.id = d.trip_id -- Joining TripDestinations table
GROUP BY
    t.id, -- Grouping by trip ID
    t.leader, -- Grouping by leader ID
    t.date, -- Grouping by date
    t.start, -- Grouping by start location ID
    t.purpose, -- Grouping by purpose
    t.duration, -- Grouping by duration
    t.party_size; -- Grouping by party size
