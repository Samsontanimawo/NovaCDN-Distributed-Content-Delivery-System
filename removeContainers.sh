#!/bin/bash

echo "🛑 Stopping all running containers..."
docker stop $(docker ps -q)

echo "🧹 Removing all containers..."
docker rm $(docker ps -aq)

echo "✅ All containers removed!"

# chmod +x removeContainers.sh
# ./removeContainers.sh
