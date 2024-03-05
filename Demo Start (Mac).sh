#!/bin/bash

# Change directory to demo_start_files
cd demo_start_files/

# Start Docker DB
chmod +x start_docker_db.command # If regular chmod doesn't work, add "sudo " in front of it & see if that fixes it.
open -a Terminal.app start_docker_db.command

# Start API
chmod +x start_api.command # If regular chmod doesn't work, add "sudo " in front of it & see if that fixes it.
open -a Terminal.app start_api.command

# Start Client
chmod +x start_client.command # If regular chmod doesn't work, add "sudo " in front of it & see if that fixes it.
open -a Terminal.app start_client.command