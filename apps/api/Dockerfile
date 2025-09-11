FROM node:20-alpine AS base
WORKDIR /app

RUN corepack enable && corepack prepare pnpm@10.15.1 --activate

FROM base AS deps
WORKDIR /app

COPY pnpm-workspace.yaml ./
COPY package.json pnpm-lock.yaml ./
COPY apps/api/package.json ./apps/api/package.json
COPY packages/types/package.json ./packages/types/package.json
COPY packages/config/package.json ./packages/config/package.json
COPY packages/database/package.json ./packages/database/package.json

ENV NODE_ENV=development
RUN pnpm install --frozen-lockfile

FROM deps AS build
WORKDIR /app
COPY . .
RUN pnpm turbo run build --filter=@repo/api...

RUN pnpm prune --prod

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/apps/api/dist ./apps/api/dist
COPY --from=build /app/packages ./packages
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/api/package.json ./apps/api/package.json

ENV BACKEND_PORT=3001
EXPOSE 3001

CMD ["node", "apps/api/dist/index.js"]
