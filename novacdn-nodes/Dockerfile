# Start from an official Nginx image for edge node functionality
FROM nginx:alpine

# Set the working directory inside the container
WORKDIR /app

# Copy any necessary caching content, config files, or other assets into the container
# This assumes you have cache/ content you want to serve via the Nginx container
COPY ./cache/ /usr/share/nginx/html/

# Expose port 80 to allow Nginx to handle HTTP requests
EXPOSE 80

# Use the default Nginx command to run in the foreground
CMD ["nginx", "-g", "daemon off;"]
