/**
 * 01-usersInit.sql - SQL script for initializing the Users table.
 * This script drops the Users table if it already exists and then creates a new Users table.
 * The Users table stores user credentials, including username and password, along with a reference to the corresponding UserData entry.
 * It has an auto-incrementing primary key (id) and ensures that both username and password fields are not nullable.
 * The data_id field is a foreign key referencing the id field in the UserData table.
 */

DROP TABLE IF EXISTS Users CASCADE; -- Drop Users table if it already exists

CREATE TABLE Users (
  id SERIAL PRIMARY KEY, -- Auto-incrementing primary key
  username TEXT NOT NULL, -- User's username (required)
  password TEXT NOT NULL, -- User's password (required)
  data_id INT NOT NULL, -- Foreign key referencing UserData entry
  FOREIGN KEY (data_id) REFERENCES UserData (id) -- Establishes a foreign key constraint referencing UserData table
);
