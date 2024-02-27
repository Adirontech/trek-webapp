/**
 * userDataInit.sql - SQL script for initializing the UserData table.
 * This script drops the UserData table if it already exists and then creates a new UserData table.
 * The UserData table stores user-specific data such as first name, last name, address, city, state, zip code, and phone number.
 * It has an auto-incrementing primary key (id) and ensures that certain fields like first name, last name, and phone number are not nullable.
 */

DROP TABLE IF EXISTS UserData CASCADE; -- Drop UserData table if it already exists

CREATE TABLE UserData (
  id SERIAL PRIMARY KEY, -- Auto-incrementing primary key
  first_name TEXT NOT NULL, -- User's first name (required)
  last_name TEXT NOT NULL, -- User's last name (required)
  address TEXT, -- User's address
  city TEXT, -- User's city
  state VARCHAR(2), -- User's state (2-character abbreviation)
  zip VARCHAR(5), -- User's zip code
  phone TEXT NOT NULL -- User's phone number (required)
);
