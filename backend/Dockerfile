# Backend Dockerfile for NestJS
FROM node:24-slim

WORKDIR /app

# Install system utilities required by healthchecks and Prisma
RUN apt-get update \
	&& apt-get install -y --no-install-recommends wget openssl ca-certificates \
	&& rm -rf /var/lib/apt/lists/*

# Copy backend package.json and install dependencies directly
COPY backend/package.json ./package.json

# Install dependencies
RUN npm install

# Copy backend source code
COPY backend/ ./

# Provide dummy DATABASE_URL for build-time Prisma commands only
ARG DATABASE_URL="postgresql://trendora:trendora@localhost:5432/trendora"

# Generate Prisma client
RUN npx prisma generate

# Build NestJS application
RUN npm run build

EXPOSE 3001

# Start production server
CMD ["node", "dist/main"]

EXPOSE 3001

# Start production server
CMD ["node", "dist/main"]