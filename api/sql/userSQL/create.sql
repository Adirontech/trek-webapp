/**
 * create.sql - SQL script for inserting user data into the Users table.
 * This script inserts user data including username, password, and associated UserData ID
 * into the Users table.
 * It uses placeholders ($1, $2, $3) for the values to be inserted.
 * The RETURNING clause is used to return the ID of the inserted record.
 */

INSERT INTO Users (username, password, data_id)
VALUES (
    $1, -- Placeholder for Username
    $2, -- Placeholder for Password
    $3  -- Placeholder for UserData ID
)
RETURNING id; -- Return the ID of the inserted record
