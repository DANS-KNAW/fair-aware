FROM node:20-alpine AS base

WORKDIR /usr/src/app

# alpine versions use musl C library instead of the glibc library
# We had the package to prevent compatibility issues.
RUN apk add --no-cache libc6-compat

# Temporary fix to resolve the issue of signing key: https://github.com/pnpm/pnpm/issues/9029
# This should be removed at some point when upgrading to an newer node.
RUN npm i -g corepack@latest
RUN corepack enable pnpm

FROM base AS deps

COPY package.json pnpm-lock.yaml ./

RUN pnpm i --frozen-lockfile;

FROM base AS builder

COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY . .

RUN pnpm run build;

FROM base AS runner

RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 --ingroup nodejs nestjs \
  && chown -R nestjs:nodejs /usr/src/app

USER nestjs

COPY --chown=nestjs:nodejs --from=builder /usr/src/app/dist ./
COPY --chown=nestjs:nodejs --from=deps /usr/src/app/node_modules ./node_modules

EXPOSE 3000

CMD ["node", "main"]