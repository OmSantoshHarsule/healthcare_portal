# Stage 1: Build the TypeScript app
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies (only production ones to save space)
RUN npm ci --omit=dev

# Copy the entire backend source code
COPY . .

# Compile TypeScript to JavaScript
RUN npm run build


# Stage 2: Run the compiled app
FROM node:18-alpine AS runner

# Set working directory
WORKDIR /app

# Copy only necessary files from the builder stage
COPY --from=builder /app/package.json /app/package.json
COPY --from=builder /app/dist /app/dist
COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/.env .env  

# Expose the port your Express app runs on
EXPOSE 5000

# Start the Express server
CMD ["node", "dist/server.js"]

