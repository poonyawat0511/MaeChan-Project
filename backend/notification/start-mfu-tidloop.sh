#!/bin/bash
# Get the IP address from the specified interface
export IPADDRESS=$(ipconfig getifaddr en0)
export DB_URL=jdbc:postgresql://host.docker.internal:5432/InventoryManagement
export DB_USER=postgres
export DB_PASSWORD=user1234

echo "mfu-tidloop Using Host IPADDRESS: $IPADDRESS"
# Now run docker-compose with the exported IPADDRESS variable
docker-compose up -d
# --build

# Make sure to give execute permissions to the script:
# chmod +x start-mfu-tidloop.sh