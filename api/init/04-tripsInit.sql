/**
 * tripsInit.sql - SQL script for initializing the Trips table.
 * This script drops the Trips table if it already exists and then creates a new Trips table.
 * The Trips table stores information about trips, including their leaders, dates, starting points, purposes, durations, and party sizes.
 * It has an auto-incrementing primary key (id) and defines foreign key constraints to Users and POIs tables.
 */

DROP TABLE IF EXISTS Trips CASCADE; -- Drop Trips table if it already exists

CREATE TABLE Trips (
    id SERIAL PRIMARY KEY, -- Auto-incrementing primary key
    leader INT NOT NULL, -- ID of the trip leader (references Users table)
    date DATE NOT NULL, -- Date of the trip
    start INT NOT NULL, -- Starting point of the trip (references POIs table)
    purpose TEXT, -- Purpose of the trip
    duration INT, -- Duration of the trip
    party_size INT, -- Size of the party
    FOREIGN KEY (leader) REFERENCES Users(id), -- Foreign key constraint to Users table
    FOREIGN KEY (start) REFERENCES POIs(id) -- Foreign key constraint to POIs table
);
