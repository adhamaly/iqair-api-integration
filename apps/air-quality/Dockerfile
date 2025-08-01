# Use the official Node.js image
FROM node:14-alpine

# Set working directory
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy project files
COPY . .

RUN npm run build:airquality

# Expose API port
EXPOSE 3000

# Command to run the application
CMD ["npm", "run", "start:airquality:prod"]
