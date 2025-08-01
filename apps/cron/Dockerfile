# Use the official Node.js image
FROM node:14-alpine

# Set working directory
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy project files
COPY . .

RUN npm run build:cron

# Expose API port
EXPOSE 3001

# Command to run the application
CMD ["npm", "run", "start:cron:prod"]
