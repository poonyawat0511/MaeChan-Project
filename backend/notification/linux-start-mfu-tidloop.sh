#!/bin/bash

# Get the IP address from the specified interface
export IPADDRESS=$(ipconfig getifaddr en0)

# config
export POSTGRES_DB_NAME=InventoryManagement
export POSTGRES_PORT=5432
export POSTGRES_USER=postgres
export POSTGRES_PASSWORD=user1234
export POSTGRES_DB_SEVER_NAME=dbserver1
export POSTGRES_DB_TOPIC_PREFIX=dbserver1

echo "mfu-tidloop Using Host IPADDRESS: $IPADDRESS"
# Now run docker-compose with the exported IPADDRESS variable

# pull and start the containers
docker-compose up -d


# Make sure to give execute permissions to the script:
# chmod +x linux-start-mfu-tidloop.sh