# Backend Dockerfile for NestJS
FROM node:24-slim

WORKDIR /app

# Install system utilities required by healthchecks and Prisma
RUN apt-get update \
	&& apt-get install -y --no-install-recommends wget openssl ca-certificates \
	&& rm -rf /var/lib/apt/lists/*

# Copy ALL backend source code first
COPY backend/ ./

# Install dependencies (including devDependencies for build)
RUN npm install

# Provide dummy DATABASE_URL for build-time Prisma commands only
ARG DATABASE_URL="postgresql://trendora:trendora@localhost:5432/trendora"

# Generate Prisma client
RUN npx prisma generate

# Build NestJS application and verify output
RUN npm run build && ls -la dist/src/ && test -f dist/src/main.js

EXPOSE 3001

# Start production server
CMD ["node", "dist/src/main"]

EXPOSE 3001

# Start production server
CMD ["node", "dist/main"]