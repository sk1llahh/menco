# syntax=docker/dockerfile:1

FROM node:20-alpine AS base
WORKDIR /app
ENV NODE_ENV=production

# Use the pnpm version pinned in the repo
RUN corepack enable && corepack prepare pnpm@10.15.1 --activate

# Copy only manifests first for better install caching
COPY pnpm-workspace.yaml ./
COPY package.json pnpm-lock.yaml ./
COPY apps/api/package.json ./apps/api/package.json
COPY packages/types/package.json ./packages/types/package.json
COPY packages/database/package.json ./packages/database/package.json

# Install workspace dependencies
RUN pnpm install --frozen-lockfile

# Copy the rest of the monorepo
COPY . .

# Expose API port and set env to match compose
ENV BACKEND_PORT=3001
EXPOSE 3001

# Start the API using tsx (runs TypeScript directly)
CMD ["pnpm", "-w", "exec", "tsx", "apps/api/src/index.ts"]
