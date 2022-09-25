FROM node:16-alpine AS turbo
RUN apk update
WORKDIR /app
RUN yarn global add turbo
COPY . .
RUN turbo prune --scope=web --docker

FROM node:16-alpine AS installer
RUN apk update
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY --from=turbo /app/out/json/ .
COPY --from=turbo /app/out/yarn.lock ./yarn.lock
COPY --from=turbo /app/turbo.json ./turbo.json
RUN yarn install --frozen-lockfile

FROM node:16-alpine AS builder
RUN apk update
WORKDIR /app
COPY --from=installer /app/ .
COPY --from=turbo /app/out/full/ .
COPY .gitignore .gitignore
RUN yarn turbo run build --scope=web --include-dependencies --no-deps

FROM node:16-alpine as runner
WORKDIR /app
COPY --from=builder /app/ .
WORKDIR /app/apps/web/
EXPOSE 3000
CMD [ "npm", "start" ]