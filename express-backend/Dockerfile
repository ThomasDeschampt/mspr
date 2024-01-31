# Use an official Node runtime as a parent image
FROM node:21

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire backend application
COPY . .

# Expose port 3000
EXPOSE 3000

# Command to run the service
CMD ["node", "app.js"]
