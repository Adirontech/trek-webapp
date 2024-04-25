/**
 * This SQL script initializes the database schema for managing Points of Interest (POIs) in a wilderness area.
 * It defines the structure for storing information about various types of POIs and their association with wilderness areas.
 *
 * The script includes the following operations:
 * 1. Drop the 'POIs' table if it already exists, along with any dependent objects.
 * 2. Define an enumerated (enum) data type called 'poi_type_enum', which represents different types of POIs.
 * 3. Create the 'POIs' table with columns for ID, name, type, and wilderness area ID, along with foreign key constraints.
 *
 * The structure of the 'POIs' table is as follows:
 * - id: A serial column serving as the primary key for uniquely identifying each POI.
 * - name: A text column for storing the name of the POI.
 * - type: A column of type 'poi_type_enum', representing the type of the POI (e.g., Trailhead, Peak, etc.).
 * - wilderness_area: An integer column storing the ID of the wilderness area to which the POI belongs.
 *   This column cannot be null and has a foreign key constraint referencing the 'id' column of the 'WildernessAreas' table.
 *
 * Note: The 'WildernessAreas' table is referenced in the foreign key constraint but is not defined in this script.
 *       It is assumed that the 'WildernessAreas' table exists and has a primary key column named 'id'.
 */
DROP TABLE IF EXISTS POIs CASCADE;

/**
 * An enumerated (enum) data type representing different types of Points of Interest (POIs).
 * Possible values include: Trailhead, Peak, Scenic, Lodge, Leanto.
 */
CREATE TYPE poi_type_enum AS ENUM ('Trailhead', 'Peak', 'Scenic', 'Lodge', 'Leanto');

/**
 * A table for storing information about Points of Interest (POIs) in a wilderness area.
 */
CREATE TABLE POIs (
    /**
     * An auto-incrementing serial column serving as the primary key for uniquely identifying each POI.
     */
    id SERIAL PRIMARY KEY,
    
    /**
     * A text column for storing the name of the POI.
     */
    name TEXT,
    
    /**
     * A column representing the type of the POI, defined by the 'poi_type_enum' data type.
     */
    type poi_type_enum,
    
    /**
     * An integer column storing the ID of the wilderness area to which the POI belongs.
     * This column cannot be null and references the 'id' column of the 'WildernessAreas' table.
     */
    wilderness_area INT NOT NULL,
    
    /**
     * A foreign key constraint referencing the 'id' column of the 'WildernessAreas' table.
     */
    FOREIGN KEY (wilderness_area) REFERENCES WildernessAreas(id)
);
