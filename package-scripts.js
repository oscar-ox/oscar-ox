
const path = require("path");

const apiPath = path.resolve(__dirname, "apps/api");
const webPath = path.resolve(__dirname, "apps/web");

const ciApiPath = path.resolve(__dirname, "out/apps/api");
const ciWebPath = path.resolve(__dirname, "out/apps/web");

module.exports = {
    scripts: {
        prepare: {
            default: `nps prepare.api`,
            api: `nps prepare.docker prisma.migrate.dev`,
            docker: "docker-compose up -d",
        },
        prisma: {
            generate: `cd ${apiPath} && npx prisma generate`,
            studio: `cd ${apiPath} && npx prisma studio`,
            migrate: {
                dev: `cd ${apiPath} && npx prisma migrate dev --skip-seed`,
            },
        },
        build: {
            default: "npx turbo run build",
        },
        docker: {
            build: {
                default: "nps docker.build.web docker.build.api",
                web: `docker build -t web . -f ${webPath}/Dockerfile`,
                api: `docker build -t api . -f ${apiPath}/Dockerfile`,
            },
        },
        dev: "npx turbo run dev",
    },
};