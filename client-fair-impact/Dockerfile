# syntax=docker.io/docker/dockerfile:1

FROM node:18-alpine AS base

# Temporary fix to resolve the issue of signing key: https://github.com/pnpm/pnpm/issues/9029
# This should be removed at some point when upgrading to an newer node.
RUN npm i -g corepack@latest
RUN corepack enable pnpm

FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* .npmrc* ./

RUN pnpm i --frozen-lockfile;

# FROM base AS builder
# WORKDIR /app
# COPY --from=deps /app/node_modules ./node_modules
# COPY . .
# ENV NEXT_TELEMETRY_DISABLED=1
# ENV NEXT_PUBLIC_API_HOST=http://localhost:3001

# RUN corepack enable pnpm && pnpm run build;

FROM base AS runner
WORKDIR /app

ENV NEXT_PUBLIC_API_HOST=http://localhost:3001
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
RUN chown -R nextjs:nodejs /app

COPY --chown=nextjs:nodejs --from=deps /app/node_modules ./node_modules
COPY --chown=nextjs:nodejs . .

USER nextjs

EXPOSE 3000

ENV PORT=3000

ENV HOSTNAME="0.0.0.0"
CMD ["corepack", "pnpm", "dev"]
