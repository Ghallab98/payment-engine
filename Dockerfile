# Use the official Node.js 14.18.0 image as base
FROM node:14.18.0

# Set the working directory in the container to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies in the container
RUN npm install

# Copy the rest of your app's source code to the working directory
COPY . .

# Expose port 3000 for the app to be accessible
EXPOSE 3000

# Define the command to run your app
CMD npx sequelize-cli db:migrate && npx sequelize-cli db:seed:all && npm start