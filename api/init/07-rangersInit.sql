/**
 * rangersInit.sql - SQL script for initializing the Rangers table.
 * This script drops the Rangers table if it already exists and then creates a new Rangers table.
 * The Rangers table stores ranger IDs, serving as a subset of users, with a foreign key constraint to the Users table.
 */

DROP TABLE IF EXISTS Rangers CASCADE; -- Drop Rangers table if it already exists

CREATE TABLE Rangers (
    id INT PRIMARY KEY, -- Ranger ID
    FOREIGN KEY (id) REFERENCES Users(id) -- Foreign key constraint to Users table
);
