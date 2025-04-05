#!/bin/bash

echo "🛑 Stopping and removing all containers, volumes, and orphans..."
docker-compose down -v --remove-orphans

echo "🔥 Removing all Docker images..."
docker rmi $(docker images -q) -f

echo "🧹 Cleaning Docker build cache..."
docker builder prune -a --force

echo "🔁 Rebuilding all services without cache..."
docker-compose build --no-cache

echo "🚀 Bringing up all containers..."
docker-compose up -d

echo "✅ Rebuild complete!"


# chmod +x hardRebuild.sh
# ./hardRebuild.sh
