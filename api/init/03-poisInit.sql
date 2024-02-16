/**
 * poisInit.sql - SQL script for initializing the POIs (Points of Interest) table.
 * This script drops the POIs table if it already exists and then creates a new POIs table.
 * The POIs table stores information about points of interest, including their names and types.
 * It has an auto-incrementing primary key (id) and defines a custom enum type (poi_type_enum) for the type field,
 * which can be either 'Trailhead' or 'Trail Location'.
 */

DROP TABLE IF EXISTS POIs CASCADE; -- Drop POIs table if it already exists

CREATE TYPE poi_type_enum AS ENUM ('Trailhead', 'Trail Location'); -- Define custom enum type for POI types

CREATE TABLE POIs (
    id SERIAL PRIMARY KEY, -- Auto-incrementing primary key
    name TEXT, -- Name of the POI
    type poi_type_enum -- Type of the POI (either 'Trailhead' or 'Trail Location')
);
