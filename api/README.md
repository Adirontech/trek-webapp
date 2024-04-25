# API Master Documentation Sheet

## API Architecture

Below is an explanation of the overall directories in this directory, and what each of them do:

### "config" Directory

Contains a single file, "config.js" which uses the path & dotenv modules to generate an database url using sensitive information provided by the project's root -.env file. The endpoints within the other directories will use this exported url to access the database.

### "init" Directory

Contains 10 SQL files, which are used on project initialization to fill a newly-created database with important project information, such as Adirondack Wildernes Points of Interest (POIs). Each of the files does as follows:

#### 00-userDataInit.sql

  SQL script for initializing the UserData table.

- This script drops the UserData table if it already exists and then creates a new UserData table.
- The UserData table stores user-specific data such as first name, last name, address, city, state, zip code, and phone number.
- It has an auto-incrementing primary key (id) and ensures that certain fields like first name, last name, and phone number are not nullable.

#### 01-usersInit.sql

  SQL script for initializing the Users table.

- This script drops the Users table if it already exists and then creates a new Users table.
- The Users table stores user credentials, including username and password, along with a reference to the corresponding UserData entry.
- It has an auto-incrementing primary key (id) and ensures that both username and password fields are not nullable.
- The data_id field is a foreign key referencing the id field in the UserData table.

#### 02-userSessionInit.sql

  SQL script for initializing the UserSessions table.
  
- This script drops the UserSessions table if it already exists and then creates a new UserSessions table.
- The UserSessions table stores session information for users, including session keys, user IDs, and expiration dates.
- It has an auto-incrementing primary key (id) and ensures that the session_key and user_id fields are not nullable.
- The exp_date field represents the expiration date of the session and defaults to four hours from the current timestamp.
- The user_id field is a foreign key referencing the id field in the Users table.

#### 03-wildernessAreasInit.sql

SQL script for initializing the WildernessAreas table.

- This script drops the WildernessAreas table if it already exists and then creates a new one.
- The table has two columns: id (serial primary key) and name (text).

#### 04-poisInit.sql

  SQL script for initializing the database schema for managing Points of Interest (POIs) in a wilderness area.

- It defines the structure for storing information about various types of POIs and their association with wilderness areas.

- The script includes the following operations:
  1. Drop the 'POIs' table if it already exists, along with any dependent objects.
  2. Define an enumerated (enum) data type called 'poi_type_enum', which represents different types of POIs.
  3. Create the 'POIs' table with columns for ID, name, type, and wilderness area ID, along with foreign key constraints.

- The structure of the 'POIs' table is as follows:
  - id: A serial column serving as the primary key for uniquely identifying each POI.
  - name: A text column for storing the name of the POI.
  - type: A column of type 'poi_type_enum', representing the type of the POI (e.g., Trailhead, Peak, etc.).
  - wilderness_area: An integer column storing the ID of the wilderness area to which the POI belongs.
    This column cannot be null and has a foreign key constraint referencing the 'id' column of the 'WildernessAreas' table.

- Note: The 'WildernessAreas' table is referenced in the foreign key constraint but is not defined in this script.
  
- It is assumed that the 'WildernessAreas' table exists and has a primary key column named 'id'.

#### 05-tripsInit.sql

  SQL script for initializing the database schema for managing trips, including trip details and participant information.

- It defines the structure for storing information about trips, such as trip ID, confirmation code, trip creator, participant details, and trip logistics.

- The script includes the following operations:
   1. Drop the 'Trips' table if it already exists, along with any dependent objects.
   2. Create the 'Trips' table with columns for trip ID, confirmation code, creator ID, participant details, trip logistics, and foreign key constraints.

