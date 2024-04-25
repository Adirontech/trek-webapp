/**
* 03-wildernessAreasInit.sql - SQL script for initializing the WildernessAreas table.
* This script drops the WildernessAreas table if it already exists and then creates a new one.
* The table has two columns: id (serial primary key) and name (text).
*/

-- Drop the WildernessAreas table if it already exists
DROP TABLE IF EXISTS WildernessAreas CASCADE;

-- Create the WildernessAreas table
CREATE TABLE WildernessAreas (
    id SERIAL PRIMARY KEY, -- Unique identifier for each wilderness area
    name TEXT -- Name of the wilderness area
);
