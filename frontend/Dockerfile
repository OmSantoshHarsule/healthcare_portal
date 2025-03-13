# Use Node.js as the base image
FROM node:18

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire Angular project (including source code and assets)
COPY . .

# Build the Angular app in production mode
RUN npm run build --prod

# Install 'serve' globally to serve the built app
RUN npm install -g serve

# Expose port 3000 for accessing the app
EXPOSE 7000

# Serve the built Angular app from dist/healthcare-portal/browser on port 3000
CMD ["serve", "-s", "dist/healthcare-portal/browser/browser", "-l", "7000", "--single"]

