#!/bin/bash

echo "Shutting down existing containers..."
docker-compose down

echo "Rebuilding and starting containers..."
docker-compose up -d --build

echo "✅ NovaCDN stack deployed successfully!"
