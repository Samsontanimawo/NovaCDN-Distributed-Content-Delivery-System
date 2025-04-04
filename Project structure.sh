NOVACDN/
├── backend/
│   ├── Dockerfile                 # Dockerfile for the backend service
│   ├── package-lock.json          # Lockfile for backend dependencies
│   └── server.js                  # Main Node.js server script
├── kubernetes/                    # Kubernetes configurations for deploying services
│   ├── backend-deployment.yml     # Deployment config for backend
│   ├── backend-service.yml        # Service config for backend
│   ├── edge-node-deployment.yml   # Deployment for simulated CDN edge nodes
│   ├── frontend-deployment.yml    # Deployment config for frontend
│   ├── frontend-service.yml       # Service config for frontend
│   ├── nginx-config.yml           # Nginx configuration file
│   ├── nginx-deployment.yml       # Deployment config for Nginx
│   ├── nginx-service.yml          # Service config for Nginx
│   ├── redis-deployment.yml       # Redis deployment configuration
│   ├── redis-service.yml          # Redis service configuration
├── novacdn-frontend/              # Frontend application files
│   ├── Dockerfile                 # Dockerfile for frontend
│   ├── public/                    # Public assets (images, icons, etc.) - Transferred to AWS.
│   ├── src/                       # React source code
│   ├── package.json               # Frontend dependencies and configurations
│   └── README.md                  # Documentation for frontend setup
├── docker-compose.yml             # Docker Compose configuration for local setup
└── README.md                      # Documentation for the entire project
