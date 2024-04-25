/**
 * 02-userSessionsInit.sql - SQL script for initializing the UserSessions table.
 * This script drops the UserSessions table if it already exists and then creates a new UserSessions table.
 * The UserSessions table stores session information for users, including session keys, user IDs, and expiration dates.
 * It has an auto-incrementing primary key (id) and ensures that the session_key and user_id fields are not nullable.
 * The exp_date field represents the expiration date of the session and defaults to four hours from the current timestamp.
 * The user_id field is a foreign key referencing the id field in the Users table.
 */

DROP TABLE IF EXISTS UserSessions CASCADE; -- Drop UserSessions table if it already exists

CREATE TABLE UserSessions (
  id SERIAL PRIMARY KEY, -- Auto-incrementing primary key
  session_key VARCHAR(100) NOT NULL, -- Session key (required)
  user_id INT NOT NULL, -- User ID associated with the session (required)
  exp_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP + interval '4 hours', -- Expiration date for the session (default 4 hours from current timestamp)
  FOREIGN KEY (user_id) REFERENCES Users (id) -- Establishes a foreign key constraint referencing Users table
);
