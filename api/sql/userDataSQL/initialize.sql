CREATE TABLE UserData (
  id SERIAL PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  address TEXT,
  city TEXT,
  state VARCHAR(2),
  zip VARCHAR(5),
  phone TEXT NOT NULL
);