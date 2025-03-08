# Use the official Node.js image as the base image
FROM node:20

# Set the working directory
WORKDIR /app

# Copy package.json and bun.lockb files
COPY package.json bun.lock ./

# Install Bun
RUN npm install -g bun

# Install dependencies
RUN bun install

# Copy the rest of the application code
COPY . .

# Expose port 3000
EXPOSE 3000

# Command to run the application
CMD ["bun", "dev"]
