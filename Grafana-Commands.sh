# GRAFANA CLI COMMANDS

# Start Grafana server
grafana-server web

# Upgrade Grafana to the latest version
grafana-cli admin upgrade

# Reset the admin password
grafana-cli admin reset-admin-password <new-password>

# Manage Grafana plugins
# Install a plugin
grafana-cli plugins install <plugin-id>

# Update a plugin
grafana-cli plugins update <plugin-id>

# Remove a plugin
grafana-cli plugins remove <plugin-id>

# List installed plugins
grafana-cli plugins ls

# Check the Grafana version
grafana-cli -v


# HTTP API Commands

# Get all dashboards
curl -H "Authorization: Bearer <api-key>" \
     http://<grafana-url>/api/dashboards/home

# Create a new dashboard
curl -X POST -H "Authorization: Bearer <api-key>" \
     -H "Content-Type: application/json" \
     -d '{ "dashboard": { "title": "New Dashboard", "panels": [] }, "overwrite": false }' \
     http://<grafana-url>/api/dashboards/db

# Update an existing dashboard
curl -X PUT -H "Authorization: Bearer <api-key>" \
     -H "Content-Type: application/json" \
     -d '{ "dashboard": { "title": "Updated Dashboard", "panels": [] }, "overwrite": true }' \
     http://<grafana-url>/api/dashboards/db

# Delete a dashboard
curl -X DELETE -H "Authorization: Bearer <api-key>" \
     http://<grafana-url>/api/dashboards/id/<dashboard-id>

# Get all data sources
curl -H "Authorization: Bearer <api-key>" \
     http://<grafana-url>/api/datasources

# Add a new data source
curl -X POST -H "Authorization: Bearer <api-key>" \
     -H "Content-Type: application/json" \
     -d '{ "name": "New Data Source", "type": "prometheus", "url": "http://<prometheus-url>" }' \
     http://<grafana-url>/api/datasources

# Update a data source
curl -X PUT -H "Authorization: Bearer <api-key>" \
     -H "Content-Type: application/json" \
     -d '{ "name": "Updated Data Source", "url": "http://<new-prometheus-url>" }' \
     http://<grafana-url>/api/datasources/<datasource-id>

# Delete a data source
curl -X DELETE -H "Authorization: Bearer <api-key>" \
     http://<grafana-url>/api/datasources/<datasource-id>