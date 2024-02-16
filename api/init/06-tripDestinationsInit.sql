/**
 * tripDestinationsInit.sql - SQL script for initializing the TripDestinations table.
 * This script drops the TripDestinations table if it already exists and then creates a new TripDestinations table.
 * The TripDestinations table associates trip IDs with destination IDs, defining foreign key constraints to the Trips and POIs tables.
 */

DROP TABLE IF EXISTS TripDestinations CASCADE; -- Drop TripDestinations table if it already exists

CREATE TABLE TripDestinations (
    trip_id INT, -- ID of the trip (references Trips table)
    destination INT, -- ID of the destination (references POIs table)
    FOREIGN KEY (trip_id) REFERENCES Trips(id), -- Foreign key constraint to Trips table
    FOREIGN KEY (destination) REFERENCES POIs(id) -- Foreign key constraint to POIs table
);
