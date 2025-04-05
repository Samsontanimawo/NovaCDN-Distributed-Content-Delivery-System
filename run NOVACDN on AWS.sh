1. Launch an EC2 Instance
Use Amazon Linux 2 or Ubuntu (t2.medium or higher recommended)

Enable ports: 80, 443, and any custom ones (3000, 8080, etc.)

2. SSH into your instance
ssh -i your-key.pem ec2-user@your-ec2-public-ip


3. Install Docker & Docker Compose
 # Amazon Linux 2
sudo yum update -y
sudo amazon-linux-extras install docker
sudo service docker start
sudo usermod -aG docker ec2-user
newgrp docker

# Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

4. Clone Your App or Upload Code
git clone https://github.com/your-username/your-repo.git
cd your-repo

5. Run Your App
docker-compose up -d --build
