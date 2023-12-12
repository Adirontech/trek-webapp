# Adirontech T.R.E.K. Project

The T.R.E.K., Trail Registration Electronic Kiosk, project consists of a react web-app, a kiosk system, and a postgreSQL database for the two. The web-app allows users to pre-register and plan their intended trips to the Adirondack Mountain trails. Trail managers from the Adirondack Wilderness Advocates organization will be able to use the web-app to view aggregate past and current trail usage information. 

## Web-app

The web-app allows users to pre-register and plan their intended trips to the Adirondack Mountain trails. Hikers will be able to view the trail districts as well as relevant information about the district and trails they plan on visiting.

Trail managers from the Adirondack Wilderness Advocates organization will be able to use the web-app to view aggregate past and current trail usage information. This will allow them to make accurate decisions when delegating resources to protecting the Adirondack Wilderness.


## Kiosk System

The kiosk system will consist of two different main functions. One will be connected to the internet while the other will be completely remote.

Kiosks connected to the internet will be located at the top of the trailheads. Trailhead kiosks will allow users to check in to their pre-registered trips as well as to register on the spot if they had not done so prior. This data will be sent to the database where trial managers can access.

Remote kiosks will be scattered amongst the trails at junctions and popular areas. These will be equipped with Bluetooth pinging that will count passing by foot traffic of hikers whose Bluetooth is turned on. This data will be downloaded manually from trail managers and then uploaded to the database.

## Docker Database Setup

First, create a .env file in the root directory of your repository and add a line `DB_PASSWORD=<your_password_here>`, replacing `<your_password_here>` with your desired database password. Then, run the docker container by navigating to the directory in your terminal and executing `docker-compose up`. To connect to the running PostgreSQL container via pgAdmin4, create a new server and under the Connection tab set the Host name/address to `host.docker.internal`, Port to `5432`, Maintenance database to `postgres`, Username to `adirontech`, and Password to the one you specified in the .env file.

## Running the Project

Once the database docker container is running as shown above, the web client and API client must also be run in separate terminal processes. In a new terminal, navigate to the `client` directory and run `npm start`, and do the same in a separate terminal process in the `api` directory. The API process will default to running on port 5000, while the client process will default to port 3000.

## Configuring the Project

You will need to create a config file located in a newly created directory, located at `/config/config.js`, formatted as shown below. The values must be set to match the values in the `docker-compose.yml` for creating the Postgres database.

```
module.exports = {
    databaseURL: "postgres://<username>:<password>@localhost:<port>/<database name>"
};
```