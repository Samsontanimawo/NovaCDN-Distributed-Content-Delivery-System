Launch an EC2 Instance
Use Amazon Linux 2 or Ubuntu (t2.medium or higher recommended)

Enable ports: 80, 443, and any custom ones (3000, 8080, etc.)

SSH into your instance
ssh -i your-key.pem ec2-user@your-ec2-public-ip

Install Docker & Docker Compose
 # Amazon Linux 2
# 1. Update your system
sudo dnf update -y

# 2. Install Docker using dnf
sudo dnf install -y docker

# 3. Start Docker service
sudo systemctl start docker

# 4. Enable Docker to start on boot
sudo systemctl enable docker

# 5. Create the docker group (if it doesn't exist)
sudo groupadd docker

# 6. Add your user to the docker group
sudo usermod -aG docker $USER

# 7. Apply the group change
newgrp docker

# 8. Test Docker
docker run hello-world


# Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose



# 1. Update your system packages
sudo dnf update -y

# 2. Install Git
sudo dnf install -y git

# 3. Verify installation
git --version

4. Clone Your App or Upload Code
git clone https://github.com/your-username/your-repo.git
cd your-repo

5. Run Your App
docker-compose up -d --build


Install Node.js & npm (for backend + frontend)

# Use NodeSource to get a recent version
curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -
sudo dnf install -y nodejs

# Check version
node -v
npm -v


Install Docker

sudo dnf install -y docker
sudo systemctl start docker
sudo systemctl enable docker

# Create docker group and add your user
sudo groupadd docker
sudo usermod -aG docker $USER
newgrp docker

Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Check version
docker-compose --version

Backend
Install project dependencies
cd ~/NovaCDN-Distributed-Content-Delivery-System/backend
npm install

Frontend
cd ~/NovaCDN-Distributed-Content-Delivery-System/novacdn-frontend
npm install

Optional: Install Redis (if not using Docker for it)
sudo dnf install -y redis
sudo systemctl enable redis
sudo systemctl start redis

Run your app (if using Docker Compose)
cd ~/NovaCDN-Distributed-Content-Delivery-System
docker-compose up --build
