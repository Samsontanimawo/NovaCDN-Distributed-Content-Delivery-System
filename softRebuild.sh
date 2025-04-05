#!/bin/bash

echo "🔁 Rebuilding all services without cache..."
docker-compose build --no-cache

echo "🚀 Bringing up all containers..."
docker-compose up -d

echo "✅ Rebuild complete!"


# chmod +x softRebuild.sh
# ./softRebuild.sh
