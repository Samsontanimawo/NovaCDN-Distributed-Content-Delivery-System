#!/bin/bash

echo "🧹 Removing all Docker images..."

docker rmi $(docker images -q) -f

echo "✅ All Docker images removed!"

# chmod +x removeImages.sh
# ./removeImages.sh
