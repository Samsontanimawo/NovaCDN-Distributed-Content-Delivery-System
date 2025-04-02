# Step 1: Use an official Node.js image as the base image
FROM node:16

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy the package.json and package-lock.json (if available)
COPY package*.json ./

# Step 4: Install the app dependencies
RUN npm install

# Step 5: Copy the rest of the app's source code into the container
COPY . .

# Step 6: Build the React app for production
RUN npm run build

# Step 7: Use an official Nginx image to serve the React app
FROM nginx:alpine

# Step 8: Copy the build output from the previous step to Nginx's public directory
COPY --from=0 /app/build /usr/share/nginx/html

# Step 9: Expose the port that the container will listen on
EXPOSE 80

# Step 10: Start Nginx to serve the React app
CMD ["nginx", "-g", "daemon off;"]
