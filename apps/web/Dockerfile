FROM node:20-alpine AS base
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@10.15.1 --activate

# --- deps: install only what's needed using workspace manifests
FROM base AS deps
WORKDIR /app
COPY pnpm-workspace.yaml ./
COPY package.json pnpm-lock.yaml ./
COPY apps/web/package.json ./apps/web/package.json
COPY packages/tsconfig/package.json ./packages/tsconfig/package.json
RUN pnpm install --frozen-lockfile

# --- build: compile the web app
FROM deps AS build
WORKDIR /app
COPY . .
RUN pnpm --filter web run build

# --- runner: serve static files with nginx
FROM nginx:alpine AS runner
WORKDIR /
# Install curl for healthcheck
RUN apk add --no-cache curl

# Copy nginx config and built assets
COPY apps/web/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/apps/web/dist /usr/share/nginx/html

EXPOSE 5173

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -fsS http://localhost:5173/healthz || exit 1

CMD ["nginx", "-g", "daemon off;"]
