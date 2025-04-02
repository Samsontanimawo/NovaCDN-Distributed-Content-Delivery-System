# Use the official Nginx image as the base image
FROM nginx:latest

# Set the working directory
WORKDIR /usr/share/nginx/html

# Copy the custom Nginx configuration for this node
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80 for HTTP traffic
EXPOSE 80

# Start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
