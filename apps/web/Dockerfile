FROM node:16-alpine AS installer
RUN apk update
RUN apk add --no-cache libc6-compat
WORKDIR /app
RUN yarn global add turbo nps
COPY . .
RUN nps prepare.ci.web 

FROM node:16-alpine AS builder
RUN apk update
RUN apk add --no-cache libc6-compat
WORKDIR /app
RUN yarn global add nps
COPY --from=installer /app  .
COPY .gitignore .gitignore
ARG API_V1_URL
ENV NEXT_PUBLIC_API_V1_URL $API_V1_URL
RUN nps build.ci.web

FROM node:16-alpine AS runner
WORKDIR /app
ENV NODE_ENV production
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
COPY --from=builder /app/out ./
#COPY --from=builder /app/out/apps/web/public ./public
#COPY --from=builder --chown=nextjs:nodejs /app/out/apps/web/.next/standalone ./
#COPY --from=builder --chown=nextjs:nodejs /app/out/apps/web/.next/static ./.next/static
USER nextjs
EXPOSE 3000
ENV PORT 3000
#CMD ["node", "server.js"]
WORKDIR /app/apps/web/
CMD [ "npm", "start" ]