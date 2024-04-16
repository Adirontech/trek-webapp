# API Master Documentation Sheet

## API Architecture

Below is an explanation of the overall directories in this directory, and what each of them do:

### "config" Directory

Contains a single file, "config.js" which uses the path & dotenv modules to generate an database url using sensitive information provided by the project's root -.env file. The endpoints within the other directories will use this exported url to access the database.

### "init" Directory

Contains 10 SQL files, which are used on project initialization to fill a newly-created database with important project information, such as Adirondack Wildernes Points of Interest (POIs). Each of the files does as follows:

#### 00-userDataInit.sql

#### 01-usersInit.sql

#### 02-userSessionInit.sql

#### 03-wildernessAreasInit.sql

#### 04-poisInit.sql

#### 05-tripsInit.sql

#### 06-tripDestinationsInit.sql

#### 07-rangesrInit.sql

#### 100-insertPOIs.sql

#### 100-insertTestData.sql

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