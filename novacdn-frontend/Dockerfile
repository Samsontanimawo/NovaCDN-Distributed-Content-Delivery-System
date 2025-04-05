# Step 1: Build phase
FROM node:16 as build

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
RUN NODE_OPTIONS="--max-old-space-size=512" npm run build 
#RUN npm run build

# Step 2: Production phase
FROM nginx:alpine

LABEL maintainer="engrtanimawo244"
LABEL version="1.0"
LABEL description="NovaCDN React Frontend"

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
