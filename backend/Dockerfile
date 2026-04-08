# Backend Dockerfile for NestJS
FROM node:24-slim

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Install system utilities required by healthchecks and Prisma
# wget is used by the container HEALTHCHECK; openssl avoids Prisma warnings
RUN apt-get update \
	&& apt-get install -y --no-install-recommends wget openssl ca-certificates \
	&& rm -rf /var/lib/apt/lists/*

# Copy workspace files
COPY pnpm-lock.yaml pnpm-workspace.yaml .pnpmrc* ./
COPY backend/package.json ./backend/

# Install dependencies for backend workspace only
RUN pnpm install --frozen-lockfile --filter backend

# Copy backend source code
COPY backend/ ./backend/

# Set working directory to backend
WORKDIR /app/backend

# Provide dummy DATABASE_URL for build-time Prisma commands only (ARG = build-time, not runtime)
ARG DATABASE_URL="postgresql://trendora:trendora@localhost:5432/trendora"

# Generate Prisma client (does not require a live DB for generation)
RUN npx prisma generate

# Build NestJS application
RUN pnpm run build

EXPOSE 3001

# Start production server
CMD ["node", "dist/main"]