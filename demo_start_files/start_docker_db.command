#!/bin/bash

# Get the path of the current executable file
parent_path=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )

# Change directory to where the current executable file is
cd "$parent_path"

# Change directory to the parent directory
cd ..

# Tear Down Old Docker Container & cached data (if applicable)
docker-compose down -v

# Rebuild docker container with no cache
docker-compose build --no-cache

# Start docker-compose
docker-compose up
