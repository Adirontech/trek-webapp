# Adirontech T.R.E.K. Project

The T.R.E.K., Trail Registration Electronic Kiosk, project consists of a react web-app, a kiosk system, and a postgreSQL database for the two. The web-app allows users to pre-register and plan their intended trips to the Adirondack Mountain trails. Trail managers from the Adirondack Wilderness Advocates organization will be able to use the web-app to view aggregate past and current trail usage information. 

## Table of Contents

- [Adirontech T.R.E.K. Project](#adirontech-trek-project)
  - [Table of Contents](#table-of-contents)
  - [About](#about)
    - [Web Application](#web-application)
    - [Kiosk System](#kiosk-system)
  - [Project Setup](#project-setup)
    - [For Developers](#for-developers)
      - [Step 1) Project Prerequisites](#step-1-project-prerequisites)
      - [Step 2) Clone \& Configure Project](#step-2-clone--configure-project)
        - [Environment Variables Setup](#environment-variables-setup)
        - [Configuring the Project](#configuring-the-project)
      - [Step 3) Setup Docker Database](#step-3-setup-docker-database)
      - [Step 4) Setup Web \& API Clients](#step-4-setup-web--api-clients)
        - [Setup Web Client](#setup-web-client)
        - [Setup API Client](#setup-api-client)

## About

### Web Application

The web-app allows users to pre-register and plan their intended trips to the Adirondack Mountain trails. Hikers will be able to view the trail districts as well as relevant information about the district and trails they plan on visiting.

Trail managers from the Adirondack Wilderness Advocates organization will be able to use the web-app to view aggregate past and current trail usage information. This will allow them to make accurate decisions when delegating resources to protecting the Adirondack Wilderness.

### Kiosk System

The kiosk system will consist of two different main functions. One will be connected to the internet while the other will be completely remote.

Kiosks connected to the internet will be located at the top of the trailheads. Trailhead kiosks will allow users to check in to their pre-registered trips as well as to register on the spot if they had not done so prior. This data will be sent to the database where trial managers can access.

Remote kiosks will be scattered amongst the trails at junctions and popular areas. These will be equipped with Bluetooth pinging that will count passing by foot traffic of hikers whose Bluetooth is turned on. This data will be downloaded manually from trail managers and then uploaded to the database.

## Project Setup

### For Developers

Follow the instructions below to set up the project on your local machine

#### Step 1) Project Prerequisites

Ensure the following is installed on your machine:

- Git
  - For instructions for all platforms (Windows, Linux, Mac, & from Source), use this link:
    - https://github.com/git-guides/install-git
  - If for some reason these instructions don't work, this link's instructions should also work:
    - https://git-scm.com/book/en/v2/Getting-Started-Installing-Git
- Node.js
  - <https://nodejs.org/en/download/current>
- Docker + Docker Desktop
  - <https://www.docker.com/get-started/>
- An IDE (code editor) of your choice (VScode is a good recommendation)

Once Docker Desktop is installed, launch it. On the left hand side, navigate to "Extensions", and once you find the Extensions Marketplace, search for `Open Source management tool for PostgreSQL`. Your window should look something like this:
![Extensions_Marketplace_Setup_Image_01](./images/Extensions_Marketplace_Setup_Image_01.png)
Install this extension; once it is installed, "PGAdmin4" should be a selectable extension on the left-hand side of your Docker Desktop application.

#### Step 2) Clone & Configure Project

On your machine, create a folder directory for the project to be stored in. Copy the path to that directory.

Open a terminal and navigate to the path you copied. Once you have navigated there, run `git clone https://github.com/Adirontech/trek-webapp.git`. The project should be pulled from GitHub to your directory, stored in a single directory called `trek-webapp`.

Once cloned, navigate into the `trek-webapp` directory, and complete the following steps:

##### Environment Variables Setup

In the root of the project, create an `.env` file in the root directory of your repository and add a line `DB_PASSWORD=<your_password_here>`. This will determine the password you use to access the Docker-hosted Database using pgAdmin 4 later in the setup. Make sure you replace `<your_password_here>` with your desired database password.

##### Configuring the Project

The TREK web application contains two config directories in the following locations:

- `api/config/`
- `client/src/config/`

Each of these directories contains a template file named `config.template.js`. In both config directories, create a new file called `config.js` that contains everything in this template file. The values in the template must be changed to match the values found in the `docker-compose.yml` for creating the Postgres database.

Remember that the template config files different / unique to each directory! Your config files will not look the same once you fill them out.

#### Step 3) Setup Docker Database

With your project is fully-configured, it is time to set up your Docker PostgreSQL Database. First, start a new terminal. In that terminal, navigate to the project directory (`trek-webapp`) in execute the command `docker-compose up`. Once you see a message with the LOG statement "database system is ready to acdept connections" in the terminal, your Database is now running.

To connect to the running PostgreSQL container via pgAdmin4, open the PGAdmin4 extension in your docker desktop. Click "Add New Server", and a smaller window will appear. Use it to set the following:

- Under the "General" Tab:
  - Set "Name" to anything you want. This is simply a name for your server for your own reference within Docker Desktop.
- Under the "Connection" Tab:
  - Set "Host name/address" to `host.docker.internal`
  - Set "Port" to `5432`
  - Set "Maintenance database" to `postgres`
  - Set "Username" to `adirontech`
  - Set "Password" to the one you specified in the .env file in Step 1)

Once this is all set, the window should look like this:
![Server_Register_Reference_Image_01](./images/Server_Register_01.png)

Click "Save" in the bottom-right corner of the window. Assuming everything has been set up correctly, no errors should appear, and you are connected to the database!

#### Step 4) Setup Web & API Clients

Once the database docker container is running as shown above, the web client and API client must also be run in separate terminal processes:

##### Setup Web Client

In a new terminal, navigate to the `client` directory and run `npm start`. The web client will start running.

##### Setup API Client

In a new terminal (this will be the third), navigate to the `api` directory and run `npm start`. The API process will default to running on port 5000, while the client process will default to port 3000.