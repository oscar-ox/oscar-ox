FROM node:16-buster AS builder
RUN apt update
WORKDIR /app
RUN yarn global add turbo
COPY . .
RUN turbo prune --scope=api --docker

FROM node:16-buster AS installer
RUN apt update
WORKDIR /app
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/yarn.lock ./yarn.lock
COPY --from=builder /app/turbo.json ./turbo.json
COPY --from=builder /app/apps/api/prisma ./prisma
RUN yarn install --frozen-lockfile
RUN yarn prisma generate 
RUN mv /app/generated /app/apps/api/generated

FROM node:16-buster AS sourcer
WORKDIR /app
COPY --from=installer /app/ .
COPY --from=builder /app/out/full/ .
COPY .gitignore .gitignore
RUN yarn turbo run build --scope=api --include-dependencies --no-deps

FROM node:16-buster as runner
WORKDIR /app
COPY --from=sourcer /app/ .
EXPOSE 4000
CMD [ "node", "apps/api/dist/main.js" ]