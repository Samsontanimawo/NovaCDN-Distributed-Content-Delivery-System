#!/bin/bash

STACK_NAME=novacdn

echo "🔧 Updating nginx.conf for all edge nodes..."

for i in {1..10}; do
  NODE_CONF="./novacdn-nodes/node$i/nginx.conf"

  if [[ -f "$NODE_CONF" ]]; then
    echo "📝 Patching node$i..."

    # Backup original config
    cp "$NODE_CONF" "$NODE_CONF.bak"

    # Overwrite with fixed config
    cat > "$NODE_CONF" <<EOF
events {
    worker_connections 1024;
}

http {
    proxy_cache_path /var/cache/nginx levels=1:2 keys_zone=my_cache:10m inactive=60m use_temp_path=off;

    server {
        listen 80;

        location / {
            proxy_pass http://backend:3000;

            proxy_cache my_cache;
            proxy_cache_valid 200 302 10m;
            proxy_cache_valid 404 1m;

            add_header X-Cache-Status \$upstream_cache_status;
            add_header X-Cache-Zone my_cache;
        }
    }
}
EOF

  else
    echo "❌ nginx.conf not found for node$i"
  fi
done

echo "🔁 Rebuilding edge node images..."
for i in {1..10}; do
  docker build -t novacdn-node$i ./novacdn-nodes/node$i
done

echo "🧹 Removing existing stack: $STACK_NAME ..."
docker stack rm $STACK_NAME

echo "⏳ Waiting for Docker Swarm to fully remove networks..."
while docker network ls | grep -q "$STACK_NAME"; do
  echo "🕒 Still cleaning up networks... waiting 3s"
  sleep 3
done

echo "🚀 Redeploying stack: $STACK_NAME ..."
docker stack deploy -c docker-compose.yml $STACK_NAME

echo "✅ Done! Use 'docker service ls' to check status."
