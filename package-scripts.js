const path = require("path");

const apiPath = path.resolve(__dirname, "apps/api");
const webPath = path.resolve(__dirname, "apps/web");

const ciApiPath = path.resolve(__dirname, "out/apps/api");
const ciWebPath = path.resolve(__dirname, "out/apps/web");

module.exports = {
    scripts: {
        prepare: {
            default: `nps prepare.web prepare.api`,
            web: `pnpm i`,
            api: `nps prepare.docker prisma.migrate.dev`,
            docker: "docker-compose -f ./packages/docker/docker-compose.dev.yaml -p oscar-ox up -d",
            listmonk: "docker-compose -f ./packages/docker/docker-compose.dev.yaml -p oscar-ox run --rm listmonk ./listmonk --install",
            ci: {
                web: `npx turbo prune --scope=web && cd out && pnpm i --frozen-lockfile`,
                api: `npx turbo prune --scope=api && cd out && pnpm i --frozen-lockfile && nps prisma.ci.generate`,
            },
        },
        prisma: {
            generate: `cd ${apiPath} && npx prisma generate`,
            studio: `cd ${apiPath} && npx prisma studio`,
            migrate: {
                dev: `cd ${apiPath} && npx prisma migrate dev`,
            },
            ci: {
                generate: `cd ${ciApiPath} && npx prisma generate`,
            }
        },
        build: {
            default: "npx turbo run build",
            ci: {
                web: "cd out && npm run build",
                api: "cd out && npm run build",
            },
        },
        docker: {
            build: {
                default: "nps docker.build.web docker.build.api",
                web: `docker build -t oscar-ox:web-dev . -f ${webPath}/Dockerfile`,
                api: `docker build -t oscar-ox:api-dev . -f ${apiPath}/Dockerfile`,
            },
            deploy: "docker-compose -f ./packages/docker/docker-compose.prod.yaml -p oscar-ox up -d --build",
        },
        dev: "npx turbo run dev",
    },
};