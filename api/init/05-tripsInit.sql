/**
 * This SQL script initializes the database schema for managing trips, including trip details and participant information.
 * It defines the structure for storing information about trips, such as trip ID, confirmation code, trip creator, participant details, and trip logistics.
 *
 * The script includes the following operations:
 * 1. Drop the 'Trips' table if it already exists, along with any dependent objects.
 * 2. Create the 'Trips' table with columns for trip ID, confirmation code, creator ID, participant details, trip logistics, and foreign key constraints.
 *
 * The structure of the 'Trips' table is as follows:
 * - id: A serial column serving as the primary key for uniquely identifying each trip.
 * - confirm_code: A character column for storing a confirmation code consisting of 7 characters.
 * - creator: An integer column storing the ID of the user who created the trip.
 * - first_name: A variable character column for storing the first name of the trip creator.
 * - last_name: A variable character column for storing the last name of the trip creator.
 * - street: A variable character column for storing the street address of the trip creator.
 * - city: A variable character column for storing the city of the trip creator's address.
 * - state: A character column for storing the state abbreviation of the trip creator's address.
 * - zip_code: A character column for storing the zip code of the trip creator's address.
 * - date: A date column for storing the date of the trip.
 * - start: An integer column storing the ID of the starting Point of Interest (POI) for the trip.
 * - purpose: A text column for storing the purpose or description of the trip (optional).
 * - phone: A text column for storing the phone number of the trip creator (optional).
 * - duration: An integer column for storing the duration of the trip in hours.
 * - party_size: An integer column for storing the size of the party participating in the trip.
 * - checked_in: A boolean column indicating whether the participants have checked in, defaulting to FALSE.
 *
 * Note: The 'Users' and 'POIs' tables are referenced in the foreign key constraints but are not defined in this script.
 *       It is assumed that these tables exist, with 'Users' having a primary key column named 'id' and 'POIs' having a primary key column named 'id'.
 */
DROP TABLE IF EXISTS Trips CASCADE;

/**
 * A table for storing information about trips, including trip details and participant information.
 */
CREATE TABLE Trips (
    /**
     * An auto-incrementing serial column serving as the primary key for uniquely identifying each trip.
     */
    id SERIAL PRIMARY KEY,
    
    /**
     * A character column for storing a confirmation code consisting of 7 characters.
     */
    confirm_code CHAR(7) NOT NULL,
    
    /**
     * An integer column storing the ID of the user who created the trip.
     * This column cannot be null and references the 'id' column of the 'Users' table.
     */
    creator INT,
    
    /**
     * A variable character column for storing the first name of the trip creator.
     */
    first_name VARCHAR(50) NOT NULL,
    
    /**
     * A variable character column for storing the last name of the trip creator.
     */
    last_name VARCHAR(50) NOT NULL,
    
    /**
     * A variable character column for storing the street address of the trip creator.
     */
    street VARCHAR(100) NOT NULL,
    
    /**
     * A variable character column for storing the city of the trip creator's address.
     */
    city VARCHAR(50) NOT NULL,
    
    /**
     * A character column for storing the state abbreviation of the trip creator's address.
     */
    state CHAR(2) NOT NULL,
    
    /**
     * A character column for storing the zip code of the trip creator's address.
     */
    zip_code CHAR(5) NOT NULL,
    
    /**
     * A date column for storing the date of the trip.
     */
    date DATE NOT NULL,
    
    /**
     * An integer column storing the ID of the starting Point of Interest (POI) for the trip.
     * This column cannot be null and references the 'id' column of the 'POIs' table.
     */
    start INT NOT NULL,
    
    /**
     * A text column for storing the purpose or description of the trip (optional).
     */
    purpose TEXT,
    
    /**
     * A text column for storing the phone number of the trip creator (optional).
     */
    phone TEXT,
    
    /**
     * An integer column for storing the duration of the trip in hours.
     */
    duration INT NOT NULL,
    
    /**
     * An integer column for storing the size of the party participating in the trip.
     */
    party_size INT NOT NULL,
    
    /**
     * A boolean column indicating whether the participants have checked in, defaulting to FALSE.
     */
    checked_in BOOLEAN DEFAULT FALSE,
    
    /**
     * A foreign key constraint referencing the 'id' column of the 'Users' table.
     */
    FOREIGN KEY (creator) REFERENCES Users(id),
    
    /**
     * A foreign key constraint referencing the 'id' column of the 'POIs' table.
     */
    FOREIGN KEY (start) REFERENCES POIs(id)
);
