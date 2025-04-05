#!/bin/bash

echo "🚀 Building backend image..."
docker build -t novacdn-backend ./backend

echo "🚀 Building frontend image..."
docker build -t novacdn-frontend ./novacdn-frontend

# Loop through node1 to node10
for i in {1..10}; do
  echo "🚀 Building edge node $i image..."
  docker build -t novacdn-node$i ./novacdn-nodes/node$i
done

echo "✅ All images built successfully!"
