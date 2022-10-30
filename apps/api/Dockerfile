FROM node:16-buster AS installer
RUN apt update
WORKDIR /app
RUN yarn global add turbo nps
COPY . .
RUN nps prepare.ci.api 

FROM node:16-buster AS builder
RUN apt update
WORKDIR /app
RUN yarn global add nps
COPY --from=installer /app  .
COPY .gitignore .gitignore
ARG API_V1_URL
ENV NEXT_PUBLIC_API_V1_URL $API_V1_URL
RUN nps build.ci.api

FROM node:16-buster as runner
WORKDIR /app
ENV NODE_ENV production
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nestjs
COPY --from=builder /app/out ./
USER nestjs
EXPOSE 4000
ENV PORT 4000
CMD [ "node", "apps/api/dist/main.js" ]