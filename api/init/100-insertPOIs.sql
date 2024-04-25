/**
 * This SQL script inserts data into the 'WildernessAreas' and 'POIs' tables, populating them with initial values.
 *
 * The script includes the following operations:
 * 1. Inserts records into the 'WildernessAreas' table, providing IDs and names for wilderness areas.
 * 2. Inserts records into the 'POIs' table, providing IDs, names, types, and wilderness area IDs for points of interest.
 *
 * The data inserted into the 'WildernessAreas' table includes:
 * - ID: Unique identifier for each wilderness area.
 * - Name: Name of the wilderness area.
 *
 * The data inserted into the 'POIs' table includes:
 * - ID: Unique identifier for each point of interest.
 * - Name: Name of the point of interest.
 * - Type: Type of the point of interest (e.g., Trailhead, Peak, Scenic, Lodge, Leanto).
 * - Wilderness_area: ID of the wilderness area to which the point of interest belongs.
 *
 * Note: The 'WildernessAreas' and 'POIs' tables must be created and exist in the database before executing this script.
 *       Also, the IDs used in the INSERT statements should match the corresponding wilderness area IDs defined in the 'WildernessAreas' table.
 */
INSERT INTO WildernessAreas (id, name)
VALUES
    (1, 'High Peaks'),
    (2, 'AMR'),
    (3, 'Five Ponds');

/**
 * Inserts data into the 'POIs' table, populating it with initial points of interest.
 */
INSERT INTO POIs (id, name, type, wilderness_area)
VALUES 
    (1, 'Heart Lake', 'Trailhead', 1),
    (2, 'The Garden', 'Trailhead', 1),
    (3, 'Upper Works', 'Trailhead', 1),
    (4, 'Elk Lake', 'Trailhead', 1),
    (5, 'Coreys', 'Trailhead', 1),
    (6, 'Mt. Marcy', 'Peak', 1),
    (7, 'Haystack', 'Peak', 1),
    (8, 'Gray', 'Peak', 1),
    (9, 'Algonquin', 'Peak', 1),
    (10, 'Dix', 'Peak', 1),
    (11, 'Grace', 'Peak', 1),
    (12, 'South Dix', 'Peak', 1),
    (13, 'Hough', 'Peak', 1),
    (14, 'Macomb', 'Peak', 1),
    (15, 'Skylight', 'Peak', 1),
    (16, 'Allen', 'Peak', 1),
    (17, 'Redfield', 'Peak', 1),
    (18, 'Cliff', 'Peak', 1),
    (19, 'Santanoni', 'Peak', 1),
    (20, 'Panther', 'Peak', 1),
    (21, 'Couchsachraga', 'Peak', 1),
    (22, 'Seymour', 'Peak', 1),
    (23, 'Seward', 'Peak', 1),
    (24, 'Donaldson', 'Peak', 1),
    (25, 'Emmons', 'Peak', 1),
    (26, 'Sawteeth', 'Peak', 1),
    (27, 'Basin', 'Peak', 1),
    (28, 'Saddleback', 'Peak', 1),
    (29, 'Gothics', 'Peak', 1),
    (30, 'Armstrong', 'Peak', 1),
    (31, 'Upper Wolf Jaw', 'Peak', 1),
    (32, 'Lower Wolf Jaw', 'Peak', 1),
    (33, 'Big Slide', 'Peak', 1),
    (34, 'Phelps', 'Peak', 1),
    (35, 'TableTop', 'Peak', 1),
    (36, 'Nye', 'Peak', 1),
    (37, 'Street', 'Peak', 1),
    (38, 'Colden', 'Peak', 1),
    (39, 'Avalanche Lake', 'Scenic', 1),
    (40, 'Marcy Dam', 'Scenic', 1),
    (41, 'Indian Falls', 'Scenic', 1),
    (42, 'Johns Brook Lodge', 'Lodge', 1),
    (43, 'Nippletop', 'Peak', 2),
    (44, 'Dial', 'Peak', 2),
    (45, 'Colvin', 'Peak', 2),
    (46, 'Blake', 'Peak', 2),
    (47, 'Big Shallow Pond', 'Leanto', 3),
    (48, 'Little Shallow Pond', 'Leanto', 3),
    (49, 'High Falls', 'Trailhead', 3),
    (50, 'Dead Creek', 'Trailhead', 3),
    (51, 'Cat Mountain', 'Peak', 3);