FROM node:18-alpine as build

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies, respecting legacy peer dependencies
RUN npm install --legacy-peer-deps

# Copy the rest of your application
COPY . .

# Build your application
RUN npm run prod

## Use the latest stable nginx image
#FROM nginx:latest
#
## Copy built assets from the build stage to nginx
#COPY --from=build /app/dist/trinta/ /usr/share/nginx/html/
#COPY default.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

