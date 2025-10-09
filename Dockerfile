# Multi-stage Dockerfile for Amazon Clone Frontend (React + Vite)
FROM node:18-alpine AS builder

# Install system dependencies (Alpine uses apk)
RUN apk update && apk add --no-cache \
    build-base \
    g++ \
    make \
    python3 \
    && rm -rf /var/cache/apk/*

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --silent

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage with nginx
FROM nginx:stable-alpine

# Copy built assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Create nginx user and set permissions
RUN addgroup -g 101 -S nginx && \
    adduser -S -D -H -u 101 -h /var/cache/nginx -s /sbin/nologin -G nginx -g nginx nginx && \
    chown -R nginx:nginx /usr/share/nginx/html

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]
