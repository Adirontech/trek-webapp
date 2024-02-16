#!/bin/bash

# Change directory to demo_start_files
cd demo_start_files/

# Start Docker DB
open -a Terminal.app start_docker_db.command

# Start API
open -a Terminal.app start_api.command

# Start Client
open -a Terminal.app start_client.command