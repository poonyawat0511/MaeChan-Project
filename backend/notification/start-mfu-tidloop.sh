#!/bin/bash
# Get the IP address from the specified interface
export IPADDRESS=$(ipconfig getifaddr en0)
echo "mfu-tidloop Using Host IPADDRESS: $IPADDRESS"
# Now run docker-compose with the exported IPADDRESS variable
docker-compose up -d
# --build

# Make sure to give execute permissions to the script:
# chmod +x start-mfu-tidloop.sh