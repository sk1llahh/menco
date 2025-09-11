FROM node:20-alpine AS base
WORKDIR /app

RUN corepack enable && corepack prepare pnpm@10.15.1 --activate

COPY pnpm-workspace.yaml ./
COPY package.json pnpm-lock.yaml ./
COPY apps/web/package.json ./apps/web/package.json

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm --filter web run build

EXPOSE 3000

CMD ["pnpm", "--filter", "web", "run", "preview", "--", "--port", "3000", "--strictPort"]

