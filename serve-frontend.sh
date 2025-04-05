#!/bin/bash

echo "Navigating to novacdn-frontend directory..."
cd novacdn-frontend/ || { echo "❌ Directory not found!"; exit 1; }

echo "Building the React frontend..."
npm run build

echo "Serving the build with 'serve -s build'..."
serve -s build

# chmod +x serve-frontend.sh
# ./serve-frontend.sh
# npm install -g serve
