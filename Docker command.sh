#docker ps --filter "name=novacdn_frontend" --format "{{.Names}}" --- To see the list of running frontend containers by name.

Output: 

dannyrosky@Samson:/mnt/c/Users/Administrator/Desktop/NovaCDN$ docker ps --filter "name=novacdn_frontend" --format "{{.Names}}"
novacdn_frontend_8
novacdn_frontend_1
novacdn_frontend_3
novacdn_frontend_4
novacdn_frontend_6
novacdn_frontend_7
novacdn_frontend_10
novacdn_frontend_9
novacdn_frontend_2
novacdn_frontend_5

# docker ps --filter "name=novacdn_backend" --format "{{.Names}}" - List backend containers

dannyrosky@Samson:/mnt/c/Users/Administrator/Desktop/NovaCDN$ docker ps --filter "name=novacdn_backend" --format "{{.Names}}"
novacdn_backend_9
novacdn_backend_4
novacdn_backend_5
novacdn_backend_7
novacdn_backend_1
novacdn_backend_6
novacdn_backend_3
novacdn_backend_2
novacdn_backend_8
novacdn_backend_10

# Confirm only one of each is running 

dannyrosky@Samson:/mnt/c/Users/Administrator/Desktop/NovaCDN$ docker ps
CONTAINER ID   IMAGE              COMMAND                  CREATED          STATUS          PORTS                                     NAMES
6c326a1f9c23   nginx:latest       "/docker-entrypoint.…"   10 minutes ago   Up 10 minutes   0.0.0.0:8080->80/tcp, [::]:8080->80/tcp   nginx
45cf7184c1ec   novacdn_frontend   "/docker-entrypoint.…"   11 minutes ago   Up 10 minutes   80/tcp                                    novacdn_frontend_8
fdde592fb559   novacdn_frontend   "/docker-entrypoint.…"   11 minutes ago   Up 10 minutes   80/tcp                                    novacdn_frontend_1
ad7c2d7612fd   novacdn_frontend   "/docker-entrypoint.…"   11 minutes ago   Up 10 minutes   80/tcp                                    novacdn_frontend_3
598564ac0dcf   novacdn_frontend   "/docker-entrypoint.…"   11 minutes ago   Up 10 minutes   80/tcp                                    novacdn_frontend_4
0f3c268b921b   novacdn_frontend   "/docker-entrypoint.…"   11 minutes ago   Up 10 minutes   80/tcp                                    novacdn_frontend_6
eb11bc532cb1   novacdn_frontend   "/docker-entrypoint.…"   11 minutes ago   Up 10 minutes   80/tcp                                    novacdn_frontend_7
7cc66d229d31   novacdn_frontend   "/docker-entrypoint.…"   11 minutes ago   Up 10 minutes   80/tcp                                    novacdn_frontend_10
55dfda98e3c9   novacdn_frontend   "/docker-entrypoint.…"   11 minutes ago   Up 10 minutes   80/tcp                                    novacdn_frontend_9
8deed4900892   novacdn_frontend   "/docker-entrypoint.…"   11 minutes ago   Up 10 minutes   80/tcp                                    novacdn_frontend_2
0ab87ad51531   novacdn_frontend   "/docker-entrypoint.…"   11 minutes ago   Up 10 minutes   80/tcp                                    novacdn_frontend_5
807aa7a295b7   novacdn_backend    "docker-entrypoint.s…"   11 minutes ago   Up 11 minutes   3000/tcp                                  novacdn_backend_9
995f058a1e86   novacdn_backend    "docker-entrypoint.s…"   11 minutes ago   Up 11 minutes   3000/tcp                                  novacdn_backend_4
bbab72d9c0c5   novacdn_backend    "docker-entrypoint.s…"   11 minutes ago   Up 11 minutes   3000/tcp                                  novacdn_backend_5
3dd28dfe9880   novacdn_backend    "docker-entrypoint.s…"   11 minutes ago   Up 11 minutes   3000/tcp                                  novacdn_backend_7
1a75cdce1ba1   novacdn_backend    "docker-entrypoint.s…"   11 minutes ago   Up 11 minutes   3000/tcp                                  novacdn_backend_1
6a4395ff23e7   novacdn_backend    "docker-entrypoint.s…"   11 minutes ago   Up 11 minutes   3000/tcp                                  novacdn_backend_6
8fbcb27baef8   novacdn_backend    "docker-entrypoint.s…"   11 minutes ago   Up 11 minutes   3000/tcp                                  novacdn_backend_3
c51cac1f310f   novacdn_backend    "docker-entrypoint.s…"   11 minutes ago   Up 11 minutes   3000/tcp                                  novacdn_backend_2
1293b95dd43f   novacdn_backend    "docker-entrypoint.s…"   11 minutes ago   Up 11 minutes   3000/tcp                                  novacdn_backend_8
65eae20fd623   novacdn_backend    "docker-entrypoint.s…"   11 minutes ago   Up 11 minutes   3000/tcp                                  novacdn_backend_10
8a8cb58e3ee4   redis:latest       "docker-entrypoint.s…"   11 minutes ago   Up 11 minutes   6379/tcp                                  redis


