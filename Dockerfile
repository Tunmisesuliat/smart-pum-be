# Use Node.js v20 with Alpine as the base image for a smaller footprint
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container (for better caching of dependencies)
COPY package*.json ./

# Install dependencies inside the container
RUN npm install --force

# Copy the rest of the application files into the container
COPY . .

# Expose port 3000 (or whichever port your app listens on)
EXPOSE 3030

# Command to run the application
CMD [ "npm", "start" ]