- The structure of the 'Trips' table is as follows:
  - id: A serial column serving as the primary key for uniquely identifying each trip.
  - confirm_code: A character column for storing a confirmation code consisting of 7 characters.
  - creator: An integer column storing the ID of the user who created the trip.
  - first_name: A variable character column for storing the first name of the trip creator.
  - last_name: A variable character column for storing the last name of the trip creator.
  - street: A variable character column for storing the street address of the trip creator.
  - city: A variable character column for storing the city of the trip creator's address.
  - state: A character column for storing the state abbreviation of the trip creator's address.
  - zip_code: A character column for storing the zip code of the trip creator's address.
  - date: A date column for storing the date of the trip.
  - start: An integer column storing the ID of the starting Point of Interest (POI) for the trip.
  - purpose: A text column for storing the purpose or description of the trip (optional).
  - phone: A text column for storing the phone number of the trip creator (optional).
  - duration: An integer column for storing the duration of the trip in hours.
  - party_size: An integer column for storing the size of the party participating in the trip.
  - checked_in: A boolean column indicating whether the participants have checked in, defaulting to FALSE.

- Note: The 'Users' and 'POIs' tables are referenced in the foreign key constraints but are not defined in this script.
- It is assumed that these tables exist, with 'Users' having a primary key column named 'id' and 'POIs' having a primary key column named 'id'.

#### 06-tripDestinationsInit.sql

  SQL script for initializing the TripDestinations table.

- This script drops the TripDestinations table if it already exists and then creates a new TripDestinations table.
- The TripDestinations table associates trip IDs with destination IDs, defining foreign key constraints to the Trips and POIs tables.

#### 07-rangesrInit.sql

 SQL script for initializing the Rangers table.

- This script drops the Rangers table if it already exists and then creates a new Rangers table.
- The Rangers table stores ranger IDs, serving as a subset of users, with a foreign key constraint to the Users table.

#### 100-insertPOIs.sql

#### 100-insertTestData.sql

  SQL script for inserting data into the 'WildernessAreas' and 'POIs' tables, populating them with initial values.

- The script includes the following operations:
   1. Inserts records into the 'WildernessAreas' table, providing IDs and names for wilderness areas.
   2. Inserts records into the 'POIs' table, providing IDs, names, types, and wilderness area IDs for points of interest.

- The data inserted into the 'WildernessAreas' table includes:
  - ID: Unique identifier for each wilderness area.
  - Name: Name of the wilderness area.

- The data inserted into the 'POIs' table includes:
  - ID: Unique identifier for each point of interest.
  - Name: Name of the point of interest.
  - Type: Type of the point of interest (e.g., Trailhead, Peak, Scenic, Lodge, Leanto).
  - Wilderness_area: ID of the wilderness area to which the point of interest belongs.

- Note: The 'WildernessAreas' and 'POIs' tables must be created and exist in the database before executing this script.
- Also, the IDs used in the INSERT statements should match the corresponding wilderness area IDs defined in the 'WildernessAreas' table.

### "models" Directory

#### poiModel.js

#### rangerModel.js

#### trailModel.js

#### tripsModel.js

#### userModel.js

### "node_modules" Directory

This directory contains all of the necessary prerequisite Node modules that the API component of this project needs to function.

### "routes" Directory

#### "poiRouter.js"

#### "trailRouter.js"

#### "tripsRouter.js"

#### "userRouter.js"

### "sql" Directory

#### "poiSQL" Directory

##### "dailyUsage.sql"

##### "getAll.sql"

##### "getTrailheads.sql"

##### "groupUsage.sql"

##### "groupUsageOverTime.sql"

#### "rangerSQL" Directory

##### "create.sql"

#### "tripsSQL" Directory

##### "create.sql"

##### "edit.sql"

##### "getAll.sql"

##### "getFromKey.sql"

##### "getInfoFromKey.sql"

#### "userDataSQL" Directory

##### "create.sql"

##### "get.sql"

##### "set.sql"

#### "userSQL" Directory

##### "create.sql"

##### "setPassword.sql"

##### "signIn.sql"

### "db.js"

### "package-lock.json"

### "package.json"

### "server.js"

Start server by running 'npm start'
