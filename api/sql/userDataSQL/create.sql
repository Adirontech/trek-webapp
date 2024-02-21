/**
 * create.sql - SQL script for inserting user data into the UserData table.
 * This script inserts user data including first name, last name, address, city, state, zip code, and phone number
 * into the UserData table.
 * It uses placeholders ($1, $2, $3, $4, $5, $6, $7) for the values to be inserted.
 * The RETURNING clause is used to return the ID of the inserted record.
 */

INSERT INTO UserData (first_name, last_name, address, city, state, zip, phone)
VALUES (
    $1, -- Placeholder for First Name
    $2, -- Placeholder for Last Name
    $3, -- Placeholder for Address
    $4, -- Placeholder for City
    $5, -- Placeholder for State
    $6, -- Placeholder for Zip Code
    $7  -- Placeholder for Phone Number
)
RETURNING id; -- Return the ID of the inserted record
