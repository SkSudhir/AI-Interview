# Base image
FROM node:20-slim AS base
ENV NEXT_TELEMETRY_DISABLED 1

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app

# Install OpenSSL for Prisma
RUN apt-get update -y && apt-get install -y openssl

# Install dependencies based on the preferred package manager
COPY package.json package-lock.json ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Install OpenSSL in builder stage too
RUN apt-get update -y && apt-get install -y openssl

# Create a .env file with dummy variables for build time
# This ensures Prisma can find the variables even if shell env inheritance fails
RUN echo "DATABASE_URL=\"postgresql://dummy:dummy@localhost:5432/dummy\"" > .env && \
    echo "NEXTAUTH_SECRET=\"dummy_secret_for_build\"" >> .env && \
    echo "NEXTAUTH_URL=\"http://localhost:3000\"" >> .env && \
    echo "OPENAI_API_KEY=\"dummy_key_for_build\"" >> .env

# Generate Prisma Client
RUN npx prisma generate

# Build Next.js app
RUN npm run build

# Build Custom Server
RUN npm run build:server

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# Install OpenSSL in runner stage
RUN apt-get update -y && apt-get install -y openssl ca-certificates

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy necessary files
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/prisma ./prisma

# Set the correct permission for prerender cache
RUN mkdir -p .next/cache
RUN chown -R nextjs:nodejs .next

USER nextjs

EXPOSE 3000

ENV PORT 3000

# Run migrations before starting the server
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/server.js"]
