FROM node:18-alpine
WORKDIR /usr/src/app
COPY server/package.json server/package-lock.json* ./
RUN npm ci --only=production --silent
COPY server .
ENV PORT=5000
EXPOSE 5000
CMD ["node", "index.js"]
