# syntax=docker.io/docker/dockerfile:1

FROM node:22-alpine AS base

# pnpm is provided through Corepack, pinned by the "packageManager" field in
# package.json so builds are reproducible.
RUN corepack enable

FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# NEXT_PUBLIC_* values are inlined into the bundle at build time, so they must
# be set here (the runtime env_file cannot change them afterwards). Override for
# another host with: --build-arg NEXT_PUBLIC_API_HOST=https://api.example.org
ARG NEXT_PUBLIC_API_HOST=http://localhost:3001
ENV NEXT_PUBLIC_API_HOST=$NEXT_PUBLIC_API_HOST
ENV NEXT_TELEMETRY_DISABLED=1

RUN pnpm run build

FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs

# next.config.ts sets output: "standalone", which emits a self-contained server
# bundling only the production dependencies it actually uses.
COPY --chown=nextjs:nodejs --from=builder /app/public ./public
COPY --chown=nextjs:nodejs --from=builder /app/.next/standalone ./
COPY --chown=nextjs:nodejs --from=builder /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

CMD ["node", "server.js"]
