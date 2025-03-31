@echo off

:: Get the IP address from the specified interface
for /f "tokens=2 delims=:" %%A in ('ipconfig ^| findstr /i "IPv4 Address"') do for /f "tokens=*" %%B in ("%%A") do set IPADDRESS=%%B
set IPADDRESS=%IPADDRESS:~1%

:: Config
set POSTGRES_DB_NAME=InventoryManagement
set POSTGRES_PORT=5432
set POSTGRES_USER=postgres
set POSTGRES_PASSWORD=user1234
set POSTGRES_DB_SEVER_NAME=dbserver1
set POSTGRES_DB_TOPIC_PREFIX=dbserver1

echo mfu-tidloop Using Host IPADDRESS: %IPADDRESS%

:: Now run docker-compose with the exported IPADDRESS variable
docker-compose up -d
:: --build

:: Note: To run this script, double-click it or execute it in the Command Prompt.