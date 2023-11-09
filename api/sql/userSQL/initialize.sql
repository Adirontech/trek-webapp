DROP TABLE IF EXISTS Users CASCADE;

CREATE TABLE Users (
  id SERIAL PRIMARY KEY,
  username TEXT,
  password TEXT,
  data_id INT,
  FOREIGN KEY (data_id) REFERENCES UserData (id)
);