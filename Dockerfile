# Use an official Node.js runtime as the parent image
FROM node:14

# Set the working directory
WORKDIR /usr/src

# Copy package.json and package-lock.json
COPY package*.json ./

# Install application dependencies
RUN npm install --production

# Copy the current directory contents into the container
COPY . .

# Specify the port the app runs on
EXPOSE 3000

# Define the command to run the application
CMD ["npm", "dev"]
