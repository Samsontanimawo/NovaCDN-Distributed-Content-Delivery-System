// https://prometheus.io/download/ = Download prometheus

# Start Prometheus with a configuration file
./prometheus --config.file=prometheus.yml

# Start Prometheus with custom storage path
./prometheus --config.file=prometheus.yml --storage.tsdb.path=/path/to/storage

# Stop Prometheus (if running manually)
# Use Ctrl+C to stop it or find the PID and kill it
kill -SIGINT <PID>

# Check Prometheus Status (if using systemd)
systemctl status prometheus

# Enable Prometheus to Start on Boot
sudo systemctl enable prometheus

# Start Prometheus as a Service
sudo systemctl start prometheus

# Stop Prometheus as a Service
sudo systemctl stop prometheus

# Restart Prometheus as a Service
sudo systemctl restart prometheus

# Reload Prometheus Configuration
sudo systemctl reload prometheus

# View Prometheus Logs
journalctl -u prometheus

# Access the Prometheus Web UI
# Open a web browser and go to:
http://<your-server-ip>:9090

# Export Metrics
# To export metrics to a specified endpoint
curl http://<your-server-ip>:9090/api/v1/query?query=<metric_name>

# Check Health Status
curl http://<your-server-ip>:9090/-/health

# Check Readiness Status
curl http://<your-server-ip>:9090/-/ready

# Dump Configuration
curl http://<your-server-ip>:9090/api/v1/status/config

# Check Current Targets
curl http://<your-server-ip>:9090/api/v1/targets

# Get metrics for a specific time range
curl http://<your-server-ip>:9090/api/v1/query_range?query=<metric_name>&start=<start_timestamp>&end=<end_timestamp>&step=<step>

# Get metadata about a metric
curl http://<your-server-ip>:9090/api/v1/metadata?metric=<metric_name>

# Retrieve alerts
curl http://<your-server-ip>:9090/api/v1/alerts

# Check the status of all rules
curl http://<your-server-ip>:9090/api/v1/rules

# Get the Prometheus version
curl http://<your-server-ip>:9090/api/v1/status/buildinfo

# View Prometheus runtime information
curl http://<your-server-ip>:9090/api/v1/status/runtimeinfo

# Retrieve the current configuration of alerting rules
curl http://<your-server-ip>:9090/api/v1/rules

# Retrieve the current scrape configurations
curl http://<your-server-ip>:9090/api/v1/status/config

# Clean up old data in the TSDB
./prometheus tsdb delete-series --match=<metric_name>

# Query for the last scrape timestamp
curl http://<your-server-ip>:9090/api/v1/scrape

# View the active alerts in the alert manager
curl http://<your-server-ip>:9093/api/v1/alerts