- Stop 9 frontend containers (keep only one, e.g., _1
docker stop novacdn_frontend_2 novacdn_frontend_3 novacdn_frontend_4 novacdn_frontend_5 novacdn_frontend_6 novacdn_frontend_7 novacdn_frontend_8 novacdn_frontend_9 novacdn_frontend_10

- Stop 9 backend containers (keep only one, e.g., _1)
docker stop novacdn_backend_2 novacdn_backend_3 novacdn_backend_4 novacdn_backend_5 novacdn_backend_6 novacdn_backend_7 novacdn_backend_8 novacdn_backend_9 novacdn_backend_10


Output after stopping 9 frontend nodes and 9 backend nodes for testing 

dannyrosky@Samson:/mnt/c/Users/Administrator/Desktop/NovaCDN$ docker ps
CONTAINER ID   IMAGE              COMMAND                  CREATED          STATUS          PORTS                                     NAMES
6c326a1f9c23   nginx:latest       "/docker-entrypoint.…"   14 minutes ago   Up 14 minutes   0.0.0.0:8080->80/tcp, [::]:8080->80/tcp   nginx
fdde592fb559   novacdn_frontend   "/docker-entrypoint.…"   15 minutes ago   Up 14 minutes   80/tcp                                    novacdn_frontend_1
1a75cdce1ba1   novacdn_backend    "docker-entrypoint.s…"   15 minutes ago   Up 15 minutes   3000/tcp                                  novacdn_backend_1
8a8cb58e3ee4   redis:latest       "docker-entrypoint.s…"   16 minutes ago   Up 15 minutes   6379/tcp                                  redis

Check it out in http://localhost:8080

Nginx is routing traffic to the only available frontend container.

# Build Without Cache (Recommended for Fresh Builds)
docker-compose build --no-cache frontend backend

# Scale and Run in Detached Mode - 20 NODES
docker-compose up -d --scale frontend=20 --scale backend=20


The frontend is connecting to the backend and Redis internally via Docker’s network.

COMMAND TO BRING UP 3 nodes each
docker-compose up -d --scale frontend=3 --scale backend=3 

COMMAND TO BRING UP 10 nodes each
docker-compose up -d --scale frontend=10 --scale backend=10


 General Docker Commands
Command	                    Description
docker ps	                    Show running containers
docker ps -a	                    Show all containers (including stopped)
docker stop <container>     	Stop a running container
docker start <container>	Start a stopped container
docker restart <container>	Restart a container
docker rm <container>	Remove a stopped container
docker images	                    List all local Docker images
docker rmi <image>	                    Remove a Docker image
docker logs <container>	Show logs from a container
docker exec -it <container> bash	Open a bash shell inside the container
docker stats	                    Live CPU/memory usage of containers
docker inspect <container>	Get low-level info about container
docker network ls	                    List Docker networks
docker volume ls	                    List Docker volumes


🧱 Building & Running Images
Command	                     Description
docker build -t <name> .	Build an image from a Dockerfile
docker run -d -p 8080:80 <image>	Run a container in detached mode, mapping ports
docker run --rm -it <image> bash	Run a container and open a shell; remove after exit


🧰 Docker Compose Commands
Command	                                          Description
docker-compose up -d	                     Start all services defined in docker-compose.yml in detached mode
docker-compose up -d --build                                 Build images and start containers
docker-compose down	                                         Stop and remove containers, networks, volumes defined by the compose file
docker-compose ps	                                         Show running services
docker-compose logs -f	                     Stream logs from all services
docker-compose exec <service> bash	                    Access a service container shell
docker-compose scale frontend=3 backend=2	(Deprecated in newer versions) Scale containers manually
docker-compose up -d --scale frontend=3 --scale backend=3	✅ Scale specific services with newer syntax


🧪 Bonus: Useful During Testing
Command	                                   Description
docker stop $(docker ps -q)	              Stop all running containers
docker rm $(docker ps -aq)	              Remove all containers
docker rmi $(docker images -q)	              Remove all images
docker volume prune	Remove all unused volumes
docker system prune -a	               Remove all unused data (images, containers, networks)



# Comprehensive Docker Commands

This README contains a comprehensive list of Docker commands for managing containers, images, networks, and other aspects of containerization.

## Installation

To install Docker on a Debian-based system (like Ubuntu):

```bash
sudo apt update
sudo apt install docker.io docker-compose
```

## Common Commands

- **Run a new container from an image:**
  ```bash
  docker run [OPTIONS] IMAGE [COMMAND] [ARG...]
  ```

- **Execute a command in a running container:**
  ```bash
  docker exec -it CONTAINER_NAME COMMAND
  ```

- **List all containers (including stopped ones):**
  ```bash
  docker ps -a
  ```

- **Build an image from a Dockerfile:**
  ```bash
  docker build -t IMAGE_NAME PATH_TO_DOCKERFILE
  ```

- **Download an image from a registry:**
  ```bash
  docker pull IMAGE_NAME
  ```

- **Upload an image to a registry:**
  ```bash
  docker push IMAGE_NAME
  ```

- **List images:**
  ```bash
  docker images
  ```

- **Authenticate to a registry:**
  ```bash
  docker login
  ```

- **Log out from a registry:**
  ```bash
  docker logout
  ```

- **Search Docker Hub for images:**
  ```bash
  docker search SEARCH_TERM
  ```

- **Show the Docker version information:**
  ```bash
  docker version
  ```

- **Display system-wide information:**
  ```bash
  docker info
  ```

## Management Commands

- **Manage containers:**
  ```bash
  docker container [OPTIONS] COMMAND
  ```

- **Manage images:**
  ```bash
  docker image [OPTIONS] COMMAND
  ```

- **Manage networks:**
  ```bash
  docker network [OPTIONS] COMMAND
  ```

- **Manage volumes:**
  ```bash
  docker volume [OPTIONS] COMMAND
  ```

## Swarm Commands

- **Initialize a swarm:**
  ```bash
  docker swarm init
  ```

- **Join a swarm:**
  ```bash
  docker swarm join --token TOKEN MANAGER-IP:PORT
  ```

- **Manage Swarm services:**
  ```bash
  docker service [OPTIONS] COMMAND
  ```

## Miscellaneous Commands

- **Create a new container:**
  ```bash
  docker create IMAGE
  ```

- **Remove one or more containers:**
  ```bash
  docker rm CONTAINER_ID
  ```

- **Remove one or more images:**
  ```bash
  docker rmi IMAGE_ID
  ```

- **View logs of a container:**
  ```bash
  docker logs CONTAINER_ID
  ```

- **Stop one or more running containers:**
  ```bash
  docker stop CONTAINER_ID
  ```

- **Start one or more stopped containers:**
  ```bash
  docker start CONTAINER_ID
  ```

- **Update an existing container:**
  ```bash
  docker update [OPTIONS] CONTAINER
  ```

- **Rename a container:**
  ```bash
  docker rename OLD_NAME NEW_NAME
  ```

- **Fetch resource usage statistics of containers:**
  ```bash
  docker stats
  ```

- **View the top processes running in a container:**
  ```bash
  docker top CONTAINER_ID
  ```

- **Copy files/folders between a container and the local filesystem:**
  ```bash
  docker cp CONTAINER_ID:SOURCE_PATH DESTINATION_PATH
  ```

- **Pause a running container:**
  ```bash
  docker pause CONTAINER_ID
  ```

- **Unpause a paused container:**
  ```bash
  docker unpause CONTAINER_ID
  ```

- **Export a container's filesystem as a tar archive:**
  ```bash
  docker export CONTAINER_ID > exported_container.tar
  ```

- **Import a tarball to create a new filesystem image:**
  ```bash
  docker import exported_container.tar
  ```

## Global Options

- **Run a command with debug mode:**
  ```bash
  docker --debug COMMAND
  ```

- **Set the logging level:**
  ```bash
  docker --log-level LEVEL COMMAND
  ```

## Cleanup Commands

- **Remove all stopped containers:**
  ```bash
  docker container prune
  ```

- **Remove all unused images:**
  ```bash
  docker image prune
  ```

- **Remove all unused volumes:**
  ```bash
  docker volume prune
  ```

- **Remove all unused networks:**
  ```bash
  docker network prune
  ```

## Running Docker without sudo

To run Docker commands without sudo, you can add your user to the Docker group:

```bash
sudo usermod -aG docker $USER
```

You will need to log out and log back in for the changes to take effect.

Run 'docker COMMAND --help' for more information on a command.

docker run -d -p 3000:3000 --name my-docker-app docker-app-2020 = http://localhost:3000

docker run -d -p 3001:3000 --name my-docker-app docker-app-2020 = http://localhost:3001

docker stop $(docker ps -q) = To stop everything running in Docker at once

docker rm $(docker ps -aq) = To remove all containers

docker rmi $(docker images -q) -f = Remove All Docker Images (Fresh Build)

docker builder prune -a --force = Clear Build Cache Too


docker-compose down --volumes --remove-orphans = To top and remove everything including containers, networks, volumes, and images created by docker-compose

docker-compose build --no-cache = Rebuild Everything Without Cache

docker-compose up -d = Bring Everything Up

