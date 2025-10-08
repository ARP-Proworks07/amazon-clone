### Frontend multi-stage Dockerfile for Vite React app
FROM node:18-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json* ./
COPY public ./public
COPY src ./src
COPY index.html vite.config.js tailwind.config.js postcss.config.js ./
RUN npm ci --silent
RUN npm run build

FROM nginx:stable-alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
