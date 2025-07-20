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


# Build the application
RUN npm run build

# Create env.js file for runtime environment variables
RUN echo "window.__ENV__ = {" > /app/dist/env.js && \
    echo "  VITE_SUPABASE_URL: '\$$VITE_SUPABASE_URL'," >> /app/dist/env.js && \
    echo "  VITE_SUPABASE_ANON_KEY: '\$$VITE_SUPABASE_ANON_KEY'," >> /app/dist/env.js && \
    echo "  VITE_OPENWEATHER_API_KEY: '\$$VITE_OPENWEATHER_API_KEY'" >> /app/dist/env.js && \
    echo "};" >> /app/dist/env.js

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