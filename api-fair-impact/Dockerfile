FROM node:22-alpine AS base

WORKDIR /usr/src/app

# Alpine uses musl instead of glibc; add a compatibility shim for native deps.
RUN apk add --no-cache libc6-compat

RUN corepack enable

FROM base AS deps

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

RUN pnpm install --frozen-lockfile

FROM base AS builder

COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY . .

RUN pnpm run build && pnpm prune --prod

FROM base AS runner

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 --ingroup nodejs nestjs \
  && chown -R nestjs:nodejs /usr/src/app

USER nestjs

COPY --chown=nestjs:nodejs --from=builder /usr/src/app/dist ./
COPY --chown=nestjs:nodejs --from=builder /usr/src/app/node_modules ./node_modules

EXPOSE 3001

CMD ["node", "main"]
