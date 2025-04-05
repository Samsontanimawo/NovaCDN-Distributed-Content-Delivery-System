#!/bin/bash

echo "Navigating to novacdn-frontend directory..."
cd novacdn-frontend/ || { echo "❌ Directory not found!"; exit 1; }

echo "Building the React frontend..."
npm run build

echo "Installing 'serve' globally if not already installed..."
npm install -g serve

echo "Serving the build with 'serve -s build -l 3000'..."
serve -s build -l 3000


# chmod +x serve-frontend.sh
# ./serve-frontend.sh
# npm install -g serve
