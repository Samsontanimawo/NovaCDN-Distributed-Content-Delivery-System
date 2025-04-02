# NovaCDN - Content Delivery Network (CDN) with Docker, Nginx, Node.js, and Redis

NovaCDN is a demonstration project designed to showcase a Content Delivery Network (CDN) built with modern technologies such as Docker, Nginx, Node.js, and Redis. It simulates edge nodes for caching and load balancing, and demonstrates how to deploy a scalable system to deliver content efficiently across multiple nodes.

## Project Structure

- **backend/**: Node.js backend API responsible for serving content.
- **novacdn-frontend/**: React-based frontend application for user interaction.
- **nginx/**: Nginx configuration files for reverse proxy and load balancing.
- **novacdn-nodes/**: Simulated CDN edge servers for content caching.
- **docker-compose.yml**: Docker Compose configuration for setting up the multi-container environment.
- **docker-stack.yml**: Docker Swarm stack file for managing the services in Swarm mode.
- **README.md**: This documentation file.

## Features

- **Scalable Backend**: The backend is scaled to 10 instances using Docker Swarm to handle large amounts of traffic efficiently.
- **Edge Nodes for Caching**: Simulated CDN edge nodes are used to cache and serve content closer to the end users.
- **Load Balancing**: Nginx handles load balancing between the backend and frontend services, ensuring high availability and fault tolerance.
- **Redis Caching**: Redis is used to cache the backend data, reducing latency and improving response times.
# NovaCDN-Distributed-Content-Delivery-System
