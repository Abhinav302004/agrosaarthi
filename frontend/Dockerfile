# Multi-stage build for React frontend
FROM node:18-alpine AS build

# Set working directory
WORKDIR /app

# Copy package files for better caching
COPY package*.json ./

# Install all dependencies (including dev dependencies needed for build)
RUN npm ci

# Copy all source files
COPY . .

# Create .env file with placeholder values for build
RUN echo "VITE_SUPABASE_URL=placeholder" > .env && \
    echo "VITE_SUPABASE_ANON_KEY=placeholder" >> .env && \
    echo "VITE_WEATHER_API_KEY=placeholder" >> .env

# Build the application
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy built files from build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"] 