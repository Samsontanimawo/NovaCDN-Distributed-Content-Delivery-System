1. ./removeImages.sh
2. ./removeContainers.sh
3. ./softRebuild.sh
4. ./hardRebuild.sh
5. ./git-push.sh
6. ./serve-frontend.sh

find . -type f -name "*.sh" -exec chmod +x "{}" \; = Find and make all .sh files executable

Migrated Nova CDN project to AWS. Project live on http://13.217.223.190:8081