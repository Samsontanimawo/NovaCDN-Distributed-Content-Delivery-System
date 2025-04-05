#!/bin/bash

STACK_NAME=novacdn

echo "🧹 Removing existing stack: $STACK_NAME ..."
docker stack rm $STACK_NAME

echo "⏳ Waiting for Docker to clean up networks..."
sleep 10

echo "🔍 Checking leftover networks..."
docker network ls | grep $STACK_NAME

echo "🚀 Redeploying stack: $STACK_NAME ..."
docker stack deploy -c docker-compose.yml $STACK_NAME

echo "✅ Done! Run 'docker service ls' to check status."
