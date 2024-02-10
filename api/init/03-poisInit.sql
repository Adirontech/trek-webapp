DROP TABLE IF EXISTS POIs CASCADE;

CREATE TYPE poi_type_enum AS ENUM ('Trailhead', 'Peak', 'Scenic', 'Lodge', 'Leanto');

CREATE TABLE POIs (
    id SERIAL PRIMARY KEY,
    name TEXT,
    type poi_type_enum,
    wilderness_area TEXT
);