# Stage 1: Build Angular App
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install dependencies (skip optional dependencies to save space)
RUN npm ci --omit=dev

# Copy the entire Angular project (excluding unnecessary files)
COPY . .

# Build the Angular app in production mode
RUN npm run build --prod

# Stage 2: Serve the App with 'serve'
FROM node:18-alpine AS runner

# Set working directory
WORKDIR /app

# Install 'serve' globally to serve the built app
RUN npm install -g serve

# Copy only the built Angular app from the builder stage
COPY --from=builder /app/dist/healthcare-portal/browser /app/build

# Expose port 7000
EXPOSE 7000

# Serve the built Angular app
CMD ["serve", "-s", "/app/build/browser", "-l", "7000", "--single"]
