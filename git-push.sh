#!/bin/bash

echo "📦 Adding all changes..."
git add .

echo "📝 Committing changes..."
git commit -m "Added new functionalites."

echo "🚀 Pushing to main branch..."
git push origin main

echo "✅ Push complete!"

# chmod +x git-push.sh
# ./git-push.sh
